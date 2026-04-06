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

import { sassValueToJS } from './sassValueToJS.js';

export async function sassAssertValueType( name: string, type: "bool", value: sass.Value | undefined, convertValue: true ): Promise<boolean | undefined>;
export async function sassAssertValueType( name: string, type: "map", value: sass.Value | undefined, convertValue: true ): Promise<Map<any, any> | undefined>;
export async function sassAssertValueType( name: string, type: "number", value: sass.Value | undefined, convertValue: true ): Promise<number | undefined>;
export async function sassAssertValueType( name: string, type: "string", value: sass.Value | undefined, convertValue: true ): Promise<string | undefined>;
export async function sassAssertValueType( name: string, type: "list", value: sass.Value | undefined, convertValue: true ): Promise<unknown[] | undefined>;

export async function sassAssertValueType( name: string, type: "bool", value: sass.Value | undefined, convertValue?: undefined | false ): Promise<sass.SassBoolean | undefined>;
export async function sassAssertValueType( name: string, type: "map", value: sass.Value | undefined, convertValue?: undefined | false ): Promise<sass.SassMap | undefined>;
export async function sassAssertValueType( name: string, type: "number", value: sass.Value | undefined, convertValue?: undefined | false ): Promise<sass.SassNumber | undefined>;
export async function sassAssertValueType( name: string, type: "string", value: sass.Value | undefined, convertValue?: undefined | false ): Promise<sass.SassString | undefined>;
export async function sassAssertValueType( name: string, type: "list", value: sass.Value | undefined, convertValue?: undefined | false ): Promise<sass.SassList | undefined>;

export async function sassAssertValueType( name: string, type: sassAssertValueType.AllowedTypes, value: undefined, convertValue?: undefined | boolean ): Promise<undefined>;

/**
 * Asserts a sass value type and converts it to a JS value.
 * 
 * @category Utilities – Sass API
 * 
 * @since 0.1.0-alpha.29
 * @since ___PKG_VERSION___ Added required `name` param and optional `convertValue` param (defaults to false).
 */
export async function sassAssertValueType(
    name: string,
    type: sassAssertValueType.AllowedTypes,
    value: sass.Value | undefined,
    convertValue: boolean = false,
): Promise<
    undefined | boolean | number | object | string | unknown[]
    | sass.SassBoolean
    | sass.SassMap
    | sass.SassNumber
    | sass.SassString
    | sass.SassList
> {
    // returns
    if ( value === null || value?.realNull === null ) {
        return undefined;
    }


    let asserted: sass.Value | undefined;

    switch ( type ) {

        case 'bool':
            // returns
            if ( convertValue ) {
                return !!value?.isTruthy;
            }

            return value?.isTruthy ? sass.sassTrue : sass.sassFalse;

        case 'list':
            asserted = value;
            break;

        case 'map':
            asserted = value?.assertMap( name );
            break;

        case 'number':
            asserted = value?.assertNumber( name );
            break;

        case 'string':
            asserted = value?.assertString( name );
            break;
    }

    // returns
    if ( typeof asserted === 'undefined' ) {
        return undefined;
    }

    // returns
    if ( !convertValue ) {
        return asserted;
    }

    return sassValueToJS( asserted );
}

/**
 * Utilities for the {@link sassAssertValueType} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace sassAssertValueType {

    /**
     * Strings to assert a type.
     * 
     * @since ___PKG_VERSION___
     */
    export type AllowedTypes = "bool" | "list" | "map" | "number" | "string";
}