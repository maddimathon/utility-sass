/**
 * @since 0.1.0-alpha.31
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { OrderedMap } from 'immutable';
import * as sass from "sass-embedded";
import { CssColours } from '../classes/CssColours.js';
/**
 * Translates sass values to JS values.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.31
 */
export async function jsValueToSass(value, _opts) {
    // returns
    if (value === null || typeof value === 'undefined') {
        return sass.sassNull;
    }
    const requiredQuotesRegex = _opts?.requiredQuotesRegex ?? /[^a-z|0-9|\-|_]/i;
    const opts = {
        coloursAsStrings: false,
        ..._opts,
        quoteStrings: _opts?.quoteStrings ?? (typeof value === 'string' ? value.match(requiredQuotesRegex) !== null : true),
        requiredQuotesRegex,
    };
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
            const parsedColour = CssColours.parseFunction(value);
            // returns
            if (parsedColour) {
                // returns
                if (opts.coloursAsStrings) {
                    return new sass.SassString(value, { quotes: false });
                }
                // returns
                switch (parsedColour.space) {
                    case 'hex':
                    case 'rgb':
                        return new sass.SassColor({
                            space: 'rgb',
                            red: parsedColour.r,
                            green: parsedColour.g,
                            blue: parsedColour.b,
                        });
                    case 'hsl':
                        return new sass.SassColor({
                            space: 'hsl',
                            hue: parsedColour.h,
                            saturation: parsedColour.s,
                            lightness: parsedColour.l,
                        });
                    case 'hwb':
                        return new sass.SassColor({
                            space: 'hwb',
                            hue: parsedColour.h,
                            whiteness: parsedColour.w,
                            blackness: parsedColour.b,
                        });
                    case 'lab':
                    case 'oklab':
                        return new sass.SassColor({
                            space: parsedColour.space,
                            lightness: parsedColour.l,
                            a: parsedColour.a,
                            b: parsedColour.b,
                        });
                    case 'lch':
                    case 'oklch':
                        return new sass.SassColor({
                            space: parsedColour.space,
                            lightness: parsedColour.l,
                            chroma: parsedColour.c,
                            hue: parsedColour.h,
                        });
                    default:
                        return new sass.SassString(value, { quotes: false });
                }
            }
            return new sass.SassString(value, { quotes: opts.quoteStrings });
        case 'object':
            // returns
            if (Array.isArray(value) || value instanceof Set) {
                return Promise.all(Array.from(value, (_val) => jsValueToSass(_val, opts))).then((arr) => new sass.SassList(arr, { separator: ',' }));
            }
            const entries = typeof value.entries === 'function'
                ? Array.from(value.entries())
                : Object.entries(value);
            const sassEntries = Promise.all(entries.map(([key, value]) => Promise.all([
                jsValueToSass(key, opts),
                jsValueToSass(value, opts),
            ])));
            return sassEntries.then(_entries => new sass.SassMap(OrderedMap(_entries)));
    }
    return new sass.SassString(String(value));
}
