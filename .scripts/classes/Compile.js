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

        // runs templates sub-stage and returns
        if (
            this.params.watchedFilename
            && this.params.watchedFilename.match( /(^|\/)src\/scss\/templates/gi )
        ) {
            await this.runCustomDirCopySubStage( 'scss/templates' );
            await this.templates();
            return;
        }

        await this.runCustomDirCopySubStage( 'scss' );
    }

    /**
     * @protected
     */
    async templates() {

        await this.runCustomScssDirSubStage(
            'scss/templates',
            this.getDistDir( undefined, 'css/templates' ),
            {
                postCSS: true,
            },
        );
    }
}