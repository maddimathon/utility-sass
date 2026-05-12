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
    DocumentStage,
} from '@maddimathon/build-utilities';

import * as mermaid from '@mermaid-js/mermaid-cli';

/**
 * Extension of the built-in one.
 */
export class Document extends DocumentStage {

    /**
     * @type {Stage.SubStage.Document[]}
     * 
     * @readonly
     * @override
     */
    subStages = [
        // @ts-expect-error
        'mermaid',
        'typeDoc',
        'replace',
        // @ts-expect-error
        'tidy',
    ];

    /**
     * @protected
     */
    async mermaid() {
        this.console.progress( 'generating mermaid files...', 1 );
        await this.atry(
            mermaid.run,
            2,
            [
                this.fs.pathResolve( 'src/scss/modules/dependencies.mmd' ),
                'src/scss/modules/dependencies.svg',
            ],
        );
    }

    /**
     * @protected
     */
    async tidy() {
        this.console.progress( 'tidying up documentation files...', 1 );

        this.try(
            this.fs.delete,
            2,
            [ this.getDistDir( undefined, 'scss/**/*.docs.md' ), 2 ],
        );
    }
}