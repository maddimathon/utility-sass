/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
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
export function sassFn_math_coerceUnit({}) {
    return {
        'mmutils-math-coerce-unit( $num, $unit )': async (args) => Promise.all([
            sassAssertValueType('num', 'number', args[0], false),
            sassAssertValueType('unit', 'number', args[1], false),
        ]).then(async ([number, unit]) => {
            // returns
            if (typeof number === 'undefined' || typeof unit === 'undefined') {
                return number ?? sass.sassNull;
            }
            return new sass.SassNumber(number.coerceValueToMatch(unit, 'num', 'unit'));
        }),
    };
}
