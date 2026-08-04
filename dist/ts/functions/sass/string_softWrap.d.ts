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
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * soft wraps a Sass string.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_string_softWrap(): {
    'mmutils-string-soft-wrap( $string, $width: null )': sass.CustomFunction<'async'>;
};
