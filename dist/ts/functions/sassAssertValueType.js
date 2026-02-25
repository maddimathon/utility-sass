/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.33
 * @license MIT
 */
import * as sass from "sass-embedded";
import { sassValueToJS } from './sassValueToJS.js';
/**
 * Asserts a sass value type and converts it to a JS value.
 *
 * @since 0.1.0-alpha.29
 */
export async function sassAssertValueType(type, value) {
    let asserted;
    switch (type) {
        case 'bool':
            return value?.isTruthy ?? false;
        case 'list':
            asserted = value;
            break;
        case 'map':
            asserted = value?.assertMap();
            break;
        case 'number':
            asserted = value?.assertNumber();
            break;
        case 'string':
            asserted = value?.assertString();
            break;
    }
    // returns
    if (typeof asserted === 'undefined') {
        return undefined;
    }
    return sassValueToJS(asserted);
}
//# sourceMappingURL=sassAssertValueType.js.map