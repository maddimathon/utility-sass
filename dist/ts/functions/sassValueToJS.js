/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.37
 * @license MIT
 */
import * as sass from "sass-embedded";
/**
 * Translates sass values to JS values.
 *
 * @category Utilities - Sass API
 *
 * @since 0.1.0-alpha.29
 */
export async function sassValueToJS(sassValue, _recursionCounter = 0) {
    // returns
    if (sassValue === null || sassValue.realNull === null) {
        return null;
    }
    if (typeof sassValue === 'undefined') {
        return undefined;
    }
    // returns
    if ('text' in sassValue && typeof sassValue.text === 'string') {
        return sassValue.text;
    }
    // returns on value type match
    if ('value' in sassValue) {
        switch (typeof sassValue.value) {
            case 'bigint':
            case 'boolean':
            case 'number':
            case 'undefined':
                return sassValue.value ?? null;
        }
    }
    // returns - is colour
    if ('lightness' in sassValue) {
        return String(sassValue);
    }
    const asMap = sassValue.tryMap();
    // returns
    if (_recursionCounter >= 1000) {
        throw `Recursion limit reached - recursed ${_recursionCounter} times (likely be a result of unsupported Sass values being parsed)`;
    }
    // returns
    if (!asMap) {
        return Promise.all(sassValue.asList.map(_val => sassValueToJS(_val, _recursionCounter + 1)));
    }
    return Promise.all(Array.from(asMap.contents.entries()).map(([key, value]) => Promise.all([
        sassValueToJS(key, _recursionCounter + 1),
        sassValueToJS(value, _recursionCounter + 1),
    ]))).then((map) => new Map(map));
}
//# sourceMappingURL=sassValueToJS.js.map