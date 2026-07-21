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
import { SassVariableInspector } from '../../classes/SassVariableInspector.js';
import { sassAssertValueType } from '../sassAssertValueType.js';
// import { sassValueToJS } from '../sassValueToJS.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a var dump to the console.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_jsVarDump({ console, params, try: tryFn }) {
    return {
        'mmutils-global-jsVarDump( $uniqueID, $value, $name, $level )': (args) => __awaiter(this, void 0, void 0, function* () {
            let [uniqueID, varName = 'var', level = 1,] = yield Promise.all([
                sassAssertValueType('uniqueID', 'string', args[0], true),
                sassAssertValueType('name', 'string', args[2], true),
                sassAssertValueType('level', 'number', args[3], true),
            ]);
            const value = args[1];
            if (params.verbose) {
                level = level + 2;
            }
            const inspection = tryFn(SassVariableInspector.stringify, level, [{ [varName]: value }], { exitProcess: false }, false);
            const returnString = `meta.js-var-dump()${uniqueID ? ` [id: ${uniqueID}]` : ''} - ${varName}`;
            // returns on error
            if (!inspection) {
                return new sass.SassString(`${returnString} [error]`, { quotes: false });
            }
            console.log([
                [
                    `[Sass: meta.js-var-dump()]${uniqueID ? ` [id: ${uniqueID}]` : ''}`,
                    { bold: true, clr: 'grey' },
                ],
                [inspection, { clr: 'black', maxWidth: null }],
            ], level, {
                bold: false,
                italic: false,
                joiner: '  ',
                linesIn: 0,
                linesOut: 0,
            });
            return new sass.SassString(returnString, { quotes: false });
        }),
    };
}
