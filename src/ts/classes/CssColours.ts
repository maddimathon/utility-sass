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
    const keywords = new Set( arrays.keywords );

    /**
     * @since ___PKG_VERSION___
     */
    const slugs = new Set( arrays.slugs );

    /**
     * @since ___PKG_VERSION___
     */
    const systemColors = new Set( arrays.systemColors );

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
     * Whether this is one of the keywords in {@link CssColours.Keyword}.
     *
     * @since ___PKG_VERSION___
     */
    export function isKeyword<T_Value>( value: T_Value ): value is T_Value & Keyword {
        return keywords.has( value as Keyword );
    }

    /**
     * Whether this is one of the slugs in {@link CssColours.Slug}.
     *
     * @since ___PKG_VERSION___
     */
    export function isSlug<T_Value>( value: T_Value ): value is T_Value & Slug {
        return slugs.has( value as Slug );
    }

    /**
     * Whether this is one of the system colors in {@link CssColours.SystemColor}.
     *
     * @since ___PKG_VERSION___
     */
    export function isSystemColor<T_Value>( value: T_Value ): value is T_Value & SystemColor {
        return systemColors.has( value as SystemColor );
    }
}