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
export function sassValueToJS( sassValue: sass.SassArgumentList, _recursionCounter?: number ): Promise<Map<unknown, unknown>>;
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
 * @category Utilities – Sass API
 * 
 * @since 0.1.0-alpha.29
 */
export async function sassValueToJS(
    sassValue: sassValueToJS.AcceptedValues,
    _recursionCounter: number = 0,
): Promise<sassValueToJS.AcceptedReturns> {

    // returns
    if ( sassValue === null ) {
        return null;
    }

    // returns
    if ( _recursionCounter >= 1000 ) {
        throw `Recursion limit reached - recursed ${ _recursionCounter } times (likely be a result of unsupported Sass values being parsed)`;
    }

    // returns
    switch ( sassValueToJS.typeOf( sassValue ) ) {

        case 'args':
            const keywords = ( sassValue as sass.SassArgumentList ).keywords;

            // returns
            if ( !keywords?.size ) {
                return new Map();
            }

            return Promise.all(
                Array.from( keywords.entries() ).map(
                    ( [ key, value ] ) => Promise.all( [
                        key,
                        sassValueToJS( value, _recursionCounter + 1 ),
                    ] )
                )
            ).then( ( entries ) => new Map( entries ) );

        case 'boolean':
        case 'number':
        case 'undefined':
            return ( sassValue as null | undefined | sass.SassBoolean | sass.SassNumber )?.value ?? null;

        case 'color':
            return String( sassValue );

        case 'map':
            const asMap = sassValue.tryMap() as sass.SassMap;

            // returns
            if ( !asMap?.contents.size ) {
                return new Map();
            }

            return Promise.all(
                Array.from( ( sassValue.tryMap() as sass.SassMap ).contents?.entries() ?? [] ).map(
                    ( [ key, value ] ) => Promise.all( [
                        sassValueToJS( key, _recursionCounter + 1 ),
                        sassValueToJS( value, _recursionCounter + 1 ),
                    ] )
                )
            ).then( ( entries ) => new Map( entries ) );

        case 'null':
            return null;

        case 'string':
            const sassStr = sassValue as sass.SassString;
            return sassStr.hasQuotes ? sassStr.text.replace( /^['"](.*)['"]$/g, '$1' ) : sassStr.text;

        case 'undefined':
            return undefined;

        case 'list':
        default:
            const asList = sassValue.asList;

            // returns
            if ( !asList.size ) {
                return [];
            }

            return Promise.all( sassValue.asList.map( _val => sassValueToJS( _val, _recursionCounter + 1 ) ) );
    }
}

/**
 * Utilities for the {@link sassValueToJS} function.
 * 
 * @category Utilities – Sass API
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
    export interface SassNull extends Omit<sass.Value, 'realNull'> {
        realNull: null;
    }

    /**
     * @since ___PKG_VERSION___
     */
    export function isSassValue<T_Value>( value: T_Value ): value is Extract<T_Value, sass.Value> {
        return (
            value && typeof value === 'object' && value instanceof sass.Value
        ) ?? false;
    }

    /**
     * Gets the type of a sass value.
     * 
     * @since ___PKG_VERSION___
     */
    export function typeOf<T_Type extends typeOf.TestType | sass.Value>( value: T_Type ): typeOf.Return {

        // returns
        if ( typeof value === 'undefined' ) {
            return 'undefined' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
        }

        // returns
        if ( value === null || value.realNull === null ) {
            return 'null' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
        }

        // returns
        if ( 'text' in value && typeof value.text === 'string' ) {
            return 'string' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
        }

        // returns on value type match
        if ( 'value' in value ) {

            switch ( typeof value.value ) {

                case 'boolean':
                    return 'boolean' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;

                case 'bigint':
                case 'number':
                    return 'number' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;

                case 'undefined':
                    return 'undefined' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
            }
        }

        // returns - is colour
        if ( 'lightness' in value ) {
            return 'color' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
        }

        // returns - is args list
        if ( 'keywords' in value && typeof value.keywords === 'function' ) {
            return 'args' satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
        }

        return ( !value.tryMap() ? 'list' : 'map' ) satisfies typeOf.Return as typeOf.ReturnGeneric<T_Type>;
    }

    export namespace typeOf {

        /**
         * Possible return values for {@link typeOf}. 
         * 
         * @since ___PKG_VERSION___
         */
        export type Return = "args" | "boolean" | "color" | "list" | "map" | "null" | "number" | "string" | "undefined";

        /**
         * Possible return values for {@link typeOf}, generically. 
         * 
         * @since ___PKG_VERSION___
         */
        export type ReturnGeneric<T_Type extends TestType> =
            | ( T_Type extends undefined ? "undefined" : never )
            | ( T_Type extends null | typeof sass.sassNull ? "null" : never )
            | ( T_Type extends sass.SassArgumentList ? "args" : never )
            | ( T_Type extends sass.SassColor ? "color" : never )
            | ( T_Type extends sass.SassList ? "list" : never )
            | ( T_Type extends sass.SassBoolean ? "boolean" : never )
            | ( T_Type extends sass.SassNumber ? "number" : never )
            | ( T_Type extends sass.SassMap ? "map" : never )
            | ( T_Type extends sass.SassString ? "string" : never );

        /**
         * Input variable types for the {@link typeOf | typeOf()}.
         * 
         * @since 0.1.0
         */
        export type TestType =
            | null
            | undefined
            | sass.SassArgumentList
            | sass.SassBoolean
            | sass.SassColor
            | sass.SassList
            | sass.SassMap
            // | SassNull
            | typeof sass.sassNull
            | sass.SassNumber
            | sass.SassString;
    }

    export function sync( sassValue: null | SassNull, _recursionCounter?: number ): null;
    export function sync( sassValue: sass.SassArgumentList, _recursionCounter?: number ): Map<unknown, unknown>;
    export function sync( sassValue: sass.SassBoolean, _recursionCounter?: number ): boolean;
    export function sync( sassValue: sass.SassMap, _recursionCounter?: number ): Map<unknown, unknown>;
    export function sync( sassValue: sass.SassNumber, _recursionCounter?: number ): number;
    export function sync( sassValue: sass.SassColor, _recursionCounter?: number ): string;
    export function sync( sassValue: sass.SassString, _recursionCounter?: number ): string;

    // last override on purpose since other Value classes are also SassList
    export function sync( sassValue: sass.SassList, _recursionCounter?: number ): unknown[];

    export function sync(
        sassValue: AcceptedValues,
        _recursionCounter?: number,
    ): AcceptedReturns;

    /**
     * @since ___PKG_VERSION___
     */
    export function sync(
        sassValue: AcceptedValues,
        _recursionCounter: number = 0,
    ): AcceptedReturns {

        // returns
        if ( sassValue === null ) {
            return null;
        }

        // returns
        if ( _recursionCounter >= 1000 ) {
            throw `Recursion limit reached - recursed ${ _recursionCounter } times (likely be a result of unsupported Sass values being parsed)`;
        }

        // returns
        switch ( typeOf( sassValue ) ) {

            case 'args':
                const keywords = ( sassValue as sass.SassArgumentList ).keywords;

                // returns
                if ( !keywords?.size ) {
                    return new Map();
                }

                return new Map(
                    Array.from( keywords.entries() ).map(
                        ( [ key, value ] ) => [
                            key,
                            sync( value, _recursionCounter + 1 ),
                        ]
                    )
                );

            case 'boolean':
            case 'number':
            case 'undefined':
                return ( sassValue as null | undefined | sass.SassBoolean | sass.SassNumber )?.value ?? null;

            case 'color':
                return String( sassValue );

            case 'map':
                const asMap = sassValue.tryMap() as sass.SassMap;

                // returns
                if ( !asMap?.contents.size ) {
                    return new Map();
                }

                return new Map(
                    Array.from( ( sassValue.tryMap() as sass.SassMap ).contents?.entries() ?? [] ).map(
                        ( [ key, value ] ) => [
                            sync( key, _recursionCounter + 1 ),
                            sync( value, _recursionCounter + 1 ),
                        ]
                    )
                );

            case 'null':
                return null;

            case 'string':
                const sassStr = sassValue as sass.SassString;
                return sassStr.hasQuotes ? sassStr.text.replace( /^['"](.*)['"]$/g, '$1' ) : sassStr.text;

            case 'undefined':
                return undefined;

            case 'list':
            default:
                const asList = sassValue.asList;

                // returns
                if ( !asList.size ) {
                    return [];
                }

                return Array.from(
                    sassValue.asList,
                    _val => sync( _val, _recursionCounter + 1 ),
                );
        }
    }
}