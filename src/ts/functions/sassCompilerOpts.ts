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

import { sassCompilerFunctions } from './sassCompilerFunctions.js';

/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 * 
 * @since 0.1.0-alpha.8
 */
export function sassCompilerOpts<T_Partial extends sass.Options<'async'>>(
    partial?: T_Partial,
) {

    const silenceDeprecations: sass.DeprecationOrId[] = [
        ...partial?.silenceDeprecations ?? [],
        'if-function',
    ];

    return {
        ...partial ?? {} as T_Partial,

        silenceDeprecations,

        functions: {
            ...partial?.functions ?? {},
            ...sassCompilerFunctions(),
        },
    } as T_Partial & sass.Options<'async'>;
}