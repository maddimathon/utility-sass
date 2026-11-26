/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.3.2
 * @license MIT
 */
import type { Stage } from '@maddimathon/build-utilities';
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a var dump to the console.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha
 */
export declare function sassFn_jsVarDump({ console, params, try: tryFn }: Stage): {
    'mmutils-global-jsVarDump( $uniqueID, $value, $name, $level, $returnInspection )': sass.CustomFunction<'async'>;
};
