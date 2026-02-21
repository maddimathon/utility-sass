/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.31
 * @license MIT
 */
import type { CLI, Config, Stage } from '@maddimathon/build-utilities';
import type { Logger } from '@maddimathon/build-utilities/internal';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export declare function sassCompilerOpts<T_Partial extends Stage.Compiler.Args.Sass | Partial<Stage.Compiler.Args.Sass>>(args: {
    config: Config.Class;
    console: Logger;
    params: CLI.Params;
}, partial?: T_Partial): T_Partial & Partial<Stage.Compiler.Args.Sass>;
//# sourceMappingURL=sassCompilerOpts.d.ts.map