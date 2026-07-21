/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { sassCompilerFunctions } from './sassCompilerFunctions.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.8
 */
export function sassCompilerOpts(args, partial) {
    var _a, _b;
    const silenceDeprecations = [
        ...(_a = partial === null || partial === void 0 ? void 0 : partial.silenceDeprecations) !== null && _a !== void 0 ? _a : [],
        'if-function',
    ];
    return Object.assign(Object.assign({}, partial !== null && partial !== void 0 ? partial : {}), { silenceDeprecations, functions: Object.assign(Object.assign({}, (_b = partial === null || partial === void 0 ? void 0 : partial.functions) !== null && _b !== void 0 ? _b : {}), sassCompilerFunctions(args)) });
}
