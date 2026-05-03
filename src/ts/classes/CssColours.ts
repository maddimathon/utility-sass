/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Utilities for css colour values.
 * 
 * @category Utilities
 * 
 * @since ___PKG_VERSION___
 */
export namespace CssColours {

    /**
     * @since ___PKG_VERSION___
     */
    export namespace Functions {
        /**
         * A colour value in the Hex space.
         *
         * @since ___PKG_VERSION___
         */
        export type Hex = string;

        /**
         * A colour value in the HSL space.
         *
         * @since ___PKG_VERSION___
         */
        export type HSL = {
            h: number;
            s: number;
            l: number;
        };

        /**
         * A colour value in the HWB space.
         *
         * @since ___PKG_VERSION___
         */
        export type HWB = {
            h: number;
            w: number;
            b: number;
        };

        /**
         * A colour value in the LAB space.
         *
         * @since ___PKG_VERSION___
         */
        export type LAB = {
            l: number;
            a: number;
            b: number;
        };

        /**
         * A colour value in the LCH space.
         *
         * @since ___PKG_VERSION___
         */
        export type LCH = {
            l: number;
            c: number;
            h: number;
        };

        /**
         * A colour value in the RGB space.
         *
         * @since ___PKG_VERSION___
         */
        export type RGB = {
            r: number;
            g: number;
            b: number;
        };

        /**
         * Any of the single colour values.
         *
         * @since ___PKG_VERSION___
         */
        export type Any =
            | { space: 'hex'; } & RGB
            | { space: 'hsl'; } & HSL
            | { space: 'hwb'; } & HWB
            | { space: 'lab' | 'oklab'; } & LAB
            | { space: 'lch' | 'oklch'; } & LCH
            | { space: 'rgb'; } & RGB;
    }

    /**
     * Whether the given string matches regexes for css colour functions.
     * 
     * @since ___PKG_VERSION___
     */
    export function isCssColourFunction( value: string ): boolean {
        return !!parseCssColourFunction( value );
    }

    /**
     * Whether the given string matches regexes for css colour functions.
     * 
     * @since ___PKG_VERSION___
     */
    export function parseCssColourFunction(
        value: string,
        roundingFactor: number = 1000000000,
    ): false | Functions.Any {

        const hexMatches = value.match( /^\s*#([0-9|A-H]{1,2})([0-9|A-H]{1,2})([0-9|A-H]{1,2})\s*$/i );

        // returns
        if ( hexMatches ) {

            // returns
            if ( hexMatches[ 1 ] && hexMatches[ 2 ] && hexMatches[ 3 ] ) {
                return {
                    space: 'hex',
                    r: Number( hexMatches[ 1 ] ),
                    g: Number( hexMatches[ 2 ] ),
                    b: Number( hexMatches[ 3 ] ),
                };
            }

            return false;
        }

        const hslMatches = value.match( /^\s*hsl\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)%?\s*[,\s]\s*([\d\.]+)%?\s*\)\s*$/i );

        // returns
        if ( hslMatches ) {

            // returns
            if ( hslMatches[ 1 ] && hslMatches[ 2 ] && hslMatches[ 3 ] ) {
                return {
                    space: 'hsl',
                    h: Math.round( Number( hslMatches[ 1 ] ) * roundingFactor ) / roundingFactor,
                    s: Math.round( Number( hslMatches[ 2 ] ) * roundingFactor ) / roundingFactor,
                    l: Math.round( Number( hslMatches[ 3 ] ) * roundingFactor ) / roundingFactor,
                };
            }

            return false;
        }

        const hwbMatches = value.match( /^\s*hwb\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)%?\s*[,\s]\s*([\d\.]+)%?\s*\)\s*$/i );

        // returns
        if ( hwbMatches ) {

            // returns
            if ( hwbMatches[ 1 ] && hwbMatches[ 2 ] && hwbMatches[ 3 ] ) {
                return {
                    space: 'hwb',
                    h: Math.round( Number( hwbMatches[ 1 ] ) * roundingFactor ) / roundingFactor,
                    w: Math.round( Number( hwbMatches[ 2 ] ) * roundingFactor ) / roundingFactor,
                    b: Math.round( Number( hwbMatches[ 3 ] ) * roundingFactor ) / roundingFactor,
                };
            }

            return false;
        }

        const rgbMatches = value.match( /^\s*rgb\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*\)\s*$/i );

        // returns
        if ( rgbMatches ) {

            // returns
            if ( rgbMatches[ 1 ] && rgbMatches[ 2 ] && rgbMatches[ 3 ] ) {
                return {
                    space: 'rgb',
                    r: Math.round( Number( rgbMatches[ 1 ] ) * roundingFactor ) / roundingFactor,
                    g: Math.round( Number( rgbMatches[ 2 ] ) * roundingFactor ) / roundingFactor,
                    b: Math.round( Number( rgbMatches[ 3 ] ) * roundingFactor ) / roundingFactor,
                };
            }

            return false;
        }

        const miscMatches = value.match( /^\s*((?:ok)?l(?:ch|ab))\(\s*[\d\.]+%?\s+\s*[\d\.]+\s+\s*[\d\.]+(?:deg)?\s*\)\s*$/i );

        // returns
        if ( miscMatches ) {

            // returns on space match
            if ( miscMatches[ 1 ] && miscMatches[ 2 ] && miscMatches[ 3 ] && miscMatches[ 4 ] ) {

                // returns on match
                switch ( miscMatches[ 1 ] ) {

                    case 'lab':
                    case 'oklab':
                        return {
                            space: miscMatches[ 1 ],
                            l: Math.round( Number( miscMatches[ 2 ] ) * roundingFactor ) / roundingFactor,
                            a: Math.round( Number( miscMatches[ 3 ] ) * roundingFactor ) / roundingFactor,
                            b: Math.round( Number( miscMatches[ 4 ] ) * roundingFactor ) / roundingFactor,
                        };

                    case 'lch':
                    case 'oklch':
                        return {
                            space: miscMatches[ 1 ],
                            l: Math.round( Number( miscMatches[ 2 ] ) * roundingFactor ) / roundingFactor,
                            c: Math.round( Number( miscMatches[ 3 ] ) * roundingFactor ) / roundingFactor,
                            h: Math.round( Number( miscMatches[ 4 ] ) * roundingFactor ) / roundingFactor,
                        };
                }
            }

            return false;
        }

        return false;
    }

    /**
     * @since ___PKG_VERSION___
     */
    const arrays = {

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

    /**
     * @since ___PKG_VERSION___
     */
    export const keywords: Readonly<Set<string>> = new Set( arrays.keywords );

    /**
     * @since ___PKG_VERSION___
     */
    export const slugs: Readonly<Set<string>> = new Set( arrays.slugs );

    /**
     * @since ___PKG_VERSION___
     */
    export const systemColors: Readonly<Set<string>> = new Set( arrays.systemColors );

    /**
     * These are the keywords used to reference other colour values. For
     * slugs representing web-safe colours, see
     * {@link ColourUtilities.CssColours.slugs}.
     *
     * @since ___PKG_VERSION___
     * 
     * @useDeclaredType
     */
    export type Keyword = typeof arrays.keywords[ number ];

    /**
     * These are the keywords used for defined web-safe colours.
     *
     * @since ___PKG_VERSION___
     * 
     * @useDeclaredType
     */
    export type Slug = typeof arrays.slugs[ number ];

    /**
     * System colour keywords, e.g., to use for forced-colors modes.
     * 
     * @since ___PKG_VERSION___
     * 
     * @useDeclaredType
     */
    export type SystemColor = typeof arrays.systemColors[ number ];

    /**
     * Whether this is one of the keywords in {@link CssColours.Keyword} (i.e.,
     * valid css <color> values but that do not represent a specific colour
     * [e.g., 'transparent']).
     *
     * @since ___PKG_VERSION___
     */
    export function isKeyword<T_Value>( value: T_Value ): value is Extract<T_Value, Keyword> {
        return keywords.has( value as Keyword );
    }

    /**
     * Whether this is one of the keywords in {@link CssColours.Slug} (i.e.,
     * keywords used for defined web-safe colours).
     *
     * @since ___PKG_VERSION___
     */
    export function isSlug<T_Value>( value: T_Value ): value is Extract<T_Value, Slug> {
        return slugs.has( value as Slug );
    }

    /**
     * Whether this is one of the system colors in
     * {@link CssColours.SystemColor} (i.e., forced-colors mode keywords).
     *
     * @since ___PKG_VERSION___
     */
    export function isSystemColor<T_Value>( value: T_Value ): value is Extract<T_Value, SystemColor> {
        return systemColors.has( value as SystemColor );
    }
}