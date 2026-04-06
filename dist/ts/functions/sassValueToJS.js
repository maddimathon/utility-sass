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
/**
 * Translates sass values to JS values.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.29
 */
export async function sassValueToJS(sassValue, _recursionCounter = 0) {
    // returns
    if (sassValue === null) {
        return null;
    }
    // returns
    if (_recursionCounter >= 1000) {
        throw `Recursion limit reached - recursed ${_recursionCounter} times (likely be a result of unsupported Sass values being parsed)`;
    }
    // returns
    switch (sassValueToJS.typeOf(sassValue)) {
        case 'boolean':
        case 'number':
        case 'undefined':
            return sassValue?.value ?? null;
        case 'color':
            return String(sassValue);
        case 'map':
            const asMap = sassValue.tryMap();
            // returns
            if (!asMap?.contents.size) {
                return new Map();
            }
            return Promise.all(Array.from(sassValue.tryMap().contents?.entries() ?? []).map(([key, value]) => Promise.all([
                sassValueToJS(key, _recursionCounter + 1),
                sassValueToJS(value, _recursionCounter + 1),
            ]))).then((entries) => new Map(entries));
        case 'null':
            return null;
        case 'string':
            const sassStr = sassValue;
            return sassStr.hasQuotes ? sassStr.text.replace(/^['"](.*)['"]$/g, '$1') : sassStr.text;
        case 'undefined':
            return undefined;
        case 'list':
        default:
            const asList = sassValue.asList;
            // returns
            if (!asList.size) {
                return [];
            }
            return Promise.all(sassValue.asList.map(_val => sassValueToJS(_val, _recursionCounter + 1)));
    }
}
/**
 * Utilities for the {@link sassValueToJS} function.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.29
 */
(function (sassValueToJS) {
    /**
     * Gets the type of a sass value.
     *
     * @since 0.1.0-beta.0.draft
     */
    function typeOf(value) {
        // returns
        if (typeof value === 'undefined') {
            return 'undefined';
        }
        // returns
        if (value === null || value.realNull === null) {
            return 'null';
        }
        // returns
        if ('text' in value && typeof value.text === 'string') {
            return 'string';
        }
        // returns on value type match
        if ('value' in value) {
            switch (typeof value.value) {
                case 'boolean':
                    return 'boolean';
                case 'bigint':
                case 'number':
                    return 'number';
                case 'undefined':
                    return 'undefined';
            }
        }
        // returns - is colour
        if ('lightness' in value) {
            return 'color';
        }
        return (!value.tryMap() ? 'list' : 'map');
    }
    sassValueToJS.typeOf = typeOf;
})(sassValueToJS || (sassValueToJS = {}));
//# sourceMappingURL=sassValueToJS.js.map