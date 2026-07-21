/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Immutable from 'immutable';
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
import { sassValueToJS } from '../sassValueToJS.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js utilities to flatten a map.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_map_flatten() {
    const _emptyMap = new sass.SassMap();
    const _emptyString = new sass.SassString();
    const _rootString = new sass.SassString('$');
    const mapFlattener = (map_1, prefix_1, suffix_1, ...args_1) => __awaiter(this, [map_1, prefix_1, suffix_1, ...args_1], void 0, function* (map, prefix, suffix, separator = '-') {
        // returns - empty
        if (!map.contents) {
            return _emptyMap;
        }
        const _includeSuffix = !!(suffix === null || suffix === void 0 ? void 0 : suffix.length);
        const sassSuffix = suffix ? new sass.SassString(suffix, { quotes: false }) : null;
        const key_addSuffix = (key) => {
            // returns
            if (typeof key === 'string' ? !key : !key.isTruthy) {
                return _includeSuffix && sassSuffix ? sassSuffix : _emptyString;
            }
            const stringKey = key.toString().replace(/^['"](.*)['"]$/g, '$1');
            // returns
            if (typeof key === 'string') {
                return new sass.SassString(_includeSuffix ? `${stringKey}${separator}${suffix}` : stringKey, { quotes: false });
            }
            // returns
            if (_includeSuffix) {
                return new sass.SassString(`${stringKey}${separator}${suffix}`, { quotes: false });
            }
            return new sass.SassString(stringKey, { quotes: false });
        };
        const key_validate_addPrefix = (key) => [
            prefix,
            key.equals(_rootString) ? '' : key.toString().replace(/^['"](.*)['"]$/g, '$1'),
        ].filter(v => v === null || v === void 0 ? void 0 : v.length).join(separator);
        return Promise.all(Array.from(map.contents.entries()).map((_a) => __awaiter(this, [_a], void 0, function* ([t_key, value]) {
            const key = key_validate_addPrefix(t_key);
            // returns
            switch (sassValueToJS.typeOf(value)) {
                case 'undefined':
                    return false;
                case 'map':
                    return mapFlattener(value, key, suffix, separator).then(value_flat => {
                        // returns - empty
                        if (!value_flat.contents) {
                            return [[key_addSuffix(key), _emptyMap]];
                        }
                        return Array.from(value_flat.contents.entries());
                    });
            }
            return [[key_addSuffix(key), value]];
        }))).then(entries => new sass.SassMap(Immutable.OrderedMap(entries.filter(item => item !== false).flat())));
    });
    return {
        'mmutils-map-flatten( $map, $prefix: null, $suffix: null, $separator: null )': (args) => __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                sassAssertValueType('map', 'map', args[0], false),
                sassAssertValueType('prefix', 'string', args[1], true),
                sassAssertValueType('suffix', 'string', args[2], true),
                sassAssertValueType('separator', 'string', args[3], true),
            ]).then(([map, prefix, suffix, separator]) => {
                // returns - empty
                if (!map) {
                    return _emptyMap;
                }
                return mapFlattener(map, prefix, suffix, separator);
            });
        }),
    };
}
