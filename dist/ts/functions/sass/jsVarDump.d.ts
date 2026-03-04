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
 * outputs a var dump to the console.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.29
 */
export declare function sassFn_jsVarDump({ console }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): {
    readonly 'mmutils-global-jsVarDump( $value, $name, $level )': (args: sass.Value[]) => Promise<sass.Value>;
};
//# sourceMappingURL=jsVarDump.d.ts.map