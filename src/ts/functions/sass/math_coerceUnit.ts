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

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js to convert a number to match the unit of another.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_math_coerceUnit(
    { }: Stage,
): { 'mmutils-math-coerce-unit( $num, $unit )': sass.CustomFunction<'async'>; } {

    return {
        'mmutils-math-coerce-unit( $num, $unit )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'num', 'number', args[ 0 ], false ),
                sassAssertValueType( 'unit', 'number', args[ 1 ], false ),
            ] ).then(
                async ( [ number, unit ] ): Promise<sass.SassNumber | typeof sass.sassNull> => {

                    // returns
                    if ( typeof number === 'undefined' || typeof unit === 'undefined' ) {
                        return number ?? sass.sassNull;
                    }

                    return new sass.SassNumber( number.coerceValueToMatch( unit, 'num', 'unit' ) );
                }
            ),
    };
}