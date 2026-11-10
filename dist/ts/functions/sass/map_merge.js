/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.2.0-draft
 * @license MIT
 */
import Immutable from 'immutable';
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
import { sassValueToJS } from '../sassValueToJS.js';
import { toValidNumber } from '@maddimathon/utility-typescript';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js utilities to merge two maps.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_map_merge() {
    const _emptyMap = new sass.SassMap();
    const _undefinedString = new sass.SassString('UNDEFINED');
    const mapFlattener = async (defaults, inputs, opts) => {
        var _a, _b, _c;
        const newMap = new Map((_b = (_a = defaults === null || defaults === void 0 ? void 0 : defaults.contents) === null || _a === void 0 ? void 0 : _a.entries()) !== null && _b !== void 0 ? _b : []);
        const inputEntries = (_c = inputs === null || inputs === void 0 ? void 0 : inputs.contents) === null || _c === void 0 ? void 0 : _c.entries();
        if (inputEntries) {
            for (const [key, value] of inputEntries) {
                const _valueTypeOf = sassValueToJS.typeOf(value);
                // if respect undefined and this is a string, then we will test
                if (opts.respectUNDEFINED
                    && _valueTypeOf === 'string') {
                    if (value.equals(_undefinedString)) {
                        // then we remove it
                        newMap.delete(key);
                    }
                    else {
                        // replace as normal
                        newMap.set(key, value);
                    }
                }
                // if recursive and this is a map, then we need to recurse
                else if (opts.recursive
                    && _valueTypeOf === 'map'
                    && sassValueToJS.typeOf.isMap(defaults === null || defaults === void 0 ? void 0 : defaults.get(key))) {
                    newMap.set(key, await mapFlattener(defaults === null || defaults === void 0 ? void 0 : defaults.get(key), value, opts));
                }
                else {
                    newMap.set(key, value);
                }
            }
        }
        // returns
        if (!opts.sort) {
            return new sass.SassMap(Immutable.OrderedMap(newMap.entries()));
        }
        const entries = Array.from(newMap.entries());
        const _sortMaker = opts.sortAs === 'number'
            ? ([key]) => { var _a; return (_a = toValidNumber(sassValueToJS.sync(key))) !== null && _a !== void 0 ? _a : String(sassValueToJS.sync(key)); }
            : ([key]) => String(sassValueToJS.sync(key));
        entries.sort((value_a, value_b) => {
            const sorter_a = _sortMaker(value_a);
            const sorter_b = _sortMaker(value_b);
            if (sorter_a > sorter_b) {
                return 1;
            }
            if (sorter_a < sorter_b) {
                return -1;
            }
            return 0;
        });
        if (opts.sortReverse) {
            entries.reverse();
        }
        return new sass.SassMap(Immutable.OrderedMap(entries));
    };
    return {
        'mmutils-map-merge( $defaults, $inputs, $recursive: false, $respectUNDEFINED: false, $sort: false, $sortAs: "string", $sortReverse: false )': async (args) => Promise.all([
            sassAssertValueType('defaults', 'map', args[0], false),
            sassAssertValueType('inputs', 'map', args[1], false),
            sassAssertValueType('recursive', 'bool', args[2], true),
            sassAssertValueType('respectUNDEFINED', 'bool', args[3], true),
            sassAssertValueType('sort', 'bool', args[4], true),
            sassAssertValueType('sortAs', 'string', args[5], true),
            sassAssertValueType('sortReverse', 'bool', args[6], true),
        ]).then(([defaults, inputs, recursive, respectUNDEFINED, sort, sortAs, sortReverse]) => {
            var _a, _b;
            // returns - empty
            if (!defaults || !((_a = defaults === null || defaults === void 0 ? void 0 : defaults.contents) === null || _a === void 0 ? void 0 : _a.size)) {
                return inputs !== null && inputs !== void 0 ? inputs : _emptyMap;
            }
            // returns - empty
            if (!inputs || !((_b = inputs === null || inputs === void 0 ? void 0 : inputs.contents) === null || _b === void 0 ? void 0 : _b.size)) {
                return defaults !== null && defaults !== void 0 ? defaults : _emptyMap;
            }
            return mapFlattener(defaults, inputs, {
                recursive: recursive !== null && recursive !== void 0 ? recursive : false,
                respectUNDEFINED: respectUNDEFINED !== null && respectUNDEFINED !== void 0 ? respectUNDEFINED : false,
                sort: sort !== null && sort !== void 0 ? sort : false,
                sortAs,
                sortReverse: sortReverse !== null && sortReverse !== void 0 ? sortReverse : false,
            });
        }),
    };
}
