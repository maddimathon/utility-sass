/**
 * @since 0.1.0-alpha.31
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.39
 * @license MIT
 */
import * as sass from "sass-embedded";
/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since 0.1.0-alpha.31
 */
export type RecursiveRecord<T_Keys extends number | string | symbol = number | string | symbol, T_Values extends any = any, T_SubKeys extends number | string | symbol = T_Keys> = {
    [K in T_Keys]: T_Values | RecursiveRecord<T_SubKeys, T_Values>;
};
export declare function jsValueToSass(sassValue: boolean): Promise<sass.SassBoolean>;
export declare function jsValueToSass(sassValue: Map<number | string, jsValueToSass.SimpleAcceptedValues>): Promise<sass.SassMap>;
export declare function jsValueToSass<T_Obj extends RecursiveRecord<number | string, jsValueToSass.SimpleAcceptedValues>>(sassValue: T_Obj): Promise<sass.SassMap>;
export declare function jsValueToSass(sassValue: number): Promise<sass.SassNumber>;
export declare function jsValueToSass(sassValue: string): Promise<sass.SassString>;
export declare function jsValueToSass(sassValue: jsValueToSass.AcceptedValues & any[]): Promise<sass.SassList>;
export declare function jsValueToSass(sassValue: jsValueToSass.AcceptedValues): Promise<jsValueToSass.AcceptedReturns>;
/**
 * Utilities for the {@link jsValueToSass} function.
 *
 * @category Utilities - Sass API
 *
 * @since 0.1.0-alpha.31
 */
export declare namespace jsValueToSass {
    type SimpleAcceptedValues = bigint | boolean | null | number | string | undefined | Map<number | string, SimpleAcceptedValues> | SimpleAcceptedValues[];
    type AcceptedValues = SimpleAcceptedValues | AcceptedValues[] | RecursiveRecord<number | string, SimpleAcceptedValues>;
    type AcceptedReturns = sass.Value;
}
//# sourceMappingURL=jsValueToSass.d.ts.map