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
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * FUNCTION_DESCRIPTION.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_isQuoted({}) {
    return {
        'mmutils-string-is-quoted( $str )': async (args) => sassAssertValueType('string', 'string', args[0], false).then((string) => {
            return (string === null || string === void 0 ? void 0 : string.hasQuotes) ? sass.sassTrue : sass.sassFalse;
        }),
    };
}
