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
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
import { jsValueToSass } from '../jsValueToSass.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js to match a regex against a string.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_match({ console }) {
    return {
        'mmutils-string-match( $string, $pattern, $flags: null, $debug: false )': (args) => __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                sassAssertValueType('string', 'string', args[0], false),
                sassAssertValueType('pattern', 'string', args[1], false),
                sassAssertValueType('flags', 'string', args[2], false),
                sassAssertValueType('debug', 'bool', args[3], true),
            ]).then((arr) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                const quoteStrings = (_a = arr[0]) === null || _a === void 0 ? void 0 : _a.hasQuotes;
                const string = ((_b = arr[0]) === null || _b === void 0 ? void 0 : _b.hasQuotes) ? (_c = arr[0]) === null || _c === void 0 ? void 0 : _c.text.replace(/^['"](.*)['"]$/g, '$1') : (_d = arr[0]) === null || _d === void 0 ? void 0 : _d.text;
                const pattern = ((_e = arr[1]) === null || _e === void 0 ? void 0 : _e.hasQuotes) ? (_f = arr[1]) === null || _f === void 0 ? void 0 : _f.text.replace(/^['"](.*)['"]$/g, '$1') : (_g = arr[1]) === null || _g === void 0 ? void 0 : _g.text;
                const flags = ((_h = arr[2]) === null || _h === void 0 ? void 0 : _h.hasQuotes) ? (_j = arr[2]) === null || _j === void 0 ? void 0 : _j.text.replace(/^['"](.*)['"]$/g, '$1') : (_k = arr[2]) === null || _k === void 0 ? void 0 : _k.text;
                const debug = arr[3];
                // returns - empty
                if (!string || !pattern) {
                    if (debug) {
                        console.vi.log({ '[string.regex-replace] string': string }, 2);
                        console.vi.log({ '[string.regex-replace] pattern': pattern }, 2);
                    }
                    return sass.sassNull;
                }
                const regex = new RegExp(pattern, flags);
                if (debug) {
                    console.vi.log({ '[string.match] regex': regex }, 2);
                }
                return jsValueToSass(string.match(regex), { quoteStrings });
            }));
        }),
    };
}
