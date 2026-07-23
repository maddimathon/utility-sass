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
    CompileStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Compile extends CompileStage {

    /**
     * @type {Stage.SubStage.Compile[]}
     * 
     * @readonly
     * @override
     */
    subStages = [
        // @ts-expect-error
        'tsconfig',
        'ts',
        'scss',
        // @ts-expect-error
        'templates',
        'files',
    ];

    /**
     * @protected
     * @override
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

        // runs templates sub-stage and returns
        if (
            this.params.watchedFilename
            && this.params.watchedFilename.match( /(^|\/)src\/scss\/template/gi )
        ) {
            await this.runCustomDirCopySubStage( 'scss/template' );
            await this.templates();
            return;
        }

        await this.runCustomDirCopySubStage( 'scss' );


        this.console.verbose( 'tidying up copied files...', 2 );
        this.try(
            this.fs.delete,
            ( this.params.verbose ? 3 : 2 ),
            [ [
                'dist/scss/template/@template'
            ], ( this.params.verbose ? 3 : 2 ) ]
        );
    }

    /**
     * @protected
     */
    async templates() {

        await this.runCustomScssDirSubStage(
            'template',
            'dist/css',
            {
                // ignoreGlobs: [
                //     '**/_*',
                //     '**/demos/**',
                // ],
                maxConcurrent: 5,
                postCSS: true,
                srcDir: 'src/scss',
            },
            1,
        );

        if ( this.params.packaging || this.params.releasing ) {
            this.console.verbose( 'tidying up compiled files...', 2 );
            this.try(
                this.fs.delete,
                ( this.params.verbose ? 3 : 2 ),
                [ [
                    'dist/scss/template/default-sample',
                ], ( this.params.verbose ? 3 : 2 ) ]
            );
        }
    }

    /**
     * @protected
     */
    async tsconfig() {
        this.console.progress( 'writing tsconfig files...', 1 );

        await this.atry( this.writeTsConfig, 2, [
            'src/ts/tsconfig.json',
            2,
            {
                extends: '@maddimathon/build-utilities/tsconfig.browser',

                include: [
                    '../../src/ts/**/*',
                    './src/ts/**/*',
                ],
                exclude: [
                    './node_modules/**/*',
                ],

                compilerOptions: {
                    declaration: true,
                    declarationMap: false,
                    module: 'ES2022',
                    outDir: '../../dist/ts/',
                    rootDir: './',
                    target: 'ES2017',
                },
            },
        ] );
    }
}