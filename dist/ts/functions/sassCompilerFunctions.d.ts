/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.31
 * @license MIT
 */
import type { CLI, Config } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
import type * as sass from "sass-embedded";
import { sass_getCurrentVersion } from './sass/getCurrentVersion.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export declare function sassCompilerFunctions(args: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}): {
    readonly [x: string]: sass.CustomFunction<"async">;
    readonly 'mmutils-global-getCurrentVersion()': typeof sass_getCurrentVersion;
};
//# sourceMappingURL=sassCompilerFunctions.d.ts.map