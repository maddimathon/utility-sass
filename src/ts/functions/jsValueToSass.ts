/**
 * @since 0.1.0-alpha.31
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursiveRecord } from '@maddimathon/utility-typescript/types';

import { OrderedMap } from 'immutable';

import * as sass from "sass-embedded";
import { CssColours } from '../classes/CssColours.js';

// export function jsValueToSass( sassValue: null, opts?: jsValueToSass.Opts ): Promise<sass.Value>;
export function jsValueToSass( sassValue: boolean, opts?: jsValueToSass.Opts ): Promise<sass.SassBoolean>;
export function jsValueToSass( sassValue: Map<number | string, jsValueToSass.SimpleAcceptedValues>, opts?: jsValueToSass.Opts ): Promise<sass.SassMap>;
export function jsValueToSass<T_Obj extends RecursiveRecord<number | string, jsValueToSass.SimpleAcceptedValues>>( sassValue: T_Obj, opts?: jsValueToSass.Opts ): Promise<sass.SassMap>;
export function jsValueToSass( sassValue: number, opts?: jsValueToSass.Opts ): Promise<sass.SassNumber>;
export function jsValueToSass( sassValue: string, opts?: jsValueToSass.Opts ): Promise<sass.SassString>;
export function jsValueToSass( sassValue: jsValueToSass.AcceptedValues & any[], opts?: jsValueToSass.Opts ): Promise<sass.SassList>;

export function jsValueToSass(
    sassValue: jsValueToSass.AcceptedValues,
    opts?: jsValueToSass.Opts,
): Promise<jsValueToSass.AcceptedReturns>;

/**
 * Translates sass values to JS values.
 * 
 * @category Utilities – Sass API
 * 
 * @since 0.1.0-alpha.31
 */
export async function jsValueToSass(
    value?: jsValueToSass.AcceptedValues,
    _opts?: jsValueToSass.Opts,
): Promise<jsValueToSass.AcceptedReturns> {
    // returns
    if ( value === null || typeof value === 'undefined' ) {
        return sass.sassNull;
    }

    const requiredQuotesRegex = _opts?.requiredQuotesRegex ?? /[^a-z|0-9|\-|_]/i;

    const opts = {
        coloursAsStrings: false,

        ..._opts,

        quoteStrings: _opts?.quoteStrings ?? (
            typeof value === 'string' ? value.match( requiredQuotesRegex ) !== null : true
        ),

        requiredQuotesRegex,
    } satisfies Required<jsValueToSass.Opts>;

    // returns on match
    switch ( typeof value ) {

        case 'undefined':
            return sass.sassNull;

        case 'boolean':
            return value ? sass.sassTrue : sass.sassFalse;

        case 'bigint':
        case 'number':
            return new sass.SassNumber( Number( value ) );

        case 'string':
            const parsedColour = CssColours.parseCssColourFunction( value );

            // returns
            if ( parsedColour ) {

                // returns
                if ( opts.coloursAsStrings ) {
                    return new sass.SassString( value, { quotes: false } );
                }

                // returns
                switch ( parsedColour.space ) {

                    case 'hex':
                    case 'rgb':
                        return new sass.SassColor( {
                            space: 'rgb',
                            red: parsedColour.r,
                            green: parsedColour.g,
                            blue: parsedColour.b,
                        } );

                    case 'hsl':
                        return new sass.SassColor( {
                            space: 'hsl',
                            hue: parsedColour.h,
                            saturation: parsedColour.s,
                            lightness: parsedColour.l,
                        } );

                    case 'hwb':
                        return new sass.SassColor( {
                            space: 'hwb',
                            hue: parsedColour.h,
                            whiteness: parsedColour.w,
                            blackness: parsedColour.b,
                        } );

                    case 'lab':
                    case 'oklab':
                        return new sass.SassColor( {
                            space: parsedColour.space,
                            lightness: parsedColour.l,
                            a: parsedColour.a,
                            b: parsedColour.b,
                        } );

                    case 'lch':
                    case 'oklch':
                        return new sass.SassColor( {
                            space: parsedColour.space,
                            lightness: parsedColour.l,
                            chroma: parsedColour.c,
                            hue: parsedColour.h,
                        } );

                    default:
                        return new sass.SassString( value, { quotes: false } );
                }
            }

            return new sass.SassString( value, { quotes: opts.quoteStrings } );

        case 'object':
            // returns
            if ( Array.isArray( value ) || value instanceof Set ) {

                return Promise.all(
                    Array.from( value, ( _val ) => jsValueToSass( _val, opts ) )
                ).then(
                    ( arr ) => new sass.SassList( arr, { separator: ',' } )
                );
            }

            const entries = typeof value.entries === 'function'
                ? Array.from( value.entries() )
                : Object.entries( value );

            const sassEntries = Promise.all(
                entries.map( ( [ key, value ] ) => Promise.all( [
                    jsValueToSass( key, opts ),
                    jsValueToSass( value, opts ),
                ] ) )
            );

            return sassEntries.then(
                _entries => new sass.SassMap( OrderedMap( _entries ) )
            );
    }

    return new sass.SassString( String( value ) );
}

/**
 * Utilities for the {@link jsValueToSass} function.
 * 
 * @category Utilities – Sass API
 * 
 * @since 0.1.0-alpha.31
 */
export namespace jsValueToSass {

    /**
     * @since 0.1.0-alpha.31
     */
    export type AcceptedReturns = sass.Value;

    /**
     * @since 0.1.0-alpha.31
     */
    export type AcceptedValues =
        | SimpleAcceptedValues
        | AcceptedValues[]
        | RecursiveRecord<number | string, SimpleAcceptedValues>;

    /**
     * Options for the conversions.
     * 
     * @since ___PKG_VERSION___
     */
    export interface Opts {

        /**
         * Whether colour functions should be output as quoted strings (instead
         * of sass colours).
         *
         * @default false
         */
        coloursAsStrings?: boolean;

        /**
         * Default is based on the result of requiredQuotesRegex.
         */
        quoteStrings?: undefined | boolean;

        /**
         * The regex used to check for characters in a string that require the
         * string to be quoted.
         *
         * @default /[^a-z|0-9|\-|_]/i
         */
        requiredQuotesRegex?: RegExp;
    }

    /**
     * @since 0.1.0-alpha.31
     */
    export type SimpleAcceptedValues =
        | bigint
        | boolean
        | null
        | number
        | string
        | undefined
        | Map<number | string, SimpleAcceptedValues>
        | SimpleAcceptedValues[];
}
