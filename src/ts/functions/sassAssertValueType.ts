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

export async function sassAssertValueType( type: "bool", value: sass.Value | undefined ): Promise<boolean>;
export async function sassAssertValueType( type: "map", value: sass.Value | undefined ): Promise<undefined | Map<any, any>>;
export async function sassAssertValueType( type: "number", value: sass.Value | undefined ): Promise<undefined | number>;
export async function sassAssertValueType( type: "string", value: sass.Value | undefined ): Promise<undefined | string>;
export async function sassAssertValueType( type: "list", value: sass.Value | undefined ): Promise<undefined | unknown[]>;

/**
 * Asserts a sass value type and converts it to a JS value.
 * 
 * @since 0.1.0-alpha.29
 */
export async function sassAssertValueType( type: "bool" | "list" | "map" | "number" | "string", value: sass.Value | undefined ): Promise<undefined | boolean | number | object | string | unknown[]> {

    let asserted: sass.Value | undefined;

    switch ( type ) {

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
    if ( typeof asserted === 'undefined' ) {
        return undefined;
    }

    return sassValueToJS( asserted );
}