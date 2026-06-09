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
        // @ts-expect-error
        'values',
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
    async values() {
        this.console.progress( 'generating values files for documentation...', 1 );

        const [
            { CssColours },
            { colourValueFunctions },
        ] = await Promise.all( [
            import( '../../dist/ts/classes/CssColours.js' ),
            import( '../../dist/ts/classes/CssColours.test.values.js' ),
        ] ).catch(
            err => {
                this.handleError( err, 2, { exitProcess: this.params.packaging || this.params.releasing } );
                return [];
            }
        );

        // returns
        if ( !CssColours ) {
            return;
        }

        const md_file = [
            '<!-- this file is generated during the document build stage -->',
        ];

        /** @type {string[]} */
        const md_parseCssColourFunction = [];

        /** @type {string[]} */
        const md_tests_all = [];

        const ts_file = [
            '// this file is generated during the document build stage',
        ];

        /** @type {[ 'hex', 'hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'rgb' ]} */
        const functions = [ 'hex', 'hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'rgb' ];

        for ( const func of functions ) {

            md_file.push(
                '',
                `<!-- #region regex-${ func } -->`,
                '```ts',
                CssColours.Regex[ func ].toString(),
                '```',
                `<!-- #endregion regex-${ func } -->`,
            );

            ts_file.push(
                '',
                `// #region ${ func }`,
                `export const regex_${ func } = ` + CssColours.Regex[ func ].toString() + ';',
                `// #endregion ${ func }`,
            );
        }

        /** @type {[ [ 'hex' ], [ 'hsl', 'hsla' ], [ 'hwb', 'hwba' ], [ 'lab', 'laba' ], [ 'lch', 'lcha' ], [ 'oklab', 'oklaba' ], [ 'oklch', 'oklcha' ], [ 'rgb', 'rgba' ], ]} */
        const testStrings = [
            [ 'hex' ],
            [ 'hsl', 'hsla' ],
            [ 'hwb', 'hwba' ],
            [ 'lab', 'laba' ],
            [ 'lch', 'lcha' ],
            [ 'oklab', 'oklaba' ],
            [ 'oklch', 'oklcha' ],
            [ 'rgb', 'rgba' ],
        ];

        for ( const [ test, testAlpha ] of testStrings ) {

            /** @type {string[]} */
            const _allArrayContent = [];

            switch ( test ) {

                case 'hsl':
                case 'hwb':
                case 'rgb':
                    _allArrayContent.push(
                        `// none keywords`,
                        `"${ test }(none,none,none,none)",`,
                    );
                    break;

                case 'lab':
                case 'lch':
                case 'oklab':
                case 'oklch':
                    _allArrayContent.push(
                        `// none keywords`,
                        `"${ test }(none none none none)",`,
                    );
                    break;
            }

            _allArrayContent.push(
                '',
                `// without alpha`,
                ...colourValueFunctions[ test ].map( str => `"${ str }",` ),
            );

            if ( testAlpha ) {
                _allArrayContent.push(
                    '',
                    `// with alpha`,
                    ...colourValueFunctions[ testAlpha ].map( str => `"${ str }",` ),
                );
            }

            const _ts_allArrayContent = '[\n    ' + _allArrayContent.join( '\n    ' ) + '\n];';

            ts_file.push(
                '',
                `// #region test-${ test }`,
                `export const tests_${ test } = ` + _ts_allArrayContent,
                `// #endregion test-${ test }`,
                // '',
                // `// #region supported-${ test }`,
                // `export const supported_${ test } = ` + JSON.stringify( colourValueFunctions[ test ], null, 4 ) + ';',
                // `// #endregion supported-${ test }`,
            );

            // if ( testAlpha ) {
            //     ts_file.push(
            //         '',
            //         `// #region supported-${ test }-alpha`,
            //         `export const supported_${ test }_alpha = ` + JSON.stringify( colourValueFunctions[ testAlpha ], null, 4 ) + ';',
            //         `// #endregion supported-${ test }-alpha`,
            //     );
            // }

            const _md_allArrayContent = [
                '```ts',
                `export const ${ test } = ` + _ts_allArrayContent,
                '```',
            ];

            md_file.push(
                '',
                `<!-- #region test-${ test } -->`,
                ..._md_allArrayContent,
                `<!-- #endregion test-${ test } -->`,
            );

            md_parseCssColourFunction.push(
                '',
                `### ${ test === 'hex' ? 'Hex' : test.toUpperCase() }`,
                '',
                ..._md_allArrayContent,
            );

            md_tests_all.push(
                '',
                `### ${ test === 'hex' ? 'Hex' : test.toUpperCase() }`,
                '',
                ..._md_allArrayContent,
            );
        }

        md_file.push(
            '',
            '<!-- #region test-all -->',
            'These formats are tested with {@link CssColours.parseFunction}.',
            ...md_tests_all,
            '<!-- #endregion test-all -->',
            '',
            '<!-- #region parseFunction -->',
            ...md_parseCssColourFunction,
            '<!-- #endregion parseFunction -->',
        );

        md_file.push( '' );
        ts_file.push( '' );

        const [ path ] = await Promise.all( [
            this.atry(
                this.fs.write,
                2,
                [
                    'src/ts/classes/CssColours.docs.js',
                    ts_file.join( `\n` ),
                    { force: true },
                ],
            ),

            this.atry(
                this.fs.write,
                2,
                [
                    'src/ts/classes/CssColours.docs.md',
                    md_file.join( `\n` ),
                    { force: true },
                ],
            ),
        ] );

        if ( path ) {
            await this.atry(
                this.fs.prettier,
                2,
                [ path, 'ts', {} ],
            );
        }
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