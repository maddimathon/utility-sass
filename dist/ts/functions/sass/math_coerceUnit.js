/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        'mmutils-math-coerce-unit( $num, $unit )': (args) => __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                sassAssertValueType('num', 'number', args[0], false),
                sassAssertValueType('unit', 'number', args[1], false),
            ]).then((_a) => __awaiter(this, [_a], void 0, function* ([number, unit]) {
                // returns
                if (typeof number === 'undefined' || typeof unit === 'undefined') {
                    return number !== null && number !== void 0 ? number : sass.sassNull;
                }
                return new sass.SassNumber(number.coerceValueToMatch(unit, 'num', 'unit'));
            }));
        }),
    };
}
