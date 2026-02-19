/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.29
 * @license MIT
 */
import * as sass from "sass-embedded";
export declare function sassAssertValueType(type: "bool", value: sass.Value | undefined): Promise<boolean>;
export declare function sassAssertValueType(type: "map", value: sass.Value | undefined): Promise<undefined | Map<any, any>>;
export declare function sassAssertValueType(type: "number", value: sass.Value | undefined): Promise<undefined | number>;
export declare function sassAssertValueType(type: "string", value: sass.Value | undefined): Promise<undefined | string>;
export declare function sassAssertValueType(type: "list", value: sass.Value | undefined): Promise<undefined | unknown[]>;
//# sourceMappingURL=sassAssertValueType.d.ts.map