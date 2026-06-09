#!/usr/bin/env node
'use strict';
// @ts-check
/*
 * @package @maddimathon/utility-sass
 * @author Maddi Mathon (www.maddimathon.com/web)
 * 
 * @license MIT
 */

/**
 * @import { Stage } from "@maddimathon/build-utilities"
 */

import {
    TestStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Test extends TestStage {

    /**
     * @type {Stage.SubStage.Test[]}
     * 
     * @readonly
     * @override
     */
    subStages = [
        // // @ts-expect-error
        // 'playground',
        'js',
        'scss',
    ];

    /**
     * @param {number} level
     * 
     * @return {Promise<string[]>}
     * 
     * @override
     * @protected
     */
    async tsConfigTidyPaths( level ) {

        return super.tsConfigTidyPaths( level ).then(
            arr => arr.concat( [
                this.fs.pathResolve( 'dist/ts/**/*.test.values.d.ts' ),
                this.fs.pathResolve( 'dist/ts/**/*.test.values.d.ts.map' ),
                this.fs.pathResolve( 'dist/ts/**/*.test.values.js' ),
                this.fs.pathResolve( 'dist/ts/**/*.test.values.js.map' ),
            ] )
        );
    }

    /**
     * @override
     * @protected
     */
    async scss() {

        /** @type { undefined | typeof import( '../../src/ts/functions/sassCompilerOpts.ts' ) } */
        const sass_fn_import = await import( '../../dist/ts/functions/sassCompilerOpts.js' );

        if ( sass_fn_import?.sassCompilerOpts ) {

            this.compiler.args.sass = this.compiler.parseArgs(
                this.compiler.args,
                {
                    sass: sass_fn_import.sassCompilerOpts(
                        this,
                        this.compiler.args.sass,
                    ),
                },
            ).sass;
        }

        const compiled = await this.runCustomScssDirSubStage(
            'demos',
            'dist/css',
            {
                clearOutputDir: false,
                maxConcurrent: 20,
                postCSS: false,
                srcDir: 'src/scss',
            },
            1,
        );

        this.console.verbose( 'replacing in compiled file...', 3 );

        /** @type {( "current" | "package" )[]} */
        const replacementTypes = [ 'current', 'package' ];

        for ( const _key of replacementTypes ) {
            this.replaceInFiles(
                compiled,
                _key,
                this.params.verbose ? 3 : 2,
                [],
                true,
            );
        }

        this.console.verbose( 'prettifying compiled files...', 2 );
        const _prettified = await this.atry( this.fs.prettier, 3, [ compiled, 'css' ] );

        this.console.verbose(
            `prettified ${ _prettified.length } files`,
            3,
            { italic: true },
        );

        if ( this.params.packaging || this.params.releasing ) {
            this.console.verbose( 'tidying up compiled files...', 2 );
            this.try(
                this.fs.delete,
                ( this.params.verbose ? 3 : 2 ),
                [ [
                    'dist/scss/demos',
                ], ( this.params.verbose ? 3 : 2 ) ]
            );
        }
    }

    /**
     * @protected
     */
    async playground() {
        this.console.log( 'starting playground output...', 1 );

        const [
            { CssColours },
            { colourValueFunctions },
        ] = await Promise.all( [
            import( '../../dist/ts/classes/CssColours.js' ),
            import( '../../dist/ts/classes/CssColours.test.values.js' ),
        ] ).catch(
            err => {
                this.handleError( err, 2, { exitProcess: this.params.packaging || this.params.releasing } );
                return [];
            }
        );

        for ( const oklab of [
            'oklab(none none none/none)',
            ...colourValueFunctions.oklab,
            ...colourValueFunctions.oklaba,
        ] ) {

            const {
                groups: matchGroups,
                units: matchUnits,
            } = CssColours.Regex.Match.oklab( oklab ) ?? {};

            this.console.vi.log( {
                [ `[oklab] current: ${ oklab }` ]: {
                    // matches: CssColours.Regex.Match.oklab( oklab ),
                    parsed: CssColours.parseFunction.oklab( oklab ),
                    matchGroups,
                    matchUnits,
                }
            }, 2, { msg: { clr: 'turquoise' } } );
        }

        for ( const lab of [
            'lab(none none none/none)',
            ...colourValueFunctions.lab,
            ...colourValueFunctions.laba,
        ] ) {

            // const {
            //     matches,
            //     groups: matchGroups,
            //     units: matchUnits,
            // } = CssColours.Regex.Match.lab( lab ) ?? {};

            this.console.vi.log( {
                [ `[lab] current: ${ lab }` ]: {
                    // matches: CssColours.Regex.Match.lab( lab ),
                    // matchGroups,
                    // matchUnits,
                    parsed: CssColours.parseFunction( lab ),
                }
            }, 2, { msg: { clr: 'turquoise' } } );

            // const {
            //     matches: labMatches,
            //     groups: matchGroups,
            //     // units: matchUnits = {},
            // } = CssColours.Regex.Match.lab( lab ) ?? {};

            // if ( labMatches ) {
            //     if ( matchGroups ) {

            //         // const matchGroups = {
            //         //     l: labMatches[ 1 ],
            //         //     c: labMatches[ 3 ],
            //         //     h: labMatches[ 5 ],
            //         //     alpha: labMatches[ 7 ],

            //         //     units: deleteUndefinedProps( {
            //         //         l: labMatches[ 2 ],
            //         //         c: labMatches[ 4 ],
            //         //         h: labMatches[ 6 ],
            //         //         alpha: labMatches[ 8 ],
            //         //     } ),
            //         // };

            //         // const numbers = {
            //         //     l: Number( matchGroups.l ),
            //         //     c: Number( matchGroups.c ),
            //         //     h: Number( matchGroups.h ),
            //         //     alpha: typeof matchGroups.alpha === 'undefined' ? undefined : Number( matchGroups.alpha ),
            //         // };

            //         // const parsed = (
            //         //     Number.isNaN( numbers.l ) || Number.isNaN( numbers.c ) || Number.isNaN( numbers.h )
            //         // ) ? undefined : {
            //         //     l: numbers.l * ( matchUnits.l === 'turn' ? 360 : 1 ),
            //         //     c: numbers.c * ( matchUnits.c ? 1 : 100 ),
            //         //     h: numbers.h * ( matchUnits.h ? 1 : 100 ),
            //         //     alpha: numbers.alpha * ( matchUnits.alpha ? 1 : 100 ),
            //         // };

            //         this.console.vi.log( {
            //             [ `[lab] test: ${ lab }` ]: {
            //                 // sample: matchGroups && (
            //                 //     matchGroups.alpha
            //                 //         ? `lab( ${ matchGroups.l } ${ matchGroups.c } ${ matchGroups.h } / ${ matchGroups.alpha }% )`
            //                 //         : `lab( ${ matchGroups.l } ${ matchGroups.c } ${ matchGroups.h } )`
            //                 // ),
            //                 parsed: CssColours.parseFunction.lab( lab, null ),
            //                 // matches: labMatches,
            //                 // rawMatches: lab.match( CssColours.Regex.lab2 ),
            //                 matchGroups,
            //             }
            //         }, 2, { msg: { clr: 'purple' } } );

            //     } else {
            //         this.console.vi.log( { [ `[lab] test: ${ lab }` ]: lab.match( CssColours.Regex.lab ) }, 2 );
            //     }
            // } else {
            //     this.console.vi.log( { [ `[lab] test: ${ lab }` ]: lab.match( CssColours.Regex.lab ) }, 2 );
            // }
        }
    }
}