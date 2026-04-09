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
 * uses js to match a regex against a string.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_match({ console }) {
    return {
        'mmutils-string-match( $string, $pattern, $flags: null, $debug: false )': async (args) => Promise.all([
            sassAssertValueType('string', 'string', args[0], false),
            sassAssertValueType('pattern', 'string', args[1], false),
            sassAssertValueType('flags', 'string', args[2], false),
            sassAssertValueType('debug', 'bool', args[3], true),
        ]).then(async (arr) => {
            const string = arr[0]?.hasQuotes ? arr[0]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[0]?.text;
            const pattern = arr[1]?.hasQuotes ? arr[1]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[1]?.text;
            const flags = arr[2]?.hasQuotes ? arr[2]?.text.replace(/^['"](.*)['"]$/g, '$1') : arr[2]?.text;
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
            return jsValueToSass(string.match(regex));
        }),
    };
}
//# sourceMappingURL=string_match.js.map