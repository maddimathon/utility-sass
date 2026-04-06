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
export declare function sassValueToJS(sassValue: null | sassValueToJS.SassNull, _recursionCounter?: number): Promise<null>;
export declare function sassValueToJS(sassValue: sass.SassBoolean, _recursionCounter?: number): Promise<boolean>;
export declare function sassValueToJS(sassValue: sass.SassMap, _recursionCounter?: number): Promise<Map<unknown, unknown>>;
export declare function sassValueToJS(sassValue: sass.SassNumber, _recursionCounter?: number): Promise<number>;
export declare function sassValueToJS(sassValue: sass.SassColor, _recursionCounter?: number): Promise<string>;
export declare function sassValueToJS(sassValue: sass.SassString, _recursionCounter?: number): Promise<string>;
export declare function sassValueToJS(sassValue: sass.SassList, _recursionCounter?: number): Promise<unknown[]>;
export declare function sassValueToJS(sassValue: sassValueToJS.AcceptedValues, _recursionCounter?: number): Promise<sassValueToJS.AcceptedReturns>;
/**
 * Utilities for the {@link sassValueToJS} function.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.29
 */
export declare namespace sassValueToJS {
    /**
     * @since 0.1.0-alpha.29
     */
    type AcceptedValues = null | SassNull | sass.Value;
    /**
     * @since 0.1.0-alpha.29
     */
    type AcceptedReturns = null | undefined | bigint | Map<any, any> | boolean | number | string | unknown[];
    /**
     * @since 0.1.0-alpha.29
     */
    interface SassNull extends sass.Value {
        realNull: null;
    }
    /**
     * Gets the type of a sass value.
     *
     * @since 0.1.0-beta.0.draft
     */
    function typeOf<T_Type extends typeOf.TestType | sass.Value>(value: T_Type): typeOf.Return;
    namespace typeOf {
        /**
         * Possible return values for {@link typeOf}.
         *
         * @since 0.1.0-beta.0.draft
         */
        type Return = "boolean" | "color" | "list" | "map" | "null" | "number" | "string" | "undefined";
        /**
         * Possible return values for {@link typeOf}, generically.
         *
         * @since 0.1.0-beta.0.draft
         */
        type ReturnGeneric<T_Type extends TestType> = (T_Type extends undefined ? "undefined" : never) | (T_Type extends null | typeof sass.sassNull ? "null" : never) | (T_Type extends sass.SassColor ? "color" : never) | (T_Type extends sass.SassList ? "list" : never) | (T_Type extends sass.SassBoolean ? "boolean" : never) | (T_Type extends sass.SassNumber ? "number" : never) | (T_Type extends sass.SassMap ? "map" : never) | (T_Type extends sass.SassString ? "string" : never);
        /**
         * Input variable types for the {@link typeOf | typeOf()}.
         *
         * @since 0.1.0
         */
        type TestType = null | undefined | sass.SassBoolean | sass.SassColor | sass.SassList | sass.SassMap | sass.SassNumber | sass.SassString;
    }
}
//# sourceMappingURL=sassValueToJS.d.ts.map