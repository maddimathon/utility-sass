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
export declare function sassValueToJS(sassValue: sass.SassArgumentList, _recursionCounter?: number): Promise<Map<unknown, unknown>>;
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
    interface SassNull extends Omit<sass.Value, 'realNull'> {
        realNull: null;
    }
    /**
     * @since 0.1.0-beta.0.draft
     */
    function isSassValue<T_Value>(value: T_Value): value is Extract<T_Value, sass.Value>;
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
        type Return = "args" | "boolean" | "color" | "list" | "map" | "null" | "number" | "string" | "undefined";
        /**
         * Possible return values for {@link typeOf}, generically.
         *
         * @since 0.1.0-beta.0.draft
         */
        type ReturnGeneric<T_Type extends TestType> = (T_Type extends undefined ? "undefined" : never) | (T_Type extends null | typeof sass.sassNull ? "null" : never) | (T_Type extends sass.SassArgumentList ? "args" : never) | (T_Type extends sass.SassColor ? "color" : never) | (T_Type extends sass.SassList ? "list" : never) | (T_Type extends sass.SassBoolean ? "boolean" : never) | (T_Type extends sass.SassNumber ? "number" : never) | (T_Type extends sass.SassMap ? "map" : never) | (T_Type extends sass.SassString ? "string" : never);
        /**
         * Input variable types for the {@link typeOf | typeOf()}.
         *
         * @since 0.1.0
         */
        type TestType = null | undefined | sass.SassArgumentList | sass.SassBoolean | sass.SassColor | sass.SassList | sass.SassMap | typeof sass.sassNull | sass.SassNumber | sass.SassString;
    }
    function sync(sassValue: null | SassNull, _recursionCounter?: number): null;
    function sync(sassValue: sass.SassArgumentList, _recursionCounter?: number): Map<unknown, unknown>;
    function sync(sassValue: sass.SassBoolean, _recursionCounter?: number): boolean;
    function sync(sassValue: sass.SassMap, _recursionCounter?: number): Map<unknown, unknown>;
    function sync(sassValue: sass.SassNumber, _recursionCounter?: number): number;
    function sync(sassValue: sass.SassColor, _recursionCounter?: number): string;
    function sync(sassValue: sass.SassString, _recursionCounter?: number): string;
    function sync(sassValue: sass.SassList, _recursionCounter?: number): unknown[];
    function sync(sassValue: AcceptedValues, _recursionCounter?: number): AcceptedReturns;
}
