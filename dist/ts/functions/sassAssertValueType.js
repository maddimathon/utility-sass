/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import * as sass from "sass-embedded";
import { sassValueToJS } from './sassValueToJS.js';
/**
 * Asserts a sass value type and converts it to a JS value.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.29
 * @since 0.1.0-beta.0.draft Added required `name` param and optional `convertValue` param (defaults to false).
 */
export async function sassAssertValueType(name, type, value, convertValue = false) {
    // returns
    if (value === null || value?.realNull === null) {
        return undefined;
    }
    let asserted;
    switch (type) {
        case 'bool':
            // returns
            if (convertValue) {
                return !!value?.isTruthy;
            }
            return value?.isTruthy ? sass.sassTrue : sass.sassFalse;
        case 'list':
            asserted = value;
            break;
        case 'map':
            asserted = value?.assertMap(name);
            break;
        case 'number':
            asserted = value?.assertNumber(name);
            break;
        case 'string':
            asserted = value?.assertString(name);
            break;
    }
    // returns
    if (typeof asserted === 'undefined') {
        return undefined;
    }
    // returns
    if (!convertValue) {
        return asserted;
    }
    return sassValueToJS(asserted);
}
