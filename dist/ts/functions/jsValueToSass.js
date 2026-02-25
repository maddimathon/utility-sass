/**
 * @since 0.1.0-alpha.31
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.37
 * @license MIT
 */
import { OrderedMap } from 'immutable';
import * as sass from "sass-embedded";
/**
 * Translates sass values to JS values.
 *
 * @category Utilities - Sass API
 *
 * @since 0.1.0-alpha.31
 */
export async function jsValueToSass(value) {
    // returns
    if (value === null || typeof value === 'undefined') {
        return sass.sassNull;
    }
    // returns on match
    switch (typeof value) {
        case 'undefined':
            return sass.sassNull;
        case 'boolean':
            return value ? sass.sassTrue : sass.sassFalse;
        case 'bigint':
        case 'number':
            return new sass.SassNumber(Number(value));
        case 'string':
            return new sass.SassString(value);
        case 'object':
            // returns
            if (Array.isArray(value) || value instanceof Set) {
                return Promise.all(Array.from(value, jsValueToSass)).then((arr) => new sass.SassList(arr));
            }
            const entries = typeof value.entries === 'function'
                ? Array.from(value.entries())
                : Object.entries(value);
            const sassEntries = Promise.all(entries.map(([key, value]) => Promise.all([
                jsValueToSass(key),
                jsValueToSass(value),
            ])));
            const immuMap = await sassEntries.then((_entries) => OrderedMap(_entries));
            // @ts-ignore
            const sassMap = new sass.SassMap(immuMap);
            // const sassMap = immuMap.then( ( _map ) => new sass.SassMap( _map ) )
            // return test.then(
            //     entries => new sass.SassMap( OrderedMap( entries ) ) as sass.SassMap
            // );
            return sassMap;
    }
    return new sass.SassString(String(value));
}
//# sourceMappingURL=jsValueToSass.js.map