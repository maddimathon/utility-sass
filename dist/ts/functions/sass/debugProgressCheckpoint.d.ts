/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.2.1
 * @license MIT
 */
import type { Stage } from '@maddimathon/build-utilities';
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a named timestamp to the console (good for debugging compile time).
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha
 */
export declare function sassFn_debugProgressCheckpoint({ console, params }: Stage): {
    'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': sass.CustomFunction<'async'>;
};
