/**
 * @since __PKG_VERSION___
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
 * @since __PKG_VERSION___
 */
export declare function sassFn_map_flatten({ console }: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): {
    readonly 'mmutils-map-flatten( $map, $prefix: null, $suffix: null )': (args: sass.Value[]) => Promise<sass.Value | sass.SassMap>;
};
//# sourceMappingURL=map_flatten.d.ts.map