#!/usr/bin/env node
'use strict';
// @ts-check
/*
 * @package @maddimathon/utility-sass
 * @author Maddi Mathon (https://www.maddimathon.com/web)
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
        // @ts-expect-error
        'tsconfig',
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
        this.console.progress( 'writing scss files...', 1 );

        /**
         * @type {{ content: string | string[], format?: "scss", path: string }[]}
         */
        const files = [];

        /**
         * @type {string[]}
         */
        const docblockPrinterFileContent = [
            '@use "sass:list";',
            '',
        ];

        const docblockHeaderFunctionMaximums = [ 15, 30, 45, 60, 80, 100 ];
        const docblockHeaderFunctionMaximums_max = Math.max( ...docblockHeaderFunctionMaximums );

        const docblockFunctionParams = '$joiner, $lines, $linesListLength, $secondChar';
        const docblockFunctionParams_withDefaults = '$lines, $joiner: " / ", $resistMinimize: false';

        let lastMax = 1;

        for ( const maximumLines of docblockHeaderFunctionMaximums ) {
            /**
             * @type {string[]}
             */
            const innerFunction = [];

            for ( let numOfLines = lastMax; numOfLines <= maximumLines; numOfLines++ ) {
                const _ifStatement = numOfLines === lastMax
                    ? '@if'
                    : '} @else if';

                innerFunction.push(
                    `    ${ _ifStatement } $linesListLength <= ${ numOfLines } {`,
                    '        /*#{$secondChar}',
                    ...Array.from( { length: numOfLines }, ( _, line ) => `         * #{list.nth( $lines, ${ line + 1 } )}` ),
                    '         */',
                );
            }

            // this is the @else for the maximum number of lines
            innerFunction.push(
                '    } @else {',
                '        $_lastLine: "";',
                '        $_isFirstLine: true;',
                `        @for $lineNum from ${ maximumLines + 1 } through $linesListLength {`,
                '            $line: list.nth($lines, $lineNum);',
                '',
                '            @if $_isFirstLine {',
                '                $_lastLine: $line;',
                '                $_isFirstLine: false;',
                '            } @else {',
                '                $_lastLine: "#{$_lastLine}#{$joiner}#{$line}";',
                '            }',
                '        }',
                '',
                '        /*#{$secondChar}',
                ...Array.from( { length: maximumLines }, ( _, line ) => `         * #{list.nth( $lines, ${ line + 1 } )}` ),
                `         * #{$_lastLine}`,
                '         */',
                '    }',
            );

            docblockPrinterFileContent.push(
                '///',
                `/// Supports ${ lastMax } to ${ maximumLines } lines.`,
                '///',
                '/// @since ___PKG_VERSION___',
                '///',
                `@mixin _docblock-printer--max-${ maximumLines }( ${ docblockFunctionParams } ) {`,
                ...innerFunction,
                '}',
                '',
            );

            lastMax = maximumLines;
        }

        // this is the function that conditionally calls the others
        docblockPrinterFileContent.push(
            '///',
            `/// Supports up to ${ docblockHeaderFunctionMaximums_max } lines.`,
            '///',
            '/// @since ___PKG_VERSION___',
            '///',
            `@mixin docblock-printer( ${ docblockFunctionParams_withDefaults } ) {`,
            '    $linesListLength: list.length($lines);',
            '    $secondChar: if( $resistMinimize, "!", "*" );',
            '',
            '    @if $linesListLength <= 0 {',
            '        // do nothing',
            ...docblockHeaderFunctionMaximums.map(
                ( maximumLines ) => {
                    const _include = [
                        `        @include _docblock-printer--max-${ maximumLines }(`,
                        '            $joiner: $joiner,',
                        '            $lines: $lines,',
                        '            $linesListLength: $linesListLength,',
                        '            $secondChar: $secondChar,',
                        '        );',
                    ];

                    return maximumLines === docblockHeaderFunctionMaximums_max
                        ? [
                            `    } @else {`,
                            ..._include,
                            '    }',
                        ]
                        : [
                            `    } @else if $linesListLength <= ${ maximumLines } {`,
                            ..._include,
                        ];
                }
            ).flat(),
            '}',
            '',
        );

        files.push( {
            content: docblockPrinterFileContent,
            format: 'scss',
            path: 'src/scss/modules/meta/_docblock-printer.scss',
        } );

        await Promise.all( files.map(
            async ( { content, format, path } ) => {
                /**
                 * @type {string[]}
                 */
                const header = [];

                let _firstLine = '';

                if ( format === 'scss' ) {
                    _firstLine = '// this file is auto-generated during compile';
                    header.push(
                        '///',
                        '/// @package @maddimathon/utility-sass@___CURRENT_VERSION___',
                        '/// @since ___PKG_VERSION___',
                        '///',
                        '',
                    );
                }

                content = Array.isArray( content )
                    ? [ _firstLine, ...header, ...content ]
                    : [ _firstLine, ...header, content ];

                return this.atry(
                    this.fs.write,
                    2,
                    [ path, content, { force: true } ],
                );
            }
        ) );


        this.console.verbose( 'prepping scss compiler...', 1 );

        /** @type { undefined | typeof import( '../../src/ts/functions/sassCompilerOpts.ts' ) } */
        const sass_fn_import = await import( '../../dist/ts/functions/sassCompilerOpts.js' );

        if ( sass_fn_import?.sassCompilerOpts ) {
            this.compiler.args.sass = this.compiler.parseArgs(
                this.compiler.args,
                {
                    sass: sass_fn_import.sassCompilerOpts(
                        this,
                        this.compiler.args.sass,
                    ),
                },
            ).sass;
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
            [ [ 'dist/scss/template/@template' ], ( this.params.verbose ? 3 : 2 ) ],
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
                // ignoreGlobs: [
                //     '**/_*',
                //     '**/demos/**',
                // ],
                maxConcurrent: 5,
                postCSS: true,
                srcDir: 'src/scss',
            },
            1,
        );

        if ( this.params.packaging || this.params.releasing ) {
            this.console.verbose( 'tidying up compiled files...', 2 );
            this.try(
                this.fs.delete,
                ( this.params.verbose ? 3 : 2 ),
                [ [ 'dist/scss/template/default-sample' ], ( this.params.verbose ? 3 : 2 ) ],
            );
        }
    }

    /**
     * @protected
     */
    async tsconfig() {
        this.console.progress( 'writing tsconfig files...', 1 );

        await this.atry( this.writeTsConfig, 2, [
            'src/ts/tsconfig.json',
            2,
            {
                extends: '@maddimathon/build-utilities/tsconfig.browser',

                include: [
                    '../../src/ts/**/*',
                    './src/ts/**/*',
                ],
                exclude: [
                    './node_modules/**/*',
                ],

                compilerOptions: {
                    declaration: true,
                    declarationMap: false,
                    module: 'ES2022',
                    outDir: '../../dist/ts/',
                    rootDir: './',
                    target: 'ES2017',
                },
            },
        ] );
    }
}