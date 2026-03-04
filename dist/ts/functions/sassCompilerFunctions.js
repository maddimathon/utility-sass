/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { sassFn_getCurrentVersion } from './sass/getCurrentVersion.js';
import { sassFn_jsVarDump } from './sass/jsVarDump.js';
import { sassFn_debugProgressCheckpoint } from './sass/debugProgressCheckpoint.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.8
 */
export function sassCompilerFunctions(args) {
    return {
        ...sassFn_getCurrentVersion(),
        ...sassFn_debugProgressCheckpoint(args),
        ...sassFn_jsVarDump(args),
    };
}
//# sourceMappingURL=sassCompilerFunctions.js.map