/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.34
 * @license MIT
 */
import * as sass from "sass-embedded";
import { sassValueToJS } from '../sassValueToJS.js';
import { sassAssertValueType } from '../sassAssertValueType.js';
import { VariableInspector } from '@maddimathon/utility-typescript/classes';
/**
 * A function to include in {@link sass.Options} that outputs a var dump to the console.
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_jsVarDump({ console }) {
    return [
        'mmutils-global-jsVarDump( $value, $name, $level )',
        async (args) => {
            const [level = 1, varName = 'var',] = await Promise.all([
                sassAssertValueType('number', args[2]),
                sassAssertValueType('string', args[1]),
            ]);
            // const level = args[2]?.assertNumber() ?? 1;
            // const varName = args[ 1 ]?.assertString() ? await sassValueToJS( args[ 1 ]?.assertString() ) :  'var';
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
    ];
}
//# sourceMappingURL=jsVarDump.js.map