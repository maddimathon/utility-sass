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

const _defaults = {
    build: BuildStage.prototype.ARGS_DEFAULT,
};

/**
 * @type {Config}
 */
const config = {

    title: 'Utility SASS',
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
                        ts: undefined,
                        yaml: undefined,
                    };
                },
            },
        ],

        compile: [
            Compile,
            {
                ts: false,
            }
        ],

        document: false,

        test: false,
    },
};

export default config;
