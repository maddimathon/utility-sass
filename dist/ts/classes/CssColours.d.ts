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
export declare namespace CssColours {
    /**
     * @since 0.1.0-beta.0.draft
     */
    export namespace Functions {
        /**
         * A colour value in the Hex space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type Hex = string;
        /**
         * A colour value in the HSL space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type HSL = {
            h: number;
            s: number;
            l: number;
        };
        /**
         * A colour value in the HWB space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type HWB = {
            h: number;
            w: number;
            b: number;
        };
        /**
         * A colour value in the LAB space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type LAB = {
            l: number;
            a: number;
            b: number;
        };
        /**
         * A colour value in the LCH space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type LCH = {
            l: number;
            c: number;
            h: number;
        };
        /**
         * A colour value in the RGB space.
         *
         * @since 0.1.0-beta.0.draft
         */
        type RGB = {
            r: number;
            g: number;
            b: number;
        };
        /**
         * Any of the single colour values.
         *
         * @since 0.1.0-beta.0.draft
         */
        type Any = {
            space: 'hex';
        } & RGB | {
            space: 'hsl';
        } & HSL | {
            space: 'hwb';
        } & HWB | {
            space: 'lab' | 'oklab';
        } & LAB | {
            space: 'lch' | 'oklch';
        } & LCH | {
            space: 'rgb';
        } & RGB;
    }
    /**
     * Whether the given string matches regexes for css colour functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isCssColourFunction(value: string): boolean;
    /**
     * Whether the given string matches regexes for css colour functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    export function parseCssColourFunction(value: string, roundingFactor?: number): false | Functions.Any;
    /**
     * @since 0.1.0-beta.0.draft
     */
    const arrays: {
        readonly keywords: readonly ["currentColor", "inherit", "transparent"];
        readonly slugs: readonly ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
        readonly systemColors: readonly ["AccentColor", "AccentColorText", "ActiveText", "ButtonBorder", "ButtonFace", "ButtonText", "Canvas", "CanvasText", "Field", "FieldText", "GrayText", "Highlight", "HighlightText", "LinkText", "Mark", "MarkText", "SelectedItem", "SelectedItemText", "VisitedText"];
    };
    /**
     * @since 0.1.0-beta.0.draft
     */
    export const keywords: Readonly<Set<string>>;
    /**
     * @since 0.1.0-beta.0.draft
     */
    export const slugs: Readonly<Set<string>>;
    /**
     * @since 0.1.0-beta.0.draft
     */
    export const systemColors: Readonly<Set<string>>;
    /**
     * These are the keywords used to reference other colour values. For
     * slugs representing web-safe colours, see
     * {@link ColourUtilities.CssColours.slugs}.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @useDeclaredType
     */
    export type Keyword = typeof arrays.keywords[number];
    /**
     * These are the keywords used for defined web-safe colours.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @useDeclaredType
     */
    export type Slug = typeof arrays.slugs[number];
    /**
     * System colour keywords, e.g., to use for forced-colors modes.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @useDeclaredType
     */
    export type SystemColor = typeof arrays.systemColors[number];
    /**
     * Whether this is one of the keywords in {@link CssColours.Keyword} (i.e.,
     * valid css <color> values but that do not represent a specific colour
     * [e.g., 'transparent']).
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isKeyword<T_Value>(value: T_Value): value is Extract<T_Value, Keyword>;
    /**
     * Whether this is one of the keywords in {@link CssColours.Slug} (i.e.,
     * keywords used for defined web-safe colours).
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isSlug<T_Value>(value: T_Value): value is Extract<T_Value, Slug>;
    /**
     * Whether this is one of the system colors in
     * {@link CssColours.SystemColor} (i.e., forced-colors mode keywords).
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isSystemColor<T_Value>(value: T_Value): value is Extract<T_Value, SystemColor>;
    export {};
}
