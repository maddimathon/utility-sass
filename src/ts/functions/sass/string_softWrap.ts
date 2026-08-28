/**
 * @since __PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import Immutable from 'immutable';
import * as sass from "sass-embedded";

import { softWrapText } from '@maddimathon/utility-typescript';

import { sassAssertValueType } from '../sassAssertValueType.js';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * soft wraps a Sass string.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_softWrap(): {
    'mmutils-string-soft-wrap( $string, $width: null )': sass.CustomFunction<'async'>;
} {

    return {
        'mmutils-string-soft-wrap( $string, $width: null )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'string', 'string', args[ 0 ], true ),
                sassAssertValueType( 'width', 'number', args[ 1 ], true ),
            ] ).then(
                async ( [ string, width ] ): Promise<sass.SassList> => {
                    // returns
                    if ( !string ) {
                        return new sass.SassString( '' );
                    }

                    return new sass.SassList(
                        Immutable.List(
                            softWrapText( string, width ?? 80 ).split( /\n/g ).map(
                                str => new sass.SassString( str )
                            )
                        )
                    );
                }
            ),
    };
}