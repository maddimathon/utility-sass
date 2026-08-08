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
import { CssColours } from '../../classes/CssColours.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * checks if a given string represents a system color keyword.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_colour_isSystemColor() {
    return {
        'mmutils-colour-is-system-color( $clr )': async (args) => Promise.all([
            sassAssertValueType('clr', 'string', args[0], true),
        ]).then(async ([clr]) => {
            // returns
            if (!clr) {
                return sass.sassFalse;
            }
            return CssColours.isSystemColor(clr) ? sass.sassTrue : sass.sassFalse;
        }),
    };
}
