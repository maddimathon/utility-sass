/**
 * @since 0.1.0-alpha.31
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import { OrderedMap } from 'immutable';

import * as sass from "sass-embedded";

/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since 0.1.0-alpha.31
 */
export type RecursiveRecord<
    T_Keys extends number | string | symbol = number | string | symbol,
    T_Values extends any = any,
    T_SubKeys extends number | string | symbol = T_Keys,
> = {
        [ K in T_Keys ]: T_Values | RecursiveRecord<T_SubKeys, T_Values>;
    };

// export function jsValueToSass( sassValue: null ): Promise<sass.Value>;
export function jsValueToSass( sassValue: boolean ): Promise<sass.SassBoolean>;
export function jsValueToSass( sassValue: Map<number | string, jsValueToSass.SimpleAcceptedValues> ): Promise<sass.SassMap>;
export function jsValueToSass<T_Obj extends RecursiveRecord<number | string, jsValueToSass.SimpleAcceptedValues>>( sassValue: T_Obj ): Promise<sass.SassMap>;
export function jsValueToSass( sassValue: number ): Promise<sass.SassNumber>;
export function jsValueToSass( sassValue: string ): Promise<sass.SassString>;
export function jsValueToSass( sassValue: jsValueToSass.AcceptedValues & any[] ): Promise<sass.SassList>;

export function jsValueToSass(
    sassValue: jsValueToSass.AcceptedValues,
): Promise<jsValueToSass.AcceptedReturns>;

/**
 * Translates sass values to JS values.
 * 
 * @category Utilities - Sass API
 * 
 * @since 0.1.0-alpha.31
 */
export async function jsValueToSass(
    value?: jsValueToSass.AcceptedValues,
): Promise<jsValueToSass.AcceptedReturns> {
    // returns
    if ( value === null || typeof value === 'undefined' ) {
        return sass.sassNull;
    }

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
            return new sass.SassString( value );

        case 'object':
            // returns
            if ( Array.isArray( value ) || value instanceof Set ) {

                return Promise.all( Array.from( value, jsValueToSass ) ).then(
                    ( arr ) => new sass.SassList( arr )
                );
            }

            const entries = typeof value.entries === 'function'
                ? Array.from( value.entries() )
                : Object.entries( value );

            const sassEntries = Promise.all(
                entries.map( ( [ key, value ] ) => Promise.all( [
                    jsValueToSass( key ),
                    jsValueToSass( value ),
                ] ) )
            );

            const immuMap = await sassEntries.then(
                ( _entries ) => OrderedMap( _entries )
            ) as OrderedMap<sass.SassString, sass.SassString>;

            // @ts-ignore
            const sassMap: sass.SassMap = new sass.SassMap( immuMap );

            // const sassMap = immuMap.then( ( _map ) => new sass.SassMap( _map ) )

            // return test.then(
            //     entries => new sass.SassMap( OrderedMap( entries ) ) as sass.SassMap
            // );
            return sassMap;
    }

    return new sass.SassString( String( value ) );
}

/**
 * Utilities for the {@link jsValueToSass} function.
 * 
 * @category Utilities - Sass API
 * 
 * @since 0.1.0-alpha.31
 */
export namespace jsValueToSass {

    export type SimpleAcceptedValues =
        | bigint
        | boolean
        | null
        | number
        | string
        | undefined
        | Map<number | string, SimpleAcceptedValues>
        | SimpleAcceptedValues[];

    export type AcceptedValues =
        | SimpleAcceptedValues
        | AcceptedValues[]
        | RecursiveRecord<number | string, SimpleAcceptedValues>;

    export type AcceptedReturns = sass.Value;
}
