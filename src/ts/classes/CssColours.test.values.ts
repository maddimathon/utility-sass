/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import { arrayUnique } from '@maddimathon/utility-typescript';
import { CssColours } from './CssColours.js';

export const colourValues: {
    hex: {
        short: '#f8c',
        full: '#ff88cc',
    },

    hsl: { h: -172.08, s: 68.187, l: 35.2, },

    hwb: { h: -44.64, w: 30.2, b: 50.2, },

    lab: { l: 45.186, a: -109.1, b: -9.3, },
    oklab: { l: 0.452, a: -0.35, b: -0.029, },

    lch: { l: 70.2, c: -32.625, h: -223.2, },
    oklch: { l: 0.74, c: -0.12, h: -217.08, },

    rgb: { r: 45.186, g: 40.188, b: 68.187, },
} = {
    hex: {
        short: '#f8c',
        full: '#ff88cc',
    },

    hsl: { h: -172.08, s: 68.187, l: 35.2, },

    hwb: { h: -44.64, w: 30.2, b: 50.2, },

    lab: { l: 45.186, a: -109.1, b: -9.3, },
    oklab: { l: 0.452, a: -0.35, b: -0.029, },

    lch: { l: 70.2, c: -32.625, h: -223.2, },
    oklch: { l: 0.74, c: -0.12, h: -217.08, },

    rgb: { r: 45.186, g: 40.188, b: 68.187, },
} as const satisfies {
    hex: {
        short: CssColours.Functions.All.Input[ 'hex' ];
        full: CssColours.Functions.All.Input[ 'hex' ];
    };
} & Omit<CssColours.Functions.All.Input, 'hex'>;

const colourValueEntries = Object.entries( {
    ...colourValues,
    hex: colourValues.hex.short,
    hsla: colourValues.hsl,
    hwba: colourValues.hwb,
    laba: colourValues.lab,
    oklaba: colourValues.oklab,
    lcha: colourValues.lch,
    oklcha: colourValues.oklch,
    rgba: colourValues.rgb,
} ) as (
    | [ 'hex', typeof colourValues.hex ]
    | [ 'hsl', typeof colourValues.hsl ]
    | [ 'hsla', typeof colourValues.hsl ]
    | [ 'hwb', typeof colourValues.hwb ]
    | [ 'hwba', typeof colourValues.hwb ]
    | [ 'lab', typeof colourValues.lab ]
    | [ 'laba', typeof colourValues.lab ]
    | [ 'lch', typeof colourValues.lch ]
    | [ 'lcha', typeof colourValues.lch ]
    | [ 'oklab', typeof colourValues.oklab ]
    | [ 'oklaba', typeof colourValues.oklab ]
    | [ 'oklch', typeof colourValues.oklch ]
    | [ 'oklcha', typeof colourValues.oklch ]
    | [ 'rgb', typeof colourValues.rgb ]
    | [ 'rgba', typeof colourValues.rgb ]
)[];

type Parsed =
    | [ 'hex', { r: number, g: number, b: number, space: 'hex'; } ]
    | [ 'hsl', typeof colourValues.hsl & { space: 'hsl'; } ]
    | [ 'hsla', typeof colourValues.hsl & { space: 'hsl'; alpha: 85; } ]
    | [ 'hwb', typeof colourValues.hwb & { space: 'hwb'; } ]
    | [ 'hwba', typeof colourValues.hwb & { space: 'hwb'; alpha: 85; } ]
    | [ 'lab', typeof colourValues.lab & { space: 'lab'; } ]
    | [ 'laba', typeof colourValues.lab & { space: 'lab'; alpha: 85; } ]
    | [ 'lch', typeof colourValues.lch & { space: 'lch'; } ]
    | [ 'lcha', typeof colourValues.lch & { space: 'lch'; alpha: 85; } ]
    | [ 'oklab', typeof colourValues.oklab & { space: 'oklab'; } ]
    | [ 'oklaba', typeof colourValues.oklab & { space: 'oklab'; alpha: 0.85; } ]
    | [ 'oklch', typeof colourValues.oklch & { space: 'oklch'; } ]
    | [ 'oklcha', typeof colourValues.oklch & { space: 'oklch'; alpha: 0.85; } ]
    | [ 'rgb', typeof colourValues.rgb & { space: 'rgb'; } ]
    | [ 'rgba', typeof colourValues.rgb & { space: 'rgb'; alpha: 85; } ];


const colourValuesParsedEntries: Parsed[] = colourValueEntries.map(
    ( [ space, value ] ) => {
        switch ( space ) {

            case 'hsla':
            case 'hwba':
            case 'laba':
            case 'lcha':
            case 'rgba':
                return [
                    space,
                    { space: space.replace( /a$/, '' ), ...value, alpha: 85 } as Extract<Parsed, [ typeof space ]>,
                ];

            case 'oklaba':
            case 'oklcha':
                return [
                    space,
                    { space: space.replace( /a$/, '' ), ...value, alpha: 0.85 } as Extract<Parsed, [ typeof space ]>,
                ];

            case 'hsl':
            case 'hwb':
            case 'lab':
            case 'oklab':
            case 'lch':
            case 'oklch':
            case 'rgb':
                return [
                    space,
                    { space, ...value } as Extract<Parsed, [ typeof space ]>,
                ];

            case 'hex':
                return [
                    space,
                    { space, r: 0xFF, g: 0x88, b: 0xCC } satisfies CssColours.Functions.All.Parsed.Hex,
                ];
        }
    }
);

export const colourValuesParsed = Object.fromEntries( colourValuesParsedEntries ) as {
    [ K in typeof colourValuesParsedEntries[ number ][ 0 ] ]: Extract<typeof colourValuesParsedEntries[ number ][ 1 ], { space: K; }>;
};

type ValueTestKeys = 'hex' | 'hsl' | 'hsla' | 'hwb' | 'hwba' | 'lab' | 'laba' | 'lch' | 'lcha' | 'oklab' | 'oklaba' | 'oklch' | 'oklcha' | 'rgb' | 'rgba';

function _functionArrFilter( test: ValueTestKeys, arr: string[] ) {

    // @ts-expect-error
    const func = test.replace( /a$/i, '' ) as Exclude<ValueTestKeys, `${ string }a`>;

    return arrayUnique( [
        ...arr,
        ...arr.map(
            ( str: string ) => str.replace( /\s*([\(|\)|,|\/])\s*/g, '$1' )
        ),
    ] );
}

const _zeroRemover = /^(\-?\d*\.\d+?)(0*)?$/i;

const vals = {

    hsl: {
        h: {
            $: colourValues.hsl.h.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            turn: ( colourValues.hsl.h / 360 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        s: {
            $: ( colourValues.hsl.s / 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: colourValues.hsl.s.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        l: {
            $: ( colourValues.hsl.l / 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: colourValues.hsl.l.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    hwb: {
        h: {
            $: colourValues.hwb.h.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            turn: ( colourValues.hwb.h / 360 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        w: {
            $: ( colourValues.hwb.w / 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: colourValues.hwb.w.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        b: {
            $: ( colourValues.hwb.b / 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: colourValues.hwb.b.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    lab: {
        l: {
            $: colourValues.lab.l.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        a: {
            $: colourValues.lab.a.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.lab.a / 125 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        b: {
            $: colourValues.lab.b.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.lab.b / 125 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    oklab: {
        l: {
            $: colourValues.oklab.l.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.oklab.l * 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        a: {
            $: colourValues.oklab.a.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.oklab.a / 0.4 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        b: {
            $: colourValues.oklab.b.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.oklab.b / 0.4 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    lch: {
        l: {
            $: colourValues.lch.l.toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        c: {
            $: colourValues.lch.c.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.lch.c / 150 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        h: {
            $: colourValues.lch.h.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.lch.h / 360 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    oklch: {
        l: {
            $: colourValues.oklch.l.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: colourValues.oklch.l * 100,
        },
        c: {
            $: colourValues.oklch.c.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.oklch.c / 0.4 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        h: {
            $: colourValues.oklch.h.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( colourValues.oklch.h / 360 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },

    rgb: {
        r: {
            $: colourValues.rgb.r.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( ( colourValues.rgb.r / 255 ) * 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        g: {
            $: colourValues.rgb.g.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( ( colourValues.rgb.g / 255 ) * 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
        b: {
            $: colourValues.rgb.b.toFixed( 12 ).replace( _zeroRemover, '$1' ),
            pc: ( ( colourValues.rgb.b / 255 ) * 100 ).toFixed( 12 ).replace( _zeroRemover, '$1' ),
        },
    },
} as const;

export const colourValueFunctions: {
    readonly [ K in ValueTestKeys ]: readonly string[];
} = {

    hex: _functionArrFilter( 'hex', [
        colourValues.hex.short,
        colourValues.hex.short.replace( /^#/, '' ),
        colourValues.hex.full,
        colourValues.hex.full.replace( /^#/, '' ),
    ] ),

    hsl: _functionArrFilter( 'hsl', [
        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ } )`,
        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }% )`,
        `hsl( ${ vals.hsl.h.$ }deg, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }% )`,
        `hsl( ${ vals.hsl.h.turn }turn, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }% )`,

        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ } )`,
        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% )`,
        `hsl( ${ vals.hsl.h.$ }deg ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% )`,
        `hsl( ${ vals.hsl.h.turn }turn ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% )`,
    ] ),

    hsla: _functionArrFilter( 'hsla', [
        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ }, 85% )`,
        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,
        `hsl( ${ vals.hsl.h.$ }deg, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,
        `hsl( ${ vals.hsl.h.turn }turn, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,

        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.$ } ${ vals.hsl.l.$ } / 85% )`,
        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,
        `hsl( ${ vals.hsl.h.$ }deg ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,
        `hsl( ${ vals.hsl.h.turn }turn ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,

        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ }, 0.85 )`,
        `hsl( ${ vals.hsl.h.$ }, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,
        `hsl( ${ vals.hsl.h.$ }deg, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,
        `hsl( ${ vals.hsl.h.turn }turn, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,

        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.$ } ${ vals.hsl.l.$ } / 0.85 )`,
        `hsl( ${ vals.hsl.h.$ } ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,
        `hsl( ${ vals.hsl.h.$ }deg ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,
        `hsl( ${ vals.hsl.h.turn }turn ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,

        `hsla( ${ vals.hsl.h.$ }, ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ }, 85% )`,
        `hsla( ${ vals.hsl.h.$ }, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,
        `hsla( ${ vals.hsl.h.$ }deg, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,
        `hsla( ${ vals.hsl.h.turn }turn, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 85% )`,

        `hsla( ${ vals.hsl.h.$ } ${ vals.hsl.s.$ } ${ vals.hsl.l.$ } / 85% )`,
        `hsla( ${ vals.hsl.h.$ } ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,
        `hsla( ${ vals.hsl.h.$ }deg ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,
        `hsla( ${ vals.hsl.h.turn }turn ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 85% )`,

        `hsla( ${ vals.hsl.h.$ }, ${ vals.hsl.s.$ }, ${ vals.hsl.l.$ }, 0.85 )`,
        `hsla( ${ vals.hsl.h.$ }, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,
        `hsla( ${ vals.hsl.h.$ }deg, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,
        `hsla( ${ vals.hsl.h.turn }turn, ${ vals.hsl.s.pc }%, ${ vals.hsl.l.pc }%, 0.85 )`,

        `hsla( ${ vals.hsl.h.$ } ${ vals.hsl.s.$ } ${ vals.hsl.l.$ } / 0.85 )`,
        `hsla( ${ vals.hsl.h.$ } ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,
        `hsla( ${ vals.hsl.h.$ }deg ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,
        `hsla( ${ vals.hsl.h.turn }turn ${ vals.hsl.s.pc }% ${ vals.hsl.l.pc }% / 0.85 )`,
    ] ),

    hwb: _functionArrFilter( 'hwb', [
        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.$ }, ${ vals.hwb.b.$ } )`,
        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }% )`,
        `hwb( ${ vals.hwb.h.$ }deg, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }% )`,
        `hwb( ${ vals.hwb.h.turn }turn, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }% )`,

        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.$ } ${ vals.hwb.b.$ } )`,
        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% )`,
        `hwb( ${ vals.hwb.h.$ }deg ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% )`,
        `hwb( ${ vals.hwb.h.turn }turn ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% )`,
    ] ),

    hwba: _functionArrFilter( 'hwba', [
        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.$ }, ${ vals.hwb.b.$ }, 85% )`,
        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 85% )`,
        `hwb( ${ vals.hwb.h.$ }deg, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 85% )`,
        `hwb( ${ vals.hwb.h.turn }turn, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 85% )`,

        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.$ } ${ vals.hwb.b.$ } / 85% )`,
        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 85% )`,
        `hwb( ${ vals.hwb.h.$ }deg ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 85% )`,
        `hwb( ${ vals.hwb.h.turn }turn ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 85% )`,

        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.$ }, ${ vals.hwb.b.$ }, 0.85 )`,
        `hwb( ${ vals.hwb.h.$ }, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 0.85 )`,
        `hwb( ${ vals.hwb.h.$ }deg, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 0.85 )`,
        `hwb( ${ vals.hwb.h.turn }turn, ${ vals.hwb.w.pc }%, ${ vals.hwb.b.pc }%, 0.85 )`,

        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.$ } ${ vals.hwb.b.$ } / 0.85 )`,
        `hwb( ${ vals.hwb.h.$ } ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 0.85 )`,
        `hwb( ${ vals.hwb.h.$ }deg ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 0.85 )`,
        `hwb( ${ vals.hwb.h.turn }turn ${ vals.hwb.w.pc }% ${ vals.hwb.b.pc }% / 0.85 )`,
    ] ),

    lab: _functionArrFilter( 'lab', [
        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.$ } ${ vals.lab.b.$ } )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.$ } ${ vals.lab.b.$ } )`,

        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% )`,
    ] ),

    laba: _functionArrFilter( 'laba', [
        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.$ } ${ vals.lab.b.$ } / 85% )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.$ } ${ vals.lab.b.$ } / 85% )`,

        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% / 85% )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% / 85% )`,

        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.$ } ${ vals.lab.b.$ } / 0.85 )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.$ } ${ vals.lab.b.$ } / 0.85 )`,

        `lab( ${ vals.lab.l.$ } ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% / 0.85 )`,
        `lab( ${ vals.lab.l.$ }% ${ vals.lab.a.pc }% ${ vals.lab.b.pc }% / 0.85 )`,
    ] ),

    oklab: _functionArrFilter( 'oklab', [
        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } )`,

        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% )`,
    ] ),

    oklaba: _functionArrFilter( 'oklaba', [
        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } / 85% )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } / 85% )`,

        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% / 85% )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% / 85% )`,

        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } / 0.85 )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.$ } ${ vals.oklab.b.$ } / 0.85 )`,

        `oklab( ${ vals.oklab.l.$ } ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% / 0.85 )`,
        `oklab( ${ vals.oklab.l.pc }% ${ vals.oklab.a.pc }% ${ vals.oklab.b.pc }% / 0.85 )`,
    ] ),

    lch: _functionArrFilter( 'lch', [
        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.$ } ${ vals.lch.h.$ } )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.$ } ${ vals.lch.h.$ }deg )`,

        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% )`,
    ] ),

    lcha: _functionArrFilter( 'lcha', [
        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.$ } ${ vals.lch.h.$ } / 85% )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.$ } ${ vals.lch.h.$ }deg / 85% )`,

        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% / 85% )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% / 85% )`,

        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.$ } ${ vals.lch.h.$ } / 0.85 )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.$ } ${ vals.lch.h.$ }deg / 0.85 )`,

        `lch( ${ vals.lch.l.$ } ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% / 0.85 )`,
        `lch( ${ vals.lch.l.$ }% ${ vals.lch.c.pc }% ${ vals.lch.h.pc }% / 0.85 )`,
    ] ),

    oklch: _functionArrFilter( 'oklch', [
        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.$ } ${ vals.oklch.h.$ } )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.$ } ${ vals.oklch.h.$ }deg )`,

        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% )`,
    ] ),

    oklcha: _functionArrFilter( 'oklcha', [
        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.$ } ${ vals.oklch.h.$ } / 85% )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.$ } ${ vals.oklch.h.$ }deg / 85% )`,

        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% / 85% )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% / 85% )`,

        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.$ } ${ vals.oklch.h.$ } / 0.85 )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.$ } ${ vals.oklch.h.$ }deg / 0.85 )`,

        `oklch( ${ vals.oklch.l.$ } ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% / 0.85 )`,
        `oklch( ${ vals.oklch.l.pc }% ${ vals.oklch.c.pc }% ${ vals.oklch.h.pc }% / 0.85 )`,
    ] ),

    rgb: _functionArrFilter( 'rgb', [
        `rgb( ${ vals.rgb.r.$ }, ${ vals.rgb.g.$ }, ${ vals.rgb.b.$ } )`,
        `rgb( ${ vals.rgb.r.$ } ${ vals.rgb.g.$ } ${ vals.rgb.b.$ } )`,

        `rgb( ${ vals.rgb.r.pc }%, ${ vals.rgb.g.pc }%, ${ vals.rgb.b.pc }% )`,
        `rgb( ${ vals.rgb.r.pc }% ${ vals.rgb.g.pc }% ${ vals.rgb.b.pc }% )`,
    ] ),

    rgba: _functionArrFilter( 'rgba', [
        `rgb( ${ vals.rgb.r.$ }, ${ vals.rgb.g.$ }, ${ vals.rgb.b.$ }, 85% )`,
        `rgb( ${ vals.rgb.r.$ } ${ vals.rgb.g.$ } ${ vals.rgb.b.$ } / 85% )`,

        `rgb( ${ vals.rgb.r.pc }%, ${ vals.rgb.g.pc }%, ${ vals.rgb.b.pc }%, 85% )`,
        `rgb( ${ vals.rgb.r.pc }% ${ vals.rgb.g.pc }% ${ vals.rgb.b.pc }% / 85% )`,

        `rgb( ${ vals.rgb.r.$ }, ${ vals.rgb.g.$ }, ${ vals.rgb.b.$ }, 0.85 )`,
        `rgb( ${ vals.rgb.r.$ } ${ vals.rgb.g.$ } ${ vals.rgb.b.$ } / 0.85 )`,

        `rgb( ${ vals.rgb.r.pc }%, ${ vals.rgb.g.pc }%, ${ vals.rgb.b.pc }%, 0.85 )`,
        `rgb( ${ vals.rgb.r.pc }% ${ vals.rgb.g.pc }% ${ vals.rgb.b.pc }% / 0.85 )`,

        `rgba( ${ vals.rgb.r.$ }, ${ vals.rgb.g.$ }, ${ vals.rgb.b.$ }, 85% )`,
        `rgba( ${ vals.rgb.r.$ } ${ vals.rgb.g.$ } ${ vals.rgb.b.$ } / 85% )`,

        `rgba( ${ vals.rgb.r.pc }%, ${ vals.rgb.g.pc }%, ${ vals.rgb.b.pc }%, 85% )`,
        `rgba( ${ vals.rgb.r.pc }% ${ vals.rgb.g.pc }% ${ vals.rgb.b.pc }% / 85% )`,

        `rgba( ${ vals.rgb.r.$ }, ${ vals.rgb.g.$ }, ${ vals.rgb.b.$ }, 0.85 )`,
        `rgba( ${ vals.rgb.r.$ } ${ vals.rgb.g.$ } ${ vals.rgb.b.$ } / 0.85 )`,

        `rgba( ${ vals.rgb.r.pc }%, ${ vals.rgb.g.pc }%, ${ vals.rgb.b.pc }%, 0.85 )`,
        `rgba( ${ vals.rgb.r.pc }% ${ vals.rgb.g.pc }% ${ vals.rgb.b.pc }% / 0.85 )`,
    ] ),
};
