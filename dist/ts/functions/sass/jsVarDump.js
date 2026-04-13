/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { VariableInspector } from '@maddimathon/utility-typescript';
import * as sass from "sass-embedded";
import { sassValueToJS } from '../sassValueToJS.js';
import { sassAssertValueType } from '../sassAssertValueType.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a var dump to the console.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_jsVarDump({ console }) {
    return {
        'mmutils-global-jsVarDump( $value, $name, $level )': async (args) => {
            const [varName = 'var', level = 1,] = await Promise.all([
                sassAssertValueType('name', 'string', args[1], true),
                sassAssertValueType('level', 'number', args[2], true),
            ]);
            const value = args[0];
            // returns
            if (typeof value === 'undefined') {
                return new sass.SassList(new sass.SassString('undefined'));
            }
            return sassValueToJS(value).then((jsValue) => {
                const inspection = VariableInspector.stringify({ [varName]: jsValue });
                console.log(inspection, level, { maxWidth: null });
                return new sass.SassList(inspection.split('\n').map(str => new sass.SassString(str)));
            });
        },
    };
}
