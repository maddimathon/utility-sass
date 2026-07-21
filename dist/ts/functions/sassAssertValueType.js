/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as sass from "sass-embedded";
import { sassValueToJS } from './sassValueToJS.js';
/**
 * Asserts a sass value type and converts it to a JS value.
 *
 * @category Utilities – Sass API
 *
 * @since 0.1.0-alpha.29
 * @since 0.1.0-beta.0.draft Added required `name` param and optional `convertValue` param (defaults to false).
 */
export function sassAssertValueType(name_1, type_1, value_1) {
    return __awaiter(this, arguments, void 0, function* (name, type, value, convertValue = false) {
        // returns
        if (value === null || (value === null || value === void 0 ? void 0 : value.realNull) === null) {
            return undefined;
        }
        let asserted;
        switch (type) {
            case 'bool':
                // returns
                if (convertValue) {
                    return !!(value === null || value === void 0 ? void 0 : value.isTruthy);
                }
                return (value === null || value === void 0 ? void 0 : value.isTruthy) ? sass.sassTrue : sass.sassFalse;
            case 'list':
                asserted = value;
                break;
            case 'map':
                asserted = value === null || value === void 0 ? void 0 : value.assertMap(name);
                break;
            case 'number':
                asserted = value === null || value === void 0 ? void 0 : value.assertNumber(name);
                break;
            case 'string':
                asserted = value === null || value === void 0 ? void 0 : value.assertString(name);
                break;
        }
        // returns
        if (typeof asserted === 'undefined') {
            return undefined;
        }
        // returns
        if (!convertValue) {
            return asserted;
        }
        return sassValueToJS(asserted);
    });
}
