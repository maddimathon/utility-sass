#!/usr/bin/env node
'use strict';
// @ts-check
/*
 * @package @maddimathon/utility-sass
 * @author Maddi Mathon (www.maddimathon.com)
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

        /** @type {undefined | { 'sassCompilerOpts': undefined | typeof import( 'dist/ts/functions/sassCompilerOpts.js' ).sassCompilerOpts; }} */
        const sass_fn_import = await import( '../../dist/ts/functions/sassCompilerOpts.js' );

        if ( sass_fn_import?.sassCompilerOpts ) {

            this.compiler.args.sass = sass_fn_import.sassCompilerOpts(
                this.compiler.args.sass,
            );
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
                maxConcurrent: 15,
                postCSS: true,
                srcDir: 'src/scss',
            },
            1,
        );

        this.console.verbose( 'tidying up compiled files...', 2 );
        this.try(
            this.fs.delete,
            ( this.params.verbose ? 3 : 2 ),
            [ [
                'dist/css/template/@template.css',
                'dist/css/template/@template.css.map'
            ], ( this.params.verbose ? 3 : 2 ) ]
        );
    }
}