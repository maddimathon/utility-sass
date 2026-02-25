/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.36
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import * as sass from "sass-embedded";
/**
 * A function to include in {@link sass.Options} that outputs a var dump to the console.
 *
 * @since 0.1.0-alpha.29
 */
export declare function sassFn_jsVarDump({ console }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): [string, sass.CustomFunction<'async'>];
//# sourceMappingURL=jsVarDump.d.ts.map