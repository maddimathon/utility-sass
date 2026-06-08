/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type { } from '@maddimathon/utility-typescript';

import { makeNumber, toTitleCase, typeOf, VariableInspector } from '@maddimathon/utility-typescript';

import type { Collection } from 'immutable';
import { isImmutable } from 'immutable';
import * as sass from "sass-embedded";

import { sassValueToJS } from '../functions/sassValueToJS.js';

/**
 * To use with sass object instances for better output.
 * 
 * @since ___PKG_VERSION___
 */
export class SassVariableInspector<
    T_InspectionType extends VariableInspector.InspectionType = VariableInspector.InspectionType,
> extends VariableInspector<T_InspectionType> {

    /**
     * Alias for `new SassVariableInspector( ...).dump()`.
     *
     * @category Static
     * 
     * @see {@link SassVariableInspector.dump}
     */
    public static override dump(
        ...params: ConstructorParameters<typeof SassVariableInspector>
    ): void {
        const vi = new SassVariableInspector( ...params );
        return vi.dump();
    }

    /**
     * Alias for `new SassVariableInspector( ...).toString()`.
     *
     * @category Static
     * 
     * @see {@link SassVariableInspector.toString}
     */
    public static override stringify(
        ...params: ConstructorParameters<typeof SassVariableInspector>
    ): string {
        const vi = new SassVariableInspector( ...params );
        return vi.toString();
    }

    protected readonly _isImmutable: boolean;
    protected readonly _isSassValue: boolean;
    protected readonly _sassTypeOf: string;

    public constructor (
        variable: SassVariableInspector.InputType<T_InspectionType> | { [ key: string ]: SassVariableInspector.InputType<T_InspectionType>; },
        args: Partial<VariableInspector.Args> = {},
    ) {
        super( variable, args );

        this._isImmutable = isImmutable( this._rawValue );

        this._isSassValue = sassValueToJS.isSassValue( this._rawValue );

        this._sassTypeOf = this._isSassValue ? sassValueToJS.typeOf( this._rawValue as sass.Value ) : this._typeOf;
    }

    /**
     * @category Inputs
     * 
     * @see {@link VariableInspector.constructor}
     * 
     * @since ___PKG_VERSION___
     */
    protected override _parseInputParams(
        validVar: { [ key: string ]: SassVariableInspector.InputType<T_InspectionType>; },
    ): {
        name: string;
        rawValue: VariableInspector.InputType<T_InspectionType> | undefined;
        inspectionValue: T_InspectionType | undefined;
        typeOf: typeOf.Return<Extract<T_InspectionType, typeOf.TestType> | undefined>;
    } {
        let {
            name,
            rawValue,
            inspectionValue,
        } = super._parseInputParams( validVar );

        if ( sassValueToJS.isSassValue( rawValue ) ) {

            const sassType = sassValueToJS.typeOf(
                rawValue as Extract<typeof rawValue, sassValueToJS.typeOf.TestType>
            );

            switch ( sassType ) {

                case 'args':
                case 'boolean':
                case 'color':
                case 'list':
                case 'map':
                case 'null':
                case 'number':
                case 'string':
                    const wrapper = new SassVariableInspector.SassWrapper( rawValue );

                    rawValue = wrapper as VariableInspector.InputType<T_InspectionType>;

                    inspectionValue = wrapper.toVariableInspection() as T_InspectionType;
                    break;
            }

            switch ( sassType ) {

                case 'color':
                case 'number':
                case 'string':
                    this.args.formatKeys = false;

                    this.args.childArgs = {
                        ...this.args.childArgs,
                        includeType: false,
                    };
                    break;
            }
        }

        return {
            name,
            rawValue,
            inspectionValue,
            typeOf: typeOf( inspectionValue as Extract<T_InspectionType, typeOf.TestType> ),
        };
    }

    protected override get _filter(): VariableInspector[ '_filter' ] {

        const parent = super._filter;

        return {
            ...parent,

            type: (
                type: string,
                skipFormatting: boolean,
            ): string => parent.type(
                this._rawValue instanceof SassVariableInspector.SassWrapper
                    ? (
                        this._rawValue.isSassValue
                            ? 'Sass' + toTitleCase( this._rawValue.typeOf )
                            : this._rawValue.isImmutable
                                ? 'immutable.' + this._rawValue.typeOf
                                : this._rawValue.typeOf
                    )
                    : this._isSassValue
                        ? 'Sass' + toTitleCase( sassValueToJS.typeOf( this._rawValue as sass.Value ) )
                        : this._isImmutable
                            ? 'immutable.' + type
                            : type,

                skipFormatting,
            ),
        } as const;
    }

    /**
     * Returns an instance of this class that inherits this instances’s args.
     * 
     * Meant for children/recursion of this inspection.
     * 
     * @category Recursion
     */
    protected override _new<
        T_InspectionType extends VariableInspector.InspectionType
    >(
        variable: ConstructorParameters<typeof SassVariableInspector<T_InspectionType>>[ 0 ],
        args: Partial<VariableInspector.Args> = {},
    ): VariableInspector<T_InspectionType> | SassVariableInspector<T_InspectionType> {

        const validVar = Object.values( this._validateInputVariable( variable ) )[ 0 ];

        // returns
        if ( !validVar || ( !isImmutable( validVar ) && !sassValueToJS.isSassValue( validVar ) ) ) {
            return super._new( variable, args );
        }

        const fullArgs = {
            ...this.args,
            ...this.args.childArgs,
            ...args,
        };

        fullArgs.formatter = {
            ...this.args.formatter ?? {},
            ...this.args.childArgs.formatter ?? {},
            ...args.formatter ?? {},
        };

        return new SassVariableInspector( variable, fullArgs );
    }
}

/**
 * Utils for the {@link SassVariableInspector} class.
 * 
 * @since ___PKG_VERSION___
 */
export namespace SassVariableInspector {

    /**
     * @since ___PKG_VERSION___
     */
    export type SassInput<T_Type extends sass.Value> =
        | ( T_Type extends undefined ? undefined : never )
        | ( T_Type extends null | typeof sass.sassNull ? null : never )
        | ( T_Type extends SassInputObjects ? SassWrapper<T_Type> : never )
        | ( T_Type extends sass.SassBoolean ? boolean : never );

    /**
     * @since ___PKG_VERSION___
     */
    export type SassInputObjects =
        | sass.SassArgumentList
        | sass.SassBoolean
        | sass.SassColor
        | sass.SassList
        | sass.SassMap
        | sass.SassNumber
        | sass.SassString
        | null
        | Collection<number | string | symbol, unknown>;

    /**
     * @since ___PKG_VERSION___
     */
    export type InputType<T_InspectionType extends VariableInspector.InspectionType> = (
        T_InspectionType extends sass.Value ? SassInput<T_InspectionType> : any
    ) & VariableInspector.InputType<NoInfer<T_InspectionType>>;

    /**
     * A wrapper class to create better variable inspections for sass.Value
     * objects.
     * 
     * @since ___PKG_VERSION___
     */
    export class SassWrapper<T_Type extends SassInputObjects> {

        public readonly isImmutable: boolean;
        public readonly isSassValue: boolean;

        public readonly typeOf: T_Type extends Collection<any, any> ? 'collection' : ReturnType<typeof sassValueToJS.typeOf<Extract<T_Type, sass.Value>>>;

        public readonly testReturn: any;

        public constructor (
            public readonly value: T_Type,
        ) {
            this.isImmutable = isImmutable( value );

            this.isSassValue = sassValueToJS.isSassValue( value );

            this.typeOf = this.isImmutable
                ? 'collection' as typeof this.typeOf
                : sassValueToJS.typeOf( value as sass.Value ) as typeof this.typeOf;

            this.testReturn = this.toVariableInspection();
        }

        public toVariableInspection(): T_Type | { [ key: number | string | symbol ]: VariableInspector.InspectionType; } {

            // returns
            if ( this.isImmutable ) {
                return Object.fromEntries(
                    Array.from(
                        ( this.value as Collection<unknown, unknown> )?.entries() ?? [],
                        ( [ key, value ] ) => [
                            makeNumber( key ) ?? key,
                            value,
                        ] as const
                    )
                );
            }

            // returns on success
            if ( this.isSassValue ) {
                switch ( this.typeOf ) {

                    case 'args':
                        return Object.fromEntries(
                            Array.from(
                                ( this.value as sass.SassArgumentList )?.keywords?.entries() ?? [],
                                ( [ key, value ] ) => [
                                    makeNumber( key ) ?? '$' + key,
                                    value,
                                ] as const
                            )
                        );

                    case 'boolean':
                        return ( this.value as sass.SassBoolean )?.value as unknown as T_Type;

                    case 'color':
                        const _colour = this.value as sass.SassColor;

                        return {
                            space: _colour.space,
                            channelsOrNull: _colour.channelsOrNull,
                            isLegacy: _colour.isLegacy,
                            'isInGamut()': _colour.isInGamut(),
                        };

                    case 'list':
                        return Object.fromEntries(
                            Array.from(
                                ( this.value as sass.SassList )?.asList?.values() ?? [],
                                ( value, index ) => [
                                    index,
                                    value,
                                ] as const
                            )
                        );

                    case 'map':
                        return Object.fromEntries(
                            Array.from(
                                ( this.value as sass.SassMap )?.contents?.entries() ?? [],
                                ( [ key, value ] ) => [
                                    sassValueToJS.sync( key as sass.SassString ),
                                    value,
                                ] as const
                            )
                        );

                    case 'null':
                        return null as T_Type;

                    case 'number':
                        const _number = this.value as sass.SassNumber;

                        const _ret: {
                            value: number;
                            isInt: boolean;
                            unit?: string | string[];
                            unitDenominator?: string | string[];
                        } = {
                            value: _number.value,
                            isInt: _number.isInt,
                        };

                        let numeratorUnits: undefined | string | string[];
                        let unitDenominator: undefined | string | string[];

                        if ( _number.numeratorUnits?.size ) {
                            const _val = Array.from( _number.numeratorUnits );

                            numeratorUnits = _val.length < 2 ? _val[ 0 ] : _val;
                        }

                        if ( _number.denominatorUnits?.size ) {
                            const _val = Array.from( _number.denominatorUnits );

                            unitDenominator = _val.length < 2 ? _val[ 0 ] : _val;
                        }

                        if (
                            typeof numeratorUnits === 'string'
                            && typeof unitDenominator === 'string'
                        ) {
                            _ret.unit = numeratorUnits + ' / ' + unitDenominator;
                        } else {
                            if ( numeratorUnits ) {
                                _ret.unit = numeratorUnits;
                            }

                            if ( unitDenominator ) {
                                _ret.unitDenominator = unitDenominator;
                            }
                        }

                        return _ret;

                    case 'string':
                        const _string = this.value as sass.SassString;

                        return {
                            text: _string.text,
                            hasQuotes: _string.hasQuotes,
                        };
                }
            }

            return this.value;
        }
    }
}