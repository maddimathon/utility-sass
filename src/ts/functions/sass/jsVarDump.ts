/**
 * @since 0.1.0-alpha.29
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

// import { VariableInspector } from '@maddimathon/utility-typescript';

import type {
    CLI,
    Config,
} from '@maddimathon/build-utilities';

import type {
    Logger,
} from '@maddimathon/build-utilities/internal';

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
export function sassFn_jsVarDump(
    { console, params }: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
): { 'mmutils-global-jsVarDump( $value, $name, $level )': sass.CustomFunction<'async'>; } {

    return {
        'mmutils-global-jsVarDump( $value, $name, $level )': async ( args: sass.Value[] ) => {

            let [
                varName = 'var',
                level = 1,
            ] = await Promise.all( [
                sassAssertValueType( 'name', 'string', args[ 1 ], true ),
                sassAssertValueType( 'level', 'number', args[ 2 ], true ),
            ] );

            const value = args[ 0 ];

            if ( params.verbose ) {
                level = level + 2;
            }

            const inspection = SassVariableInspector.stringify( { [ varName ]: value } );

            console.log(
                [
                    [ '[Sass: meta.js-var-dump()]', { bold: true, clr: 'grey' } ],
                    [ inspection, { clr: 'black', maxWidth: null } ],
                ],
                level,
                {
                    bold: false,
                    italic: false,
                    joiner: '  ',
                    linesIn: 0,
                    linesOut: 0,
                },
            );

            return new sass.SassString( `meta.js-var-dump() - ${ varName }`, { quotes: false } );

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