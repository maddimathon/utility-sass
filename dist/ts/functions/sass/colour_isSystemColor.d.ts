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
 * checks if a given string represents a system color keyword.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_colour_isSystemColor(): {
    'mmutils-colour-is-system-color( $clr )': sass.CustomFunction<'async'>;
};
