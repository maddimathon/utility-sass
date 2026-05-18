/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
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
export function sassFn_jsVarDump({ console, params }) {
    return {
        'mmutils-global-jsVarDump( $value, $name, $level )': async (args) => {
            let [varName = 'var', level = 1,] = await Promise.all([
                sassAssertValueType('name', 'string', args[1], true),
                sassAssertValueType('level', 'number', args[2], true),
            ]);
            const value = args[0];
            if (params.verbose) {
                level = level + 2;
            }
            const inspection = SassVariableInspector.stringify({ [varName]: value });
            console.log([
                ['[Sass: meta.js-var-dump()]', { bold: true, clr: 'grey' }],
                [inspection, { clr: 'black', maxWidth: null }],
            ], level, {
                bold: false,
                italic: false,
                joiner: '  ',
                linesIn: 0,
                linesOut: 0,
            });
            return new sass.SassString(`meta.js-var-dump() - ${varName}`, { quotes: false });
            // return sassValueToJS( value ).then(
            //     ( jsValue ) => {
            //         if ( params.verbose ) {
            //             level = level + 2;
            //         }
            //         const inspection = VariableInspector.stringify( { [ varName ]: jsValue } );
            //         console.log(
            //             [
            //                 [ '[Sass: meta.js-var-dump()]', { bold: true, clr: 'grey' } ],
            //                 [ inspection, { clr: 'black', maxWidth: null } ],
            //             ],
            //             level,
            //             {
            //                 bold: false,
            //                 italic: false,
            //                 joiner: '  ',
            //                 linesIn: 0,
            //                 linesOut: 0,
            //             },
            //         );
            //         return new sass.SassString( `meta.js-var-dump() - ${ varName }`, { quotes: false } );
            //     }
            // );
        },
    };
}
