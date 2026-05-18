/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import type * as sass from "sass-embedded";
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.8
 */
export declare function sassCompilerFunctions(args: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): Readonly<{
    'mmutils-global-getCurrentVersion()': sass.CustomFunction<'async'>;
    'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': sass.CustomFunction<'async'>;
    'mmutils-global-jsVarDump( $value, $name, $level )': sass.CustomFunction<'async'>;
    'mmutils-math-coerce-unit( $num, $unit )': sass.CustomFunction<'async'>;
    'mmutils-string-is-quoted( $str )': sass.CustomFunction<'async'>;
    'mmutils-string-match( $string, $pattern, $flags: null, $debug: false )': sass.CustomFunction<'async'>;
    'mmutils-string-regex-replace( $string, $search, $replace: "", $flags: null, $debug: false )': sass.CustomFunction<'async'>;
    'mmutils-string-regex-split( $string, $separator, $flags: null, $limit: null, $debug: false )': sass.CustomFunction<'async'>;
}>;
