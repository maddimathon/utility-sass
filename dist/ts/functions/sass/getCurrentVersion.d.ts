/**
 * @since 0.1.0-alpha
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
 * gets the version of the active sass compiler.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha
 */
export declare function sassFn_getCurrentVersion(): {
    'mmutils-global-getCurrentVersion()': sass.CustomFunction<'async'>;
};
