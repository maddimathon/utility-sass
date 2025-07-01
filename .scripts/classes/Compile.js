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
        await this.runCustomDirCopySubStage( 'scss' );
        await this.runCustomDirCopySubStage( 'templates' );
    }

    /**
     * @protected
     */
    async templates() {

        const templates = [
            'base',
            'demo',
        ];

        for ( const _tmpl of templates ) {

            await this.runCustomScssDirSubStage(
                'templates/' + _tmpl,
                'templates/css/' + _tmpl,
            );
        }
    }
}