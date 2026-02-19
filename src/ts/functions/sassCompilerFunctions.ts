/**
 * @since 0.1.0-alpha.8
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    CLI,
    Config,
} from '@maddimathon/build-utilities';

import type {
    Logger,
} from '@maddimathon/build-utilities/internal';

import type * as sass from "sass-embedded";

import { sass_getCurrentVersion } from './sass/getCurrentVersion.js';
import { sassFn_Template } from './sass/@sassFn_Template.js';
import { sassFn_jsVarDump } from './sass/jsVarDump.js';
import { sassFn_debugProgressCheckpoint } from './sass/debugProgressCheckpoint.js';

/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 * 
 * @since 0.1.0-alpha.8
 */
export function sassCompilerFunctions(
    args: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
) {

    const debugCheckpointFn = sassFn_debugProgressCheckpoint( args );
    const jsVarDumpFn = sassFn_jsVarDump( args );
    const templateFn = sassFn_Template( args );

    return {
        'mmutils-global-getCurrentVersion()': sass_getCurrentVersion,
        [ debugCheckpointFn[ 0 ] ]: debugCheckpointFn[ 1 ],
        [ jsVarDumpFn[ 0 ] ]: jsVarDumpFn[ 1 ],
        [ templateFn[ 0 ] ]: templateFn[ 1 ],

    } as const satisfies sass.Options<'async'>[ 'functions' ];
}