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
 * checks if a given string represents a colour-like value (a keyword, slug,
 * function, etc.).
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_colour_isColourLike(): {
    'mmutils-colour-is-colour-like( $clr )': sass.CustomFunction<'async'>;
} {

    return {
        'mmutils-colour-is-colour-like( $clr )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'clr', 'string', args[ 0 ], true ),
            ] ).then(
                async ( [ clr ] ): Promise<sass.SassList> => {
                    // returns
                    if ( !clr ) {
                        return sass.sassFalse;
                    }

                    // returns
                    if (
                        CssColours.isKeyword( clr )
                        || CssColours.isSlug( clr )
                        || CssColours.isSystemColor( clr )
                    ) {
                        return sass.sassTrue;
                    }

                    return CssColours.isFunction( clr ) ? sass.sassTrue : sass.sassFalse;
                }
            ),
    };
}