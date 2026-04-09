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
            const string = arr[0]?.hasQuotes ? arr[0]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[0]?.text;
            const search = arr[1]?.hasQuotes ? arr[1]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[1]?.text;
            const replace = arr[2]?.hasQuotes ? arr[2]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[2]?.text;
            const flags = arr[3]?.hasQuotes ? arr[3]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[3]?.text;
            const debug = arr[4];
            // returns - empty
            if (!string || !search) {
                if (debug) {
                    console.vi.log({ '[string.regex-replace] string': string }, 2, { linesIn: 1 });
                    console.vi.log({ '[string.regex-replace] search': search }, 2, { linesIn: 0 });
                }
                return _emptyString;
            }
            const regex = new RegExp(search, flags ?? 'g');
            if (debug) {
                console.vi.log({ '[string.regex-replace] string': string }, 2, { linesIn: 1 });
                // console.vi.log( { '[string.regex-replace] search': search }, 2, { linesIn: 0 } );
                console.vi.log({ '[string.regex-replace] regex': regex }, 2, { linesIn: 0 });
                console.vi.log({ '[string.regex-replace] string.match( regex )': string.match(new RegExp(search, flags?.replace('g', ''))) }, 2, { linesIn: 0 });
            }
            return jsValueToSass(string.replace(regex, replace ?? ''));
        }),
    };
}
//# sourceMappingURL=string_regexReplace.js.map