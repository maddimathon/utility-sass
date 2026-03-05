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
    const arrays: {
        readonly keywords: readonly ["currentColor", "inherit", "transparent"];
        readonly slugs: readonly ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
        readonly systemColors: readonly ["AccentColor", "AccentColorText", "ActiveText", "ButtonBorder", "ButtonFace", "ButtonText", "Canvas", "CanvasText", "Field", "FieldText", "GrayText", "Highlight", "HighlightText", "LinkText", "Mark", "MarkText", "SelectedItem", "SelectedItemText", "VisitedText"];
    };
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
     * Whether this is one of the keywords in {@link CssColours.Keyword}.
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isKeyword<T_Value>(value: T_Value): value is T_Value & Keyword;
    /**
     * Whether this is one of the slugs in {@link CssColours.Slug}.
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isSlug<T_Value>(value: T_Value): value is T_Value & Slug;
    /**
     * Whether this is one of the system colors in {@link CssColours.SystemColor}.
     *
     * @since 0.1.0-beta.0.draft
     */
    export function isSystemColor<T_Value>(value: T_Value): value is T_Value & SystemColor;
    export {};
}
//# sourceMappingURL=CssColours.d.ts.map