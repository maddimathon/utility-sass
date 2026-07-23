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
export function sassFn_string_regexSplit({ console }) {
    const _emptyString = new sass.SassString();
    return {
        'mmutils-string-regex-split( $string, $separator, $flags: null, $limit: null, $debug: false )': async (args) => Promise.all([
            sassAssertValueType('string', 'string', args[0], false),
            sassAssertValueType('separator', 'string', args[1], false),
            sassAssertValueType('flags', 'string', args[2], false),
            sassAssertValueType('limit', 'number', args[3], true),
            sassAssertValueType('debug', 'bool', args[4], true),
        ]).then(async (arr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const quoteStrings = (_a = arr[0]) === null || _a === void 0 ? void 0 : _a.hasQuotes;
            const string = ((_b = arr[0]) === null || _b === void 0 ? void 0 : _b.hasQuotes) ? (_c = arr[0]) === null || _c === void 0 ? void 0 : _c.text.replace(/^['"](.*)['"]$/g, '$1') : (_d = arr[0]) === null || _d === void 0 ? void 0 : _d.text;
            const separator = ((_e = arr[1]) === null || _e === void 0 ? void 0 : _e.hasQuotes) ? (_f = arr[1]) === null || _f === void 0 ? void 0 : _f.text.replace(/^['"](.*)['"]$/g, '$1') : (_g = arr[1]) === null || _g === void 0 ? void 0 : _g.text;
            const flags = ((_h = arr[2]) === null || _h === void 0 ? void 0 : _h.hasQuotes) ? (_j = arr[2]) === null || _j === void 0 ? void 0 : _j.text.replace(/^['"](.*)['"]$/g, '$1') : (_k = arr[2]) === null || _k === void 0 ? void 0 : _k.text;
            const limit = arr[3];
            const debug = arr[4];
            // returns - empty
            if (!string || !separator) {
                if (debug) {
                    console.vi.log({ '[string.regex-split] string': string }, 2, { msg: { linesIn: 1 } });
                    console.vi.log({ '[string.regex-split] separator': separator }, 2, { msg: { linesIn: 0 } });
                }
                return _emptyString;
            }
            const regex = new RegExp(separator, flags !== null && flags !== void 0 ? flags : 'g');
            if (debug) {
                console.vi.log({ '[string.regex-split] string': string }, 2, { msg: { linesIn: 1 } });
                // console.vi.log( { '[string.regex-split] separator': separator }, 2, { msg: { linesIn: 0 } } );
                console.vi.log({ '[string.regex-split] regex': regex }, 2, { msg: { linesIn: 0 } });
                console.vi.log({ '[string.regex-split] string.match( regex )': string.match(regex) }, 2, { msg: { linesIn: 0 } });
            }
            return jsValueToSass(string.split(regex, limit), { quoteStrings });
        }),
    };
}
