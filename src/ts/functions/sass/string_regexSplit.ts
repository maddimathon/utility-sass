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
    Stage,
} from '@maddimathon/build-utilities';

import * as sass from "sass-embedded";

import { sassAssertValueType } from '../sassAssertValueType.js';
import { jsValueToSass } from '../jsValueToSass.js';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js to replace in a string using regex.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_string_regexSplit(
    { console }: Stage,
): { 'mmutils-string-regex-split( $string, $separator, $flags: null, $limit: null, $debug: false )': sass.CustomFunction<'async'>; } {

    const _emptyString = new sass.SassString();

    return {
        'mmutils-string-regex-split( $string, $separator, $flags: null, $limit: null, $debug: false )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'string', 'string', args[ 0 ], false ),
                sassAssertValueType( 'separator', 'string', args[ 1 ], false ),
                sassAssertValueType( 'flags', 'string', args[ 2 ], false ),
                sassAssertValueType( 'limit', 'number', args[ 3 ], true ),
                sassAssertValueType( 'debug', 'bool', args[ 4 ], true ),
            ] ).then(
                async ( arr ): Promise<sass.SassList> => {

                    const quoteStrings = arr[ 0 ]?.hasQuotes;

                    const string = arr[ 0 ]?.hasQuotes ? arr[ 0 ]?.text.replace( /^['"](.*)['"]$/g, '$1' ) : arr[ 0 ]?.text;
                    const separator = arr[ 1 ]?.hasQuotes ? arr[ 1 ]?.text.replace( /^['"](.*)['"]$/g, '$1' ) : arr[ 1 ]?.text;
                    const flags = arr[ 2 ]?.hasQuotes ? arr[ 2 ]?.text.replace( /^['"](.*)['"]$/g, '$1' ) : arr[ 2 ]?.text;
                    const limit = arr[ 3 ];
                    const debug = arr[ 4 ];

                    // returns - empty
                    if ( !string || !separator ) {
                        if ( debug ) {
                            console.vi.log( { '[string.regex-split] string': string }, 2, { msg: { linesIn: 1 } } );
                            console.vi.log( { '[string.regex-split] separator': separator }, 2, { msg: { linesIn: 0 } } );
                        }

                        return _emptyString;
                    }

                    const regex = new RegExp( separator, flags ?? 'g' );

                    if ( debug ) {
                        console.vi.log( { '[string.regex-split] string': string }, 2, { msg: { linesIn: 1 } } );
                        // console.vi.log( { '[string.regex-split] separator': separator }, 2, { msg: { linesIn: 0 } } );
                        console.vi.log( { '[string.regex-split] regex': regex }, 2, { msg: { linesIn: 0 } } );
                        console.vi.log( { '[string.regex-split] string.match( regex )': string.match( regex ) }, 2, { msg: { linesIn: 0 } } );
                    }

                    return jsValueToSass( string.split( regex, limit ), { quoteStrings } );
                }
            ),
    } as const satisfies { [ key: string ]: sass.CustomFunction<'async'>; };
}