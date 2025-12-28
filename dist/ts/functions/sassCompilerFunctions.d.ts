/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.8
 * @license MIT
 */
import type * as sass from "sass-embedded";
import type { Logger, Stage_Console } from '@maddimathon/build-utilities/internal';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export declare function sassCompilerFunctions(console: Logger | Stage_Console): {
    readonly 'mmutils-global-getCurrentVersion()': () => Promise<sass.SassMap>;
};
//# sourceMappingURL=sassCompilerFunctions.d.ts.map