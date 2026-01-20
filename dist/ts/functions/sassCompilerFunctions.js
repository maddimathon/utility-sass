/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.14
 * @license MIT
 */
import { sass_getCurrentVersion } from './sass/getCurrentVersion.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export function sassCompilerFunctions() {
    return {
        'mmutils-global-getCurrentVersion()': sass_getCurrentVersion,
    };
}
//# sourceMappingURL=sassCompilerFunctions.js.map