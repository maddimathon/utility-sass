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
    Stage,
} from '@maddimathon/build-utilities';

import type * as sass from "sass-embedded";

import { sassFn_getCurrentVersion } from './sass/getCurrentVersion.js';
import { sassFn_jsVarDump } from './sass/jsVarDump.js';
import { sassFn_math_coerceUnit } from './sass/math_coerceUnit.js';
import { sassFn_string_isQuoted } from './sass/string_isQuoted.js';
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
    args: Stage,
): Readonly<{
    'mmutils-global-getCurrentVersion()': sass.CustomFunction<'async'>;
    'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': sass.CustomFunction<'async'>;
    'mmutils-global-jsVarDump( $uniqueID, $value, $name, $level )': sass.CustomFunction<'async'>;
    'mmutils-math-coerce-unit( $num, $unit )': sass.CustomFunction<'async'>;
    'mmutils-string-is-quoted( $str )': sass.CustomFunction<'async'>;
    'mmutils-string-match( $string, $pattern, $flags: null, $debug: false )': sass.CustomFunction<'async'>;
    'mmutils-string-regex-replace( $string, $search, $replace: "", $flags: null, $debug: false )': sass.CustomFunction<'async'>;
    'mmutils-string-regex-split( $string, $separator, $flags: null, $limit: null, $debug: false )': sass.CustomFunction<'async'>;
}> {

    return {
        ...sassFn_getCurrentVersion(),
        ...sassFn_debugProgressCheckpoint( args ),
        ...sassFn_jsVarDump( args ),
        ...sassFn_math_coerceUnit( args ),
        ...sassFn_string_isQuoted( args ),
        ...sassFn_string_match( args ),
        ...sassFn_string_regexReplace( args ),
        ...sassFn_string_regexSplit( args ),
    } as const satisfies sass.Options<'async'>[ 'functions' ];
}