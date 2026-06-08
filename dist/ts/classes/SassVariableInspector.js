/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { makeNumber, toTitleCase, typeOf, VariableInspector } from '@maddimathon/utility-typescript';
import { isImmutable } from 'immutable';
import * as sass from "sass-embedded";
import { sassValueToJS } from '../functions/sassValueToJS.js';
/**
 * To use with sass object instances for better output.
 *
 * @since 0.1.0-beta.0.draft
 */
export class SassVariableInspector extends VariableInspector {
    /**
     * Alias for `new SassVariableInspector( ...).dump()`.
     *
     * @category Static
     *
     * @see {@link SassVariableInspector.dump}
     */
    static dump(...params) {
        const vi = new SassVariableInspector(...params);
        return vi.dump();
    }
    /**
     * Alias for `new SassVariableInspector( ...).toString()`.
     *
     * @category Static
     *
     * @see {@link SassVariableInspector.toString}
     */
    static stringify(...params) {
        const vi = new SassVariableInspector(...params);
        return vi.toString();
    }
    _isImmutable;
    _isSassValue;
    _sassTypeOf;
    constructor(variable, args = {}) {
        super(variable, args);
        this._isImmutable = isImmutable(this._rawValue);
        this._isSassValue = sassValueToJS.isSassValue(this._rawValue);
        this._sassTypeOf = this._isSassValue ? sassValueToJS.typeOf(this._rawValue) : this._typeOf;
    }
    /**
     * @category Inputs
     *
     * @see {@link VariableInspector.constructor}
     *
     * @since 0.1.0-beta.0.draft
     */
    _parseInputParams(validVar) {
        let { name, rawValue, inspectionValue, } = super._parseInputParams(validVar);
        if (sassValueToJS.isSassValue(rawValue)) {
            const sassType = sassValueToJS.typeOf(rawValue);
            switch (sassType) {
                case 'args':
                case 'boolean':
                case 'color':
                case 'list':
                case 'map':
                case 'null':
                case 'number':
                case 'string':
                    const wrapper = new SassVariableInspector.SassWrapper(rawValue);
                    rawValue = wrapper;
                    inspectionValue = wrapper.toVariableInspection();
                    break;
            }
            switch (sassType) {
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
            typeOf: typeOf(inspectionValue),
        };
    }
    get _filter() {
        const parent = super._filter;
        return {
            ...parent,
            type: (type, skipFormatting) => parent.type(this._rawValue instanceof SassVariableInspector.SassWrapper
                ? (this._rawValue.isSassValue
                    ? 'Sass' + toTitleCase(this._rawValue.typeOf)
                    : this._rawValue.isImmutable
                        ? 'immutable.' + this._rawValue.typeOf
                        : this._rawValue.typeOf)
                : this._isSassValue
                    ? 'Sass' + toTitleCase(sassValueToJS.typeOf(this._rawValue))
                    : this._isImmutable
                        ? 'immutable.' + type
                        : type, skipFormatting),
        };
    }
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    _new(variable, args = {}) {
        const validVar = Object.values(this._validateInputVariable(variable))[0];
        // returns
        if (!validVar || (!isImmutable(validVar) && !sassValueToJS.isSassValue(validVar))) {
            return super._new(variable, args);
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
        return new SassVariableInspector(variable, fullArgs);
    }
}
/**
 * Utils for the {@link SassVariableInspector} class.
 *
 * @since 0.1.0-beta.0.draft
 */
(function (SassVariableInspector) {
    /**
     * A wrapper class to create better variable inspections for sass.Value
     * objects.
     *
     * @since 0.1.0-beta.0.draft
     */
    class SassWrapper {
        value;
        isImmutable;
        isSassValue;
        typeOf;
        testReturn;
        constructor(value) {
            this.value = value;
            this.isImmutable = isImmutable(value);
            this.isSassValue = sassValueToJS.isSassValue(value);
            this.typeOf = this.isImmutable
                ? 'collection'
                : sassValueToJS.typeOf(value);
            this.testReturn = this.toVariableInspection();
        }
        toVariableInspection() {
            // returns
            if (this.isImmutable) {
                return Object.fromEntries(Array.from(this.value?.entries() ?? [], ([key, value]) => [
                    makeNumber(key) ?? key,
                    value,
                ]));
            }
            // returns on success
            if (this.isSassValue) {
                switch (this.typeOf) {
                    case 'args':
                        return Object.fromEntries(Array.from(this.value?.keywords?.entries() ?? [], ([key, value]) => [
                            makeNumber(key) ?? '$' + key,
                            value,
                        ]));
                    case 'boolean':
                        return this.value?.value;
                    case 'color':
                        const _colour = this.value;
                        return {
                            space: _colour.space,
                            channelsOrNull: _colour.channelsOrNull,
                            isLegacy: _colour.isLegacy,
                            'isInGamut()': _colour.isInGamut(),
                        };
                    case 'list':
                        return Object.fromEntries(Array.from(this.value?.asList?.values() ?? [], (value, index) => [
                            index,
                            value,
                        ]));
                    case 'map':
                        return Object.fromEntries(Array.from(this.value?.contents?.entries() ?? [], ([key, value]) => [
                            sassValueToJS.sync(key),
                            value,
                        ]));
                    case 'null':
                        return null;
                    case 'number':
                        const _number = this.value;
                        const _ret = {
                            value: _number.value,
                            isInt: _number.isInt,
                        };
                        let numeratorUnits;
                        let unitDenominator;
                        if (_number.numeratorUnits?.size) {
                            const _val = Array.from(_number.numeratorUnits);
                            numeratorUnits = _val.length < 2 ? _val[0] : _val;
                        }
                        if (_number.denominatorUnits?.size) {
                            const _val = Array.from(_number.denominatorUnits);
                            unitDenominator = _val.length < 2 ? _val[0] : _val;
                        }
                        if (typeof numeratorUnits === 'string'
                            && typeof unitDenominator === 'string') {
                            _ret.unit = numeratorUnits + ' / ' + unitDenominator;
                        }
                        else {
                            if (numeratorUnits) {
                                _ret.unit = numeratorUnits;
                            }
                            if (unitDenominator) {
                                _ret.unitDenominator = unitDenominator;
                            }
                        }
                        return _ret;
                    case 'string':
                        const _string = this.value;
                        return {
                            text: _string.text,
                            hasQuotes: _string.hasQuotes,
                        };
                }
            }
            return this.value;
        }
    }
    SassVariableInspector.SassWrapper = SassWrapper;
})(SassVariableInspector || (SassVariableInspector = {}));
