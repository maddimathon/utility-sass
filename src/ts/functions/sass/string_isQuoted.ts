/**
 * @since __PKG_VERSION___
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

import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * FUNCTION_DESCRIPTION.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_isQuoted(
    { }: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
): { 'mmutils-string-is-quoted( $str )': sass.CustomFunction<'async'>; } {

    return {
        'mmutils-string-is-quoted( $str )':
            async ( args: sass.Value[] ) => sassAssertValueType( 'string', 'string', args[ 0 ], false ).then(
                ( string ) => {
                    return string?.hasQuotes ? sass.sassTrue : sass.sassFalse;
                }
            ),
    };
}