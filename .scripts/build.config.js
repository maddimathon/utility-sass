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

    compiler: {

        postCSS: {
            presetEnv: {
                features: {
                    "custom-properties": false,
                },
            },
        },

        sass: {
            benchmarkCompileTime: true,
            pathToSassLoggingRoot: 'node_modules/@maddimathon/build-utilities/node_modules',
            quietDeps: false,
        },

        ts: {
            tidyGlobs: [
                '**/@sassFn_Template.js',
                '**/@sassFn_Template.js.map',
                '**/@sassFn_Template.d.ts',
                '**/@sassFn_Template.ts.map',
            ],
        },
    },

    stages: {

        build: [
            Build,
            {
                replace: ( _stage ) => {
                    const _def = _defaults.build.replace( _stage );

                    return {
                        ..._def,
                        ignore: [
                            ..._def.ignore ?? [],
                            '**/@sassFn_Template.ts',
                        ],
                    };
                },

                minimize: false,

                /**
                 * @param {Stage} _stage
                 */
                prettify: ( _stage ) => ( {
                    ..._defaults.build.prettify( _stage ),

                    html: undefined,
                    js: undefined,
                    json: undefined,
                    md: undefined,
                    mdx: undefined,
                    ts: undefined,
                    yaml: undefined,
                } ),
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

        test: true,
    },
};

export default config;
