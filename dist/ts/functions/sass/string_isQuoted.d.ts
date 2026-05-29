/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { Stage } from '@maddimathon/build-utilities';
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * FUNCTION_DESCRIPTION.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_string_isQuoted({}: Stage): {
    'mmutils-string-is-quoted( $str )': sass.CustomFunction<'async'>;
};
