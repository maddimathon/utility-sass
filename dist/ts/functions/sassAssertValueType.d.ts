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
export declare function sassAssertValueType(name: string, type: "bool", value: sass.Value | undefined, convertValue: true): Promise<boolean | undefined>;
export declare function sassAssertValueType(name: string, type: "map", value: sass.Value | undefined, convertValue: true): Promise<Map<any, any> | undefined>;
export declare function sassAssertValueType(name: string, type: "number", value: sass.Value | undefined, convertValue: true): Promise<number | undefined>;
export declare function sassAssertValueType(name: string, type: "string", value: sass.Value | undefined, convertValue: true): Promise<string | undefined>;
export declare function sassAssertValueType(name: string, type: "list", value: sass.Value | undefined, convertValue: true): Promise<unknown[] | undefined>;
export declare function sassAssertValueType(name: string, type: "bool", value: sass.Value | undefined, convertValue?: undefined | false): Promise<sass.SassBoolean | undefined>;
export declare function sassAssertValueType(name: string, type: "map", value: sass.Value | undefined, convertValue?: undefined | false): Promise<sass.SassMap | undefined>;
export declare function sassAssertValueType(name: string, type: "number", value: sass.Value | undefined, convertValue?: undefined | false): Promise<sass.SassNumber | undefined>;
export declare function sassAssertValueType(name: string, type: "string", value: sass.Value | undefined, convertValue?: undefined | false): Promise<sass.SassString | undefined>;
export declare function sassAssertValueType(name: string, type: "list", value: sass.Value | undefined, convertValue?: undefined | false): Promise<sass.SassList | undefined>;
export declare function sassAssertValueType(name: string, type: sassAssertValueType.AllowedTypes, value: undefined, convertValue?: undefined | boolean): Promise<undefined>;
/**
 * Utilities for the {@link sassAssertValueType} function.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-beta.0.draft
 */
export declare namespace sassAssertValueType {
    /**
     * Strings to assert a type.
     *
     * @since 0.1.0-beta.0.draft
     */
    type AllowedTypes = "bool" | "list" | "map" | "number" | "string";
}
