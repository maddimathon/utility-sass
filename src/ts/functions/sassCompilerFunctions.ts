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

import { sassFn_getCurrentVersion } from './sass/getCurrentVersion.js';
import { sassFn_jsVarDump } from './sass/jsVarDump.js';
import { sassFn_string_match } from './sass/string_match.js';
import { sassFn_string_regexReplace } from './sass/string_regexReplace.js';
import { sassFn_string_regexSplit } from './sass/string_regexSplit.js';
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
export function sassCompilerFunctions(
    args: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
): sass.Options<'async'>[ 'functions' ] {

    return {
        ...sassFn_getCurrentVersion(),
        ...sassFn_debugProgressCheckpoint( args ),
        ...sassFn_jsVarDump( args ),
        ...sassFn_string_match( args ),
        ...sassFn_string_regexReplace( args ),
        ...sassFn_string_regexSplit( args ),
    };
}