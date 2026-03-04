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
}): {
    readonly 'mmutils-global-jsVarDump( $value, $name, $level )': (args: sass.Value[]) => Promise<sass.Value>;
    readonly 'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': (args: sass.Value[]) => Promise<sass.SassString>;
    readonly 'mmutils-global-getCurrentVersion()': () => sass.SassMap;
};
//# sourceMappingURL=sassCompilerFunctions.d.ts.map