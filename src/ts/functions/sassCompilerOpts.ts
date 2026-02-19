/**
 * @since 0.1.0-alpha.8
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type * as sass from "sass-embedded";

import type {
    CLI,
    Config,
    Stage,
} from '@maddimathon/build-utilities';

import type {
    Logger,
} from '@maddimathon/build-utilities/internal';

import { sassCompilerFunctions } from './sassCompilerFunctions.js';

/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 * 
 * @since 0.1.0-alpha.8
 */
export function sassCompilerOpts<
    T_Partial extends Stage.Compiler.Args.Sass | Partial<Stage.Compiler.Args.Sass>
>(
    args: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
    partial?: T_Partial,
): T_Partial & Partial<Stage.Compiler.Args.Sass> {

    const silenceDeprecations: sass.DeprecationOrId[] = [
        ...partial?.silenceDeprecations ?? [],
        'if-function',
    ];

    return {
        ...partial ?? {} as T_Partial,

        silenceDeprecations,

        functions: {
            ...partial?.functions ?? {},
            ...sassCompilerFunctions( args ),
        },
    } satisfies T_Partial & Partial<Stage.Compiler.Args.Sass>;
}