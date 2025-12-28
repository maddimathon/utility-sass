/**
 * @since 0.1.0-alpha.8
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type * as sass from "sass-embedded";

import type { Logger, Stage_Console } from '@maddimathon/build-utilities/internal';

import { sass_getCurrentVersion } from './sass/getCurrentVersion.js';

/**
 * Compiles the functions available from this package (intended as compiler
 * functions to support the package's modules) into a {@link sass.Options}-ready
 * format.
 * 
 * @since 0.1.0-alpha.8
 */
export function sassCompilerFunctions( console: Logger | Stage_Console ) {

    return {

        'mmutils-global-getCurrentVersion()': sass_getCurrentVersion( console ),

    } as const satisfies sass.Options<'async'>[ 'functions' ];
}