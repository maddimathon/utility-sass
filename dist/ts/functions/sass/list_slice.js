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
 * returns a part of the given list.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_list_slice() {
    return {
        'mmutils-list-slice( $list, $start: 1, $end: null )': async (args) => Promise.all([
            sassAssertValueType('list', 'list', args[0], false),
            sassAssertValueType('start', 'number', args[1], false),
            sassAssertValueType('end', 'number', args[2], false),
        ]).then(async ([list, start, end]) => {
            // returns
            if (!list) {
                return new sass.SassList();
            }
            const startIndex = start ? list.sassIndexToListIndex(start) : 0;
            const endIndex = end ? list.sassIndexToListIndex(end) : undefined;
            return new sass.SassList(list.asList.slice(startIndex, endIndex));
        }),
    };
}
