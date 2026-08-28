/**
 * @since __PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
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
export function sassFn_string_softWrap() {
    return {
        'mmutils-string-soft-wrap( $string, $width: null )': async (args) => Promise.all([
            sassAssertValueType('string', 'string', args[0], true),
            sassAssertValueType('width', 'number', args[1], true),
        ]).then(async ([string, width]) => {
            // returns
            if (!string) {
                return new sass.SassString('');
            }
            return new sass.SassList(Immutable.List(softWrapText(string, width !== null && width !== void 0 ? width : 80).split(/\n/g).map(str => new sass.SassString(str))));
        }),
    };
}
