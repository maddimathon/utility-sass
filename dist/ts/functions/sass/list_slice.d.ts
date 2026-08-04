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
 * returns a part of the given list.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_list_slice(): {
    'mmutils-list-slice( $list, $start: 1, $end: null )': sass.CustomFunction<'async'>;
};
