/**
 * @since 0.1.0-alpha.31
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { RecursiveRecord } from '@maddimathon/utility-typescript/types';
import * as sass from "sass-embedded";
export declare function jsValueToSass(sassValue: boolean, opts?: jsValueToSass.Opts): Promise<sass.SassBoolean>;
export declare function jsValueToSass(sassValue: Map<number | string, jsValueToSass.SimpleAcceptedValues>, opts?: jsValueToSass.Opts): Promise<sass.SassMap>;
export declare function jsValueToSass<T_Obj extends RecursiveRecord<number | string, jsValueToSass.SimpleAcceptedValues>>(sassValue: T_Obj, opts?: jsValueToSass.Opts): Promise<sass.SassMap>;
export declare function jsValueToSass(sassValue: number, opts?: jsValueToSass.Opts): Promise<sass.SassNumber>;
export declare function jsValueToSass(sassValue: string, opts?: jsValueToSass.Opts): Promise<sass.SassString>;
export declare function jsValueToSass(sassValue: jsValueToSass.AcceptedValues & any[], opts?: jsValueToSass.Opts): Promise<sass.SassList>;
export declare function jsValueToSass(sassValue: jsValueToSass.AcceptedValues, opts?: jsValueToSass.Opts): Promise<jsValueToSass.AcceptedReturns>;
/**
 * Utilities for the {@link jsValueToSass} function.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.31
 */
export declare namespace jsValueToSass {
    /**
     * @since 0.1.0-alpha.31
     */
    type AcceptedReturns = sass.Value;
    /**
     * @since 0.1.0-alpha.31
     */
    type AcceptedValues = SimpleAcceptedValues | AcceptedValues[] | RecursiveRecord<number | string, SimpleAcceptedValues>;
    /**
     * Options for the conversions.
     *
     * @since 0.1.0-beta.0.draft
     */
    interface Opts {
        /**
         * Whether colour functions should be output as quoted strings (instead
         * of sass colours).
         *
         * @default false
         */
        coloursAsStrings?: boolean;
        /**
         * Default is based on the result of requiredQuotesRegex.
         */
        quoteStrings?: undefined | boolean;
        /**
         * The regex used to check for characters in a string that require the
         * string to be quoted.
         *
         * @default /[^a-z|0-9|\-|_]/i
         */
        requiredQuotesRegex?: RegExp;
    }
    /**
     * @since 0.1.0-alpha.31
     */
    type SimpleAcceptedValues = bigint | boolean | null | number | string | undefined | Map<number | string, SimpleAcceptedValues> | SimpleAcceptedValues[];
}
