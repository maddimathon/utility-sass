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
export declare function sassCompilerOpts<T_Partial extends sass.Options<'async'>>(console: Logger | Stage_Console, partial?: T_Partial): T_Partial & sass.Options<"async">;
//# sourceMappingURL=sassCompilerOpts.d.ts.map