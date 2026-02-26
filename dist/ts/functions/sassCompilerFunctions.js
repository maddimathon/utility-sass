/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.39
 * @license MIT
 */
import { sass_getCurrentVersion } from './sass/getCurrentVersion.js';
import { sassFn_jsVarDump } from './sass/jsVarDump.js';
import { sassFn_debugProgressCheckpoint } from './sass/debugProgressCheckpoint.js';
/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 *
 * @since 0.1.0-alpha.8
 */
export function sassCompilerFunctions(args) {
    const debugCheckpointFn = sassFn_debugProgressCheckpoint(args);
    const jsVarDumpFn = sassFn_jsVarDump(args);
    return {
        'mmutils-global-getCurrentVersion()': sass_getCurrentVersion,
        [debugCheckpointFn[0]]: debugCheckpointFn[1],
        [jsVarDumpFn[0]]: jsVarDumpFn[1],
    };
}
//# sourceMappingURL=sassCompilerFunctions.js.map