/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { typeOf, VariableInspector } from '@maddimathon/utility-typescript';
import type { Collection } from 'immutable';
import * as sass from "sass-embedded";
import { sassValueToJS } from '../functions/sassValueToJS.js';
/**
 * To use with sass object instances for better output.
 *
 * @since 0.1.0-beta.0.draft
 */
export declare class SassVariableInspector<T_InspectionType extends VariableInspector.InspectionType = VariableInspector.InspectionType> extends VariableInspector<T_InspectionType> {
    /**
     * Alias for `new SassVariableInspector( ...).dump()`.
     *
     * @category Static
     *
     * @see {@link SassVariableInspector.dump}
     */
    static dump(...params: ConstructorParameters<typeof SassVariableInspector>): void;
    /**
     * Alias for `new SassVariableInspector( ...).toString()`.
     *
     * @category Static
     *
     * @see {@link SassVariableInspector.toString}
     */
    static stringify(...params: ConstructorParameters<typeof SassVariableInspector>): string;
    protected readonly _isImmutable: boolean;
    protected readonly _isSassValue: boolean;
    protected readonly _sassTypeOf: string;
    constructor(variable: SassVariableInspector.InputType<T_InspectionType> | {
        [key: string]: SassVariableInspector.InputType<T_InspectionType>;
    }, args?: Partial<VariableInspector.Args>);
    /**
     * @category Inputs
     *
     * @see {@link VariableInspector.constructor}
     *
     * @since 0.1.0-beta.0.draft
     */
    protected _parseInputParams(validVar: {
        [key: string]: SassVariableInspector.InputType<T_InspectionType>;
    }): {
        name: string;
        rawValue: VariableInspector.InputType<T_InspectionType> | undefined;
        inspectionValue: T_InspectionType | undefined;
        typeOf: typeOf.Return<Extract<T_InspectionType, typeOf.TestType> | undefined>;
    };
    protected get _filter(): VariableInspector['_filter'];
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    protected _new<T_InspectionType extends VariableInspector.InspectionType>(variable: ConstructorParameters<typeof SassVariableInspector<T_InspectionType>>[0], args?: Partial<VariableInspector.Args>): VariableInspector<T_InspectionType> | SassVariableInspector<T_InspectionType>;
}
/**
 * Utils for the {@link SassVariableInspector} class.
 *
 * @since 0.1.0-beta.0.draft
 */
export declare namespace SassVariableInspector {
    /**
     * @since 0.1.0-beta.0.draft
     */
    type SassInput<T_Type extends sass.Value> = (T_Type extends undefined ? undefined : never) | (T_Type extends null | typeof sass.sassNull ? null : never) | (T_Type extends SassInputObjects ? SassWrapper<T_Type> : never) | (T_Type extends sass.SassBoolean ? boolean : never);
    /**
     * @since 0.1.0-beta.0.draft
     */
    type SassInputObjects = sass.SassArgumentList | sass.SassBoolean | sass.SassColor | sass.SassList | sass.SassMap | sass.SassNumber | sass.SassString | Collection<number | string | symbol, unknown>;
    /**
     * @since 0.1.0-beta.0.draft
     */
    type InputType<T_InspectionType extends VariableInspector.InspectionType> = (T_InspectionType extends sass.Value ? SassInput<T_InspectionType> : any) & VariableInspector.InputType<NoInfer<T_InspectionType>>;
    /**
     * A wrapper class to create better variable inspections for sass.Value
     * objects.
     *
     * @since 0.1.0-beta.0.draft
     */
    class SassWrapper<T_Type extends SassInputObjects> {
        readonly value: T_Type;
        readonly isImmutable: boolean;
        readonly isSassValue: boolean;
        readonly typeOf: T_Type extends Collection<any, any> ? 'collection' : ReturnType<typeof sassValueToJS.typeOf<Extract<T_Type, sass.Value>>>;
        readonly testReturn: any;
        constructor(value: T_Type);
        toVariableInspection(): T_Type | {
            [key: number | string | symbol]: VariableInspector.InspectionType;
        };
    }
}
