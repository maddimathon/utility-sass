/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
import { jsValueToSass } from '../jsValueToSass.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js to replace in a string using regex.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_regexReplace({ console }) {
    const _emptyString = new sass.SassString();
    return {
        'mmutils-string-regex-replace( $string, $search, $replace: "", $flags: null, $debug: false )': async (args) => Promise.all([
            sassAssertValueType('string', 'string', args[0], false),
            sassAssertValueType('search', 'string', args[1], false),
            sassAssertValueType('replace', 'string', args[2], false),
            sassAssertValueType('flags', 'string', args[3], false),
            sassAssertValueType('debug', 'bool', args[4], true),
        ]).then(async (arr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            const quoteStrings = (_a = arr[0]) === null || _a === void 0 ? void 0 : _a.hasQuotes;
            const string = ((_b = arr[0]) === null || _b === void 0 ? void 0 : _b.hasQuotes) ? (_c = arr[0]) === null || _c === void 0 ? void 0 : _c.text.replace(/^['"](.*)['"]$/g, '$1') : (_d = arr[0]) === null || _d === void 0 ? void 0 : _d.text;
            const search = ((_e = arr[1]) === null || _e === void 0 ? void 0 : _e.hasQuotes) ? (_f = arr[1]) === null || _f === void 0 ? void 0 : _f.text.replace(/^['"](.*)['"]$/g, '$1') : (_g = arr[1]) === null || _g === void 0 ? void 0 : _g.text;
            const replace = ((_h = arr[2]) === null || _h === void 0 ? void 0 : _h.hasQuotes) ? (_j = arr[2]) === null || _j === void 0 ? void 0 : _j.text.replace(/^['"](.*)['"]$/g, '$1') : (_k = arr[2]) === null || _k === void 0 ? void 0 : _k.text;
            const flags = ((_l = arr[3]) === null || _l === void 0 ? void 0 : _l.hasQuotes) ? (_m = arr[3]) === null || _m === void 0 ? void 0 : _m.text.replace(/^['"](.*)['"]$/g, '$1') : (_o = arr[3]) === null || _o === void 0 ? void 0 : _o.text;
            const debug = arr[4];
            // returns - empty
            if (!string || !search) {
                if (debug) {
                    console.vi.log({ '[string.regex-replace] string': string }, 2, { msg: { linesIn: 1 } });
                    console.vi.log({ '[string.regex-replace] search': search }, 2, { msg: { linesIn: 0 } });
                }
                return _emptyString;
            }
            const regex = new RegExp(search, flags !== null && flags !== void 0 ? flags : 'g');
            if (debug) {
                console.vi.log({ '[string.regex-replace] string': string }, 2, { msg: { linesIn: 1 } });
                // console.vi.log( { '[string.regex-replace] search': search }, 2, { msg: { linesIn: 0 } } );
                console.vi.log({ '[string.regex-replace] regex': regex }, 2, { msg: { linesIn: 0 } });
                console.vi.log({ '[string.regex-replace] string.match( regex )': string.match(regex) }, 2, { msg: { linesIn: 0 } });
            }
            return jsValueToSass(string.replace(regex, replace !== null && replace !== void 0 ? replace : ''), { quoteStrings });
        }),
    };
}
