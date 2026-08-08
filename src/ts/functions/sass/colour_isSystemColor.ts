/**
 * @since __PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import * as sass from "sass-embedded";

import { sassAssertValueType } from '../sassAssertValueType.js';
import { CssColours } from '../../classes/CssColours.js';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * checks if a given string represents a system color keyword.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_colour_isSystemColor(): {
    'mmutils-colour-is-system-color( $clr )': sass.CustomFunction<'async'>;
} {

    return {
        'mmutils-colour-is-system-color( $clr )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'clr', 'string', args[ 0 ], true ),
            ] ).then(
                async ( [ clr ] ): Promise<sass.SassList> => {
                    // returns
                    if ( !clr ) {
                        return sass.sassFalse;
                    }

                    return CssColours.isSystemColor( clr ) ? sass.sassTrue : sass.sassFalse;
                }
            ),
    };
}