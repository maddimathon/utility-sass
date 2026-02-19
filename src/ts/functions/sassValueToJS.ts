/**
 * @since 0.1.0-alpha.29
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import * as sass from "sass-embedded";

export function sassValueToJS( sassValue: null | sassValueToJS.SassNull, _recursionCounter?: number ): Promise<null>;
export function sassValueToJS( sassValue: sass.SassBoolean, _recursionCounter?: number ): Promise<boolean>;
export function sassValueToJS( sassValue: sass.SassMap, _recursionCounter?: number ): Promise<Map<unknown, unknown>>;
export function sassValueToJS( sassValue: sass.SassNumber, _recursionCounter?: number ): Promise<number>;
export function sassValueToJS( sassValue: sass.SassColor, _recursionCounter?: number ): Promise<string>;
export function sassValueToJS( sassValue: sass.SassString, _recursionCounter?: number ): Promise<string>;

// last override on purpose since other Value classes are also SassList
export function sassValueToJS( sassValue: sass.SassList, _recursionCounter?: number ): Promise<unknown[]>;

export function sassValueToJS(
    sassValue: sassValueToJS.AcceptedValues,
    _recursionCounter?: number,
): Promise<sassValueToJS.AcceptedReturns>;

/**
 * Translates sass values to JS values.
 * 
 * @category Utilities - Sass API
 * 
 * @since 0.1.0-alpha.29
 */
export async function sassValueToJS(
    sassValue: sassValueToJS.AcceptedValues,
    _recursionCounter: number = 0,
): Promise<sassValueToJS.AcceptedReturns> {
    // returns
    if ( sassValue === null || sassValue.realNull === null ) {
        return null;
    }

    if ( typeof sassValue === 'undefined' ) {
        return undefined;
    }

    // returns
    if ( 'text' in sassValue && typeof sassValue.text === 'string' ) {
        return sassValue.text;
    }

    // returns on value type match
    if ( 'value' in sassValue ) {

        switch ( typeof sassValue.value ) {

            case 'bigint':
            case 'boolean':
            case 'number':
            case 'undefined':
                return sassValue.value ?? null;
        }
    }

    // returns - is colour
    if ( 'lightness' in sassValue ) {
        return String( sassValue );
    }

    const asMap = sassValue.tryMap();

    // returns
    if ( _recursionCounter >= 1000 ) {
        throw `Recursion limit reached - recursed ${ _recursionCounter } times (likely be a result of unsupported Sass values being parsed)`;
    }

    // returns
    if ( !asMap ) {
        return Promise.all( sassValue.asList.map( _val => sassValueToJS( _val, _recursionCounter + 1 ) ) );
    }

    return Promise.all(
        Array.from( asMap.contents.entries() ).map(
            ( [ key, value ] ) => Promise.all( [
                sassValueToJS( key, _recursionCounter + 1 ),
                sassValueToJS( value, _recursionCounter + 1 ),
            ] )
        )
    ).then( ( map ) => new Map( map ) );
}

/**
 * Utilities for the {@link sassValueToJS} function.
 * 
 * @category Utilities - Sass API
 * 
 * @since 0.1.0-alpha.29
 */
export namespace sassValueToJS {

    /**
     * @since 0.1.0-alpha.29
     */
    export type AcceptedValues = null | SassNull | sass.Value;

    /**
     * @since 0.1.0-alpha.29
     */
    export type AcceptedReturns = null | undefined | bigint | Map<any, any> | boolean | number | string | unknown[];

    /**
     * @since 0.1.0-alpha.29
     */
    export interface SassNull extends sass.Value {
        realNull: null;
    }
}