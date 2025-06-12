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
 * @import { AbstractStage, Stage } from "@maddimathon/build-utilities"
 */

import {
    CompileStage,
} from '@maddimathon/build-utilities';

/**
 * @typedef {Stage.Args.Compile} Compile_Args
 */

/**
 * @typedef {Stage.SubStage.Compile | "readme"} Compile_SubStage
 */

/**
 * Extension of the built-in one.
 * 
 * @implements {AbstractStage<Compile_Args, Compile_SubStage>}
 */
export class Compile extends CompileStage {

    /**
     * @protected
     * @override
     */
    async scss() {
        this.console.progress( 'copying scss to dist...', 1 );

        const distDir = this.getDistDir().trim().replace( /\/$/g, '' );

        const srcDir = this.getSrcDir().trim().replace( /\/$/g, '' );

        this.fs.copy(
            'scss',
            2,
            distDir,
            srcDir,
            {
                force: true,
                rename: true,
                recursive: true,
            },
        );
    }
}