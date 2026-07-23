/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '@maddimathon/utility-typescript/types';
import { describe, expect, test } from '@jest/globals';
import { FeatureCheck } from './FeatureCheck.js';

export type CheckerTypeTest = [

    Test.Expect<Test.Satisfies<typeof FeatureCheck.CHECKERS, {
        [ K in FeatureCheck.DefaultCheckSlug ]: () => Promise<boolean>;
    }>>,
];

const array = [
    'aspectRatio',
    'atProperty',
    'backgroundFixed',
    'calc',
    'displayContents',
    'focusWithin',
    'focusVisible',
    'hasSelector',
    'subgrid',
    'whereSelector',
    'customTest',
] as const;

type _Expected<T_Slug extends string> = {

    noPrefix_true: T_Slug;
    noPrefix_false: `no-${ T_Slug }`;

    prefix_true: `js__${ T_Slug }`;
    prefix_false: `js__no-${ T_Slug }`;
};

const expected = Object.fromEntries(
    array.map(
        ( slug ) => [
            slug,
            {
                noPrefix_true: slug,
                noPrefix_false: `no-${ slug }`,

                prefix_true: `js__${ slug }`,
                prefix_false: `js__no-${ slug }`,
            } satisfies _Expected<typeof slug>,
        ] as const
    )
) satisfies {
    [ key: string ]: _Expected<string>;
} as {
        [ S in typeof array[ number ] ]: _Expected<S>;
    };

const expected_js = {
    noPrefix_true: 'js',
    noPrefix_false: `no-${ 'js' }`,

    prefix_true: `js__${ 'js' }`,
    prefix_false: `js__no-${ 'js' }`,
} satisfies _Expected<'js'>;

describe( 'FeatureCheck.getClassName()', () => {


    // describe( 'slug: js', () => {
    for ( const value of [ true, false ] ) {
        test( `slug: js - ${ value } (default)`, () => {
            // default
            expect( FeatureCheck.getClassName( 'js', value ) ).toBe( expected_js[ `noPrefix_${ value }` ] );

            // ignore prefix
            expect( FeatureCheck.getClassName( 'js', value, true ) ).toBe( expected_js[ `noPrefix_${ value }` ] );

            // with prefix
            expect( FeatureCheck.getClassName( 'js', value, false ) ).toBe( expected_js[ `prefix_${ value }` ] );
        } );
    }
    // } );

    for ( const slug of array ) {
        // describe( `slug: ${ slug }`, () => {
        for ( const value of [ true, false ] ) {
            test( `slug: ${ slug } - ${ value }`, () => {
                // default
                expect( FeatureCheck.getClassName( slug, value ) ).toBe( expected[ slug ][ `prefix_${ value }` ] );

                // ignore prefix
                expect( FeatureCheck.getClassName( slug, value, true ) ).toBe( expected[ slug ][ `noPrefix_${ value }` ] );

                // with prefix
                expect( FeatureCheck.getClassName( slug, value, false ) ).toBe( expected[ slug ][ `prefix_${ value }` ] );
            } );
        }
        // } );
    }
} );