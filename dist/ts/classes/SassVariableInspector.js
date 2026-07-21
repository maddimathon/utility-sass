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
                    this.args.childArgs = Object.assign(Object.assign({}, this.args.childArgs), { includeType: false });
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
        return Object.assign(Object.assign({}, parent), { type: (type, skipFormatting) => parent.type(this._rawValue instanceof SassVariableInspector.SassWrapper
                ? (this._rawValue.isSassValue
                    ? 'Sass' + toTitleCase(this._rawValue.typeOf)
                    : this._rawValue.isImmutable
                        ? 'immutable.' + this._rawValue.typeOf
                        : this._rawValue.typeOf)
                : this._isSassValue
                    ? 'Sass' + toTitleCase(sassValueToJS.typeOf(this._rawValue))
                    : this._isImmutable
                        ? 'immutable.' + type
                        : type, skipFormatting) });
    }
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    _new(variable, args = {}) {
        var _a, _b, _c;
        const validVar = Object.values(this._validateInputVariable(variable))[0];
        // returns
        if (!validVar || (!isImmutable(validVar) && !sassValueToJS.isSassValue(validVar))) {
            return super._new(variable, args);
        }
        const fullArgs = Object.assign(Object.assign(Object.assign({}, this.args), this.args.childArgs), args);
        fullArgs.formatter = Object.assign(Object.assign(Object.assign({}, (_a = this.args.formatter) !== null && _a !== void 0 ? _a : {}), (_b = this.args.childArgs.formatter) !== null && _b !== void 0 ? _b : {}), (_c = args.formatter) !== null && _c !== void 0 ? _c : {});
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            // returns
            if (this.isImmutable) {
                return Object.fromEntries(Array.from((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.entries()) !== null && _b !== void 0 ? _b : [], ([key, value]) => {
                    var _a;
                    return [
                        (_a = makeNumber(key)) !== null && _a !== void 0 ? _a : key,
                        value,
                    ];
                }));
            }
            // returns on success
            if (this.isSassValue) {
                switch (this.typeOf) {
                    case 'args':
                        return Object.fromEntries(Array.from((_e = (_d = (_c = this.value) === null || _c === void 0 ? void 0 : _c.keywords) === null || _d === void 0 ? void 0 : _d.entries()) !== null && _e !== void 0 ? _e : [], ([key, value]) => {
                            var _a;
                            return [
                                (_a = makeNumber(key)) !== null && _a !== void 0 ? _a : '$' + key,
                                value,
                            ];
                        }));
                    case 'boolean':
                        return (_f = this.value) === null || _f === void 0 ? void 0 : _f.value;
                    case 'color':
                        const _colour = this.value;
                        return {
                            space: _colour.space,
                            channelsOrNull: _colour.channelsOrNull,
                            isLegacy: _colour.isLegacy,
                            'isInGamut()': _colour.isInGamut(),
                        };
                    case 'list':
                        return Object.fromEntries(Array.from((_j = (_h = (_g = this.value) === null || _g === void 0 ? void 0 : _g.asList) === null || _h === void 0 ? void 0 : _h.values()) !== null && _j !== void 0 ? _j : [], (value, index) => [
                            index,
                            value,
                        ]));
                    case 'map':
                        return Object.fromEntries(Array.from((_m = (_l = (_k = this.value) === null || _k === void 0 ? void 0 : _k.contents) === null || _l === void 0 ? void 0 : _l.entries()) !== null && _m !== void 0 ? _m : [], ([key, value]) => [
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
                        if ((_o = _number.numeratorUnits) === null || _o === void 0 ? void 0 : _o.size) {
                            const _val = Array.from(_number.numeratorUnits);
                            numeratorUnits = _val.length < 2 ? _val[0] : _val;
                        }
                        if ((_p = _number.denominatorUnits) === null || _p === void 0 ? void 0 : _p.size) {
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
