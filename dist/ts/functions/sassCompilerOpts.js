/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.19.draft
 * @license MIT
 */
import { sassCompilerFunctions } from './sassCompilerFunctions.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export function sassCompilerOpts(partial) {
    const silenceDeprecations = [
        ...partial?.silenceDeprecations ?? [],
        'if-function',
    ];
    return {
        ...partial ?? {},
        silenceDeprecations,
        functions: {
            ...partial?.functions ?? {},
            ...sassCompilerFunctions(),
        },
    };
}
//# sourceMappingURL=sassCompilerOpts.js.map