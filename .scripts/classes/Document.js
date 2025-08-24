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
    DocumentStage,
} from '@maddimathon/build-utilities';

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
        'typeDoc',
        'replace',
        // @ts-expect-error
        'tidy',
    ];

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