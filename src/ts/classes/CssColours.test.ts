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

import { CssColours } from './CssColours.js';

import {
    colourValuesParsed,
    colourValueFunctions,
} from './CssColours.test.values.js';


const colourValueFunctionEntries = Object.entries( colourValueFunctions ) as (
    | [ 'hex', typeof colourValueFunctions.hex ]
    | [ 'hsl', typeof colourValueFunctions.hsl ]
    | [ 'hsla', typeof colourValueFunctions.hsla ]
    | [ 'hwb', typeof colourValueFunctions.hwb ]
    | [ 'hwba', typeof colourValueFunctions.hwba ]
    | [ 'lab', typeof colourValueFunctions.lab ]
    | [ 'laba', typeof colourValueFunctions.laba ]
    | [ 'lch', typeof colourValueFunctions.lch ]
    | [ 'lcha', typeof colourValueFunctions.lcha ]
    | [ 'oklab', typeof colourValueFunctions.oklab ]
    | [ 'oklaba', typeof colourValueFunctions.oklaba ]
    | [ 'oklch', typeof colourValueFunctions.oklch ]
    | [ 'oklcha', typeof colourValueFunctions.oklcha ]
    | [ 'rgb', typeof colourValueFunctions.rgb ]
    | [ 'rgba', typeof colourValueFunctions.rgba ]
)[];

describe( 'CssColours.isFunction()', () => {
    colourValueFunctionEntries.map(
        ( [ type, value ] ) => value.map(
            ( val, index ) => test(
                type + ( value?.length > 0 ? ` #${ index + 1 }` : '' ) + ` - ${ val }`,
                () => {
                    const result = CssColours.isFunction( val );

                    expect( result ).toBe( true );

                    type _test = [
                        Test.Expect<Test.Exactly<typeof result, boolean>>,

                        Test.ExpectNot<Test.Exactly<typeof result, boolean | string>>,
                        Test.ExpectNot<Test.Exactly<typeof result, any>>,
                    ];
                    true as _test[ 0 ];
                },
            )
        )
    );

    test(
        'invalid string',
        () => expect( CssColours.isFunction( 'dasyfgbdsa' ) ).toBe( false ),
    );

    test(
        'bad hex code',
        () => {
            expect( CssColours.isFunction( '#ff55' ) ).toBe( false );
            expect( CssColours.isFunction( '#ffj' ) ).toBe( false );
        },
    );
} );

colourValueFunctionEntries.map(
    ( [ type, value ] ) => {

        describe(
            `CssColours.parseFunction() - ${ type }`,
            () => {
                value.map(
                    ( val, index ) => {

                        const testName = type + ( value?.length > 0 ? ` #${ index + 1 }` : '' );

                        test(
                            testName + ` - ${ val }`,
                            () => {
                                const result = CssColours.parseFunction( val );

                                expect( result ).toStrictEqual( colourValuesParsed[ type ] );

                                type _test = [
                                    Test.Expect<Test.Exactly<typeof result, false | CssColours.Functions.Parsed>>,

                                    Test.ExpectNot<Test.Exactly<typeof result, boolean | string>>,
                                    Test.ExpectNot<Test.Exactly<typeof result, any>>,
                                ];
                                true as _test[ 0 ];
                            },
                        );

                        const compressed = val.replace( /\s*([\(|\)|,|\/])\s*/g, '$1' );

                        test(
                            testName + ` - ${ compressed }`,
                            () => expect(
                                CssColours.parseFunction( compressed )
                            ).toStrictEqual( colourValuesParsed[ type ] ),
                        );
                    }
                );
            },
        );
    }
);

describe( 'CssColours.parseFunction() extras', () => {

    test(
        'hsl - none values',
        () => expect( CssColours.parseFunction( 'hsl(none,none,none,none)' ) ).toStrictEqual(
            {
                space: 'hsl',
                h: 0,
                s: 0,
                l: 0,
            } satisfies CssColours.Functions.All.Parsed.HSL
        ),
    );

    test(
        'hwb - none values',
        () => expect( CssColours.parseFunction( 'hwb(none,none,none,none)' ) ).toStrictEqual(
            {
                space: 'hwb',
                h: 0,
                w: 0,
                b: 0,
            } satisfies CssColours.Functions.All.Parsed.HWB
        ),
    );

    test(
        'lab - none values',
        () => expect( CssColours.parseFunction( 'lab(none none none none)' ) ).toStrictEqual(
            {
                space: 'lab',
                l: 0,
                a: 0,
                b: 0,
            } satisfies CssColours.Functions.All.Parsed.LAB
        ),
    );

    test(
        'lch - none values',
        () => expect( CssColours.parseFunction( 'lch(none none none none)' ) ).toStrictEqual(
            {
                space: 'lch',
                l: 0,
                c: 0,
                h: 0,
            } satisfies CssColours.Functions.All.Parsed.LCH
        ),
    );

    test(
        'oklab - none values',
        () => expect( CssColours.parseFunction( 'oklab(none none none none)' ) ).toStrictEqual(
            {
                space: 'oklab',
                l: 0,
                a: 0,
                b: 0,
            } satisfies CssColours.Functions.All.Parsed.OKLAB
        ),
    );

    test(
        'oklch - none values',
        () => expect( CssColours.parseFunction( 'oklch(none none none none)' ) ).toStrictEqual(
            {
                space: 'oklch',
                l: 0,
                c: 0,
                h: 0,
            } satisfies CssColours.Functions.All.Parsed.OKLCH
        ),
    );

    test(
        'rgb - none values',
        () => expect( CssColours.parseFunction( 'rgb(none,none,none,none)' ) ).toStrictEqual(
            {
                space: 'rgb',
                r: 0,
                g: 0,
                b: 0,
            } satisfies CssColours.Functions.All.Parsed.RGB
        ),
    );

    test(
        'invalid string',
        () => expect( CssColours.parseFunction( 'dasyfgbdsa' ) ).toBe( false ),
    );

    test(
        'bad hex code',
        () => {
            expect( CssColours.parseFunction( '#ff55' ) ).toBe( false );
            expect( CssColours.parseFunction( '#ffj' ) ).toBe( false );
        },
    );
} );

const slugTests = {

    keywords: [
        'currentColor',
        'inherit',
        'transparent',
    ],

    slugs: [
        'aliceblue',
        'antiquewhite',
        'aqua',
        'aquamarine',
        'azure',
        'beige',
        'bisque',
        'black',
        'blanchedalmond',
        'blue',
        'blueviolet',
        'brown',
        'burlywood',
        'cadetblue',
        'chartreuse',
        'chocolate',
        'coral',
        'cornflowerblue',
        'cornsilk',
        'crimson',
        'cyan',
        'darkblue',
        'darkcyan',
        'darkgoldenrod',
        'darkgray',
        'darkgreen',
        'darkgrey',
        'darkkhaki',
        'darkmagenta',
        'darkolivegreen',
        'darkorange',
        'darkorchid',
        'darkred',
        'darksalmon',
        'darkseagreen',
        'darkslateblue',
        'darkslategray',
        'darkslategrey',
        'darkturquoise',
        'darkviolet',
        'deeppink',
        'deepskyblue',
        'dimgray',
        'dimgrey',
        'dodgerblue',
        'firebrick',
        'floralwhite',
        'forestgreen',
        'fuchsia',
        'gainsboro',
        'ghostwhite',
        'gold',
        'goldenrod',
        'gray',
        'green',
        'greenyellow',
        'grey',
        'honeydew',
        'hotpink',
        'indianred',
        'indigo',
        'ivory',
        'khaki',
        'lavender',
        'lavenderblush',
        'lawngreen',
        'lemonchiffon',
        'lightblue',
        'lightcoral',
        'lightcyan',
        'lightgoldenrodyellow',
        'lightgray',
        'lightgreen',
        'lightgrey',
        'lightpink',
        'lightsalmon',
        'lightseagreen',
        'lightskyblue',
        'lightslategray',
        'lightslategrey',
        'lightsteelblue',
        'lightyellow',
        'lime',
        'limegreen',
        'linen',
        'magenta',
        'maroon',
        'mediumaquamarine',
        'mediumblue',
        'mediumorchid',
        'mediumpurple',
        'mediumseagreen',
        'mediumslateblue',
        'mediumspringgreen',
        'mediumturquoise',
        'mediumvioletred',
        'midnightblue',
        'mintcream',
        'mistyrose',
        'moccasin',
        'navajowhite',
        'navy',
        'oldlace',
        'olive',
        'olivedrab',
        'orange',
        'orangered',
        'orchid',
        'palegoldenrod',
        'palegreen',
        'paleturquoise',
        'palevioletred',
        'papayawhip',
        'peachpuff',
        'peru',
        'pink',
        'plum',
        'powderblue',
        'purple',
        'rebeccapurple',
        'red',
        'rosybrown',
        'royalblue',
        'saddlebrown',
        'salmon',
        'sandybrown',
        'seagreen',
        'seashell',
        'sienna',
        'silver',
        'skyblue',
        'slateblue',
        'slategray',
        'slategrey',
        'snow',
        'springgreen',
        'steelblue',
        'tan',
        'teal',
        'thistle',
        'tomato',
        'turquoise',
        'violet',
        'wheat',
        'white',
        'whitesmoke',
        'yellow',
        'yellowgreen',
    ],

    systemColors: [
        'AccentColor',
        'AccentColorText',
        'ActiveText',
        'ButtonBorder',
        'ButtonFace',
        'ButtonText',
        'Canvas',
        'CanvasText',
        'Field',
        'FieldText',
        'GrayText',
        'Highlight',
        'HighlightText',
        'LinkText',
        'Mark',
        'MarkText',
        'SelectedItem',
        'SelectedItemText',
        'VisitedText',
    ],
} as const;

describe( 'CssColours.isKeyword()', () => {

    slugTests.keywords.map(
        ( keyword ) => test( keyword, () => {
            const result = CssColours.isKeyword( keyword );

            expect( result ).toBe( true );

            const testValue = keyword as string;

            if ( CssColours.isKeyword( testValue ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof testValue, CssColours.Keyword>>,
                    Test.ExpectNot<Test.Exactly<typeof testValue, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, true>>,

                Test.ExpectNot<Test.Exactly<typeof result, boolean>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.slugs.map(
        ( slug ) => test( slug, () => {
            const result = CssColours.isKeyword( slug );

            expect( result ).toBe( false );

            if ( CssColours.isKeyword( slug ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof slug, never>>,
                    Test.ExpectNot<Test.Exactly<typeof slug, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.systemColors.map(
        ( systemColor ) => test( systemColor, () => {
            const result = CssColours.isKeyword( systemColor );

            expect( result ).toBe( false );

            if ( CssColours.isKeyword( systemColor ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof systemColor, never>>,
                    Test.ExpectNot<Test.Exactly<typeof systemColor, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );
} );

describe( 'CssColours.isSlug()', () => {

    slugTests.keywords.map(
        ( keyword ) => test( keyword, () => {
            const result = CssColours.isSlug( keyword );

            expect( result ).toBe( false );

            if ( CssColours.isSlug( keyword ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof keyword, never>>,
                    Test.ExpectNot<Test.Exactly<typeof keyword, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.slugs.map(
        ( slug ) => test( slug, () => {
            const result = CssColours.isSlug( slug );

            expect( result ).toBe( true );

            const testValue = slug as string;

            if ( CssColours.isSlug( testValue ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof testValue, CssColours.Slug>>,
                    Test.ExpectNot<Test.Exactly<typeof testValue, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, true>>,

                Test.ExpectNot<Test.Exactly<typeof result, boolean>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.systemColors.map(
        ( systemColor ) => test( systemColor, () => {
            const result = CssColours.isSlug( systemColor );

            expect( result ).toBe( false );

            if ( CssColours.isSlug( systemColor ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof systemColor, never>>,
                    Test.ExpectNot<Test.Exactly<typeof systemColor, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );
} );

describe( 'CssColours.isSystemColor()', () => {

    slugTests.keywords.map(
        ( keyword ) => test( keyword, () => {
            const result = CssColours.isSystemColor( keyword );

            expect( result ).toBe( false );

            if ( CssColours.isSystemColor( keyword ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof keyword, never>>,
                    Test.ExpectNot<Test.Exactly<typeof keyword, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.slugs.map(
        ( slug ) => test( slug, () => {
            const result = CssColours.isSystemColor( slug );

            expect( result ).toBe( false );

            if ( CssColours.isSystemColor( slug ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof slug, never>>,
                    Test.ExpectNot<Test.Exactly<typeof slug, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, boolean>>,

                Test.ExpectNot<Test.Exactly<typeof result, true>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );

    slugTests.systemColors.map(
        ( systemColor ) => test( systemColor, () => {
            const result = CssColours.isSystemColor( systemColor );

            expect( result ).toBe( true );

            const testValue = systemColor as string;

            if ( CssColours.isSystemColor( testValue ) ) {
                type _test = [
                    Test.Expect<Test.Exactly<typeof testValue, CssColours.SystemColor>>,
                    Test.ExpectNot<Test.Exactly<typeof testValue, string>>,
                ];
                true as _test[ 0 ];
            }

            type _test = [
                Test.Expect<Test.Exactly<typeof result, true>>,

                Test.ExpectNot<Test.Exactly<typeof result, boolean>>,
                Test.ExpectNot<Test.Exactly<typeof result, false>>,
            ];
            true as _test[ 0 ];
        } )
    );
} );