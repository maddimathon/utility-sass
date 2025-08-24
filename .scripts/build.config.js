#!/usr/bin/env node
// @ts-check
'use strict';

/**
 * @import { Config, Stage } from "@maddimathon/build-utilities"
 */

import {
    BuildStage,
} from '@maddimathon/build-utilities';

import { Build } from './classes/Build.js';
import { Compile } from './classes/Compile.js';
import { Document } from './classes/Document.js';

const _defaults = {
    build: BuildStage.prototype.ARGS_DEFAULT,
};

/**
 * @type {Config}
 */
const config = {

    title: 'Utility Sass',
    launchYear: '2025',

    stages: {

        build: [
            Build,
            {

                minimize: false,

                /**
                 * @param {Stage} _stage
                 */
                prettify: ( _stage ) => {

                    return {
                        ..._defaults.build.prettify( _stage ),

                        html: undefined,
                        js: undefined,
                        json: undefined,
                        md: undefined,
                        mdx: undefined,
                        ts: undefined,
                        yaml: undefined,
                    };
                },
            },
        ],

        compile: Compile,

        document: [ Document, {

            entryPoints: [
                'src/ts/index.ts',
            ],

            typeDoc: {

                categorizeByGroup: false,
                groupReferencesByType: false,

                projectDocuments: [
                    'README.md',
                    'src/scss/index.docs.md',
                    // 'src/scss/**/*.docs.md',
                    // 'src/docs/*.md',
                ],

                router: 'structure',
            },
        } ],

        test: false,
    },
};

export default config;
