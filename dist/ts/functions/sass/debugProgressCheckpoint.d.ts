/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import * as sass from "sass-embedded";
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a named timestamp to the console (good for debugging compile time).
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.29
 */
export declare function sassFn_debugProgressCheckpoint({ config, console, params }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): {
    readonly 'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': (args: sass.Value[]) => Promise<sass.SassString>;
};
//# sourceMappingURL=debugProgressCheckpoint.d.ts.map