/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
/**
 * Utilities for css colour values.
 *
 * @category Utilities
 *
 * @since 0.1.0-beta.0.draft
 */
export var CssColours;
(function (CssColours) {
    /**
     * Whether the given string matches regexes for css colour functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    function isCssColourFunction(value) {
        return !!parseCssColourFunction(value);
    }
    CssColours.isCssColourFunction = isCssColourFunction;
    /**
     * Whether the given string matches regexes for css colour functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    function parseCssColourFunction(value, roundingFactor = 1000000000) {
        const hexMatches = value.match(/^\s*#([0-9|A-H]{1,2})([0-9|A-H]{1,2})([0-9|A-H]{1,2})\s*$/i);
        // returns
        if (hexMatches) {
            // returns
            if (hexMatches[1] && hexMatches[2] && hexMatches[3]) {
                return {
                    space: 'hex',
                    r: Number(hexMatches[1]),
                    g: Number(hexMatches[2]),
                    b: Number(hexMatches[3]),
                };
            }
            return false;
        }
        const hslMatches = value.match(/^\s*hsl\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)%?\s*[,\s]\s*([\d\.]+)%?\s*\)\s*$/i);
        // returns
        if (hslMatches) {
            // returns
            if (hslMatches[1] && hslMatches[2] && hslMatches[3]) {
                return {
                    space: 'hsl',
                    h: Math.round(Number(hslMatches[1]) * roundingFactor) / roundingFactor,
                    s: Math.round(Number(hslMatches[2]) * roundingFactor) / roundingFactor,
                    l: Math.round(Number(hslMatches[3]) * roundingFactor) / roundingFactor,
                };
            }
            return false;
        }
        const hwbMatches = value.match(/^\s*hwb\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)%?\s*[,\s]\s*([\d\.]+)%?\s*\)\s*$/i);
        // returns
        if (hwbMatches) {
            // returns
            if (hwbMatches[1] && hwbMatches[2] && hwbMatches[3]) {
                return {
                    space: 'hwb',
                    h: Math.round(Number(hwbMatches[1]) * roundingFactor) / roundingFactor,
                    w: Math.round(Number(hwbMatches[2]) * roundingFactor) / roundingFactor,
                    b: Math.round(Number(hwbMatches[3]) * roundingFactor) / roundingFactor,
                };
            }
            return false;
        }
        const rgbMatches = value.match(/^\s*rgb\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*\)\s*$/i);
        // returns
        if (rgbMatches) {
            // returns
            if (rgbMatches[1] && rgbMatches[2] && rgbMatches[3]) {
                return {
                    space: 'rgb',
                    r: Math.round(Number(rgbMatches[1]) * roundingFactor) / roundingFactor,
                    g: Math.round(Number(rgbMatches[2]) * roundingFactor) / roundingFactor,
                    b: Math.round(Number(rgbMatches[3]) * roundingFactor) / roundingFactor,
                };
            }
            return false;
        }
        const miscMatches = value.match(/^\s*((?:ok)?l(?:ch|ab))\(\s*[\d\.]+%?\s+\s*[\d\.]+\s+\s*[\d\.]+(?:deg)?\s*\)\s*$/i);
        // returns
        if (miscMatches) {
            // returns on space match
            if (miscMatches[1] && miscMatches[2] && miscMatches[3] && miscMatches[4]) {
                // returns on match
                switch (miscMatches[1]) {
                    case 'lab':
                    case 'oklab':
                        return {
                            space: miscMatches[1],
                            l: Math.round(Number(miscMatches[2]) * roundingFactor) / roundingFactor,
                            a: Math.round(Number(miscMatches[3]) * roundingFactor) / roundingFactor,
                            b: Math.round(Number(miscMatches[4]) * roundingFactor) / roundingFactor,
                        };
                    case 'lch':
                    case 'oklch':
                        return {
                            space: miscMatches[1],
                            l: Math.round(Number(miscMatches[2]) * roundingFactor) / roundingFactor,
                            c: Math.round(Number(miscMatches[3]) * roundingFactor) / roundingFactor,
                            h: Math.round(Number(miscMatches[4]) * roundingFactor) / roundingFactor,
                        };
                }
            }
            return false;
        }
        return false;
    }
    CssColours.parseCssColourFunction = parseCssColourFunction;
    /**
     * @since 0.1.0-beta.0.draft
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
    };
    /**
     * @since 0.1.0-beta.0.draft
     */
    CssColours.keywords = new Set(arrays.keywords);
    /**
     * @since 0.1.0-beta.0.draft
     */
    CssColours.slugs = new Set(arrays.slugs);
    /**
     * @since 0.1.0-beta.0.draft
     */
    CssColours.systemColors = new Set(arrays.systemColors);
    /**
     * Whether this is one of the keywords in {@link CssColours.Keyword} (i.e.,
     * valid css <color> values but that do not represent a specific colour
     * [e.g., 'transparent']).
     *
     * @since 0.1.0-beta.0.draft
     */
    function isKeyword(value) {
        return CssColours.keywords.has(value);
    }
    CssColours.isKeyword = isKeyword;
    /**
     * Whether this is one of the keywords in {@link CssColours.Slug} (i.e.,
     * keywords used for defined web-safe colours).
     *
     * @since 0.1.0-beta.0.draft
     */
    function isSlug(value) {
        return CssColours.slugs.has(value);
    }
    CssColours.isSlug = isSlug;
    /**
     * Whether this is one of the system colors in
     * {@link CssColours.SystemColor} (i.e., forced-colors mode keywords).
     *
     * @since 0.1.0-beta.0.draft
     */
    function isSystemColor(value) {
        return CssColours.systemColors.has(value);
    }
    CssColours.isSystemColor = isSystemColor;
})(CssColours || (CssColours = {}));
