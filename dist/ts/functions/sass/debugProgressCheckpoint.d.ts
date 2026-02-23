/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.32
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import * as sass from "sass-embedded";
/**
 * A function to include in {@link sass.Options} that outputs a named timestamp
 * to the console (good for debugging compile time).
 *
 * @since 0.1.0-alpha.29
 */
export declare function sassFn_debugProgressCheckpoint({ config, console, params }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): [string, sass.CustomFunction<'async'>];
//# sourceMappingURL=debugProgressCheckpoint.d.ts.map