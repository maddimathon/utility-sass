/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.31
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
 * @category Utilities - Sass API
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
}
//# sourceMappingURL=sassValueToJS.d.ts.map