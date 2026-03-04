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
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.31
 */
export declare namespace jsValueToSass {
    type SimpleAcceptedValues = bigint | boolean | null | number | string | undefined | Map<number | string, SimpleAcceptedValues> | SimpleAcceptedValues[];
    type AcceptedValues = SimpleAcceptedValues | AcceptedValues[] | RecursiveRecord<number | string, SimpleAcceptedValues>;
    type AcceptedReturns = sass.Value;
}
//# sourceMappingURL=jsValueToSass.d.ts.map