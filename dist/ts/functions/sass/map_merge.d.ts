/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.2.1
 * @license MIT
 */
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js utilities to merge two maps.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export declare function sassFn_map_merge(): {
    'mmutils-map-merge( $defaults, $inputs, $recursive: false, $respectUNDEFINED: false, $sort: false, $sortAs: "string", $sortReverse: false )': sass.CustomFunction<'async'>;
};
