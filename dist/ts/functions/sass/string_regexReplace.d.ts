/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js to replace in a string using regex.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_string_regexReplace({ console }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): {
    'mmutils-string-regex-replace( $string, $search, $replace: "", $flags: null, $debug: false )': sass.CustomFunction<'async'>;
};
