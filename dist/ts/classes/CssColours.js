/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { deleteUndefinedProps, objectMap } from '@maddimathon/utility-typescript';
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
     * Types that represent CSS colour functions/values.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @internal
     * @sortStrategy source-order
     */
    let Functions;
    (function (Functions) {
        /**
         * @since 0.1.0-beta.0.draft
         *
         * @internal
         */
        let All;
        (function (All) {
            ;
        })(All = Functions.All || (Functions.All = {}));
    })(Functions = CssColours.Functions || (CssColours.Functions = {}));
    /**
     * Regular expressions to use for matching against css colour function
     * strings.
     *
     * @since 0.1.0-beta.0.draft
     *
     * ## Format Examples
     * {@include ./CssColours.docs.md#test-all}
     */
    let Regex;
    (function (Regex) {
        // TODO - add tests for the Match functions directly
        const number = '\\d*\\.?\\d+';
        const number_negative = `\\-?${number}`;
        /**
         * For Hex strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hex}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.hex = {
            strict: /^\s*#(?:([0-9a-h])([0-9a-h])([0-9a-h])|([0-9a-h]{2})([0-9a-h]{2})([0-9a-h]{2})(\d{2})?)\s*$/i,
            flexible: /^\s*#?(?:([0-9a-h])([0-9a-h])([0-9a-h])|([0-9a-h]{2})([0-9a-h]{2})([0-9a-h]{2})(\d{2})?)\s*$/i,
        };
        let Match;
        (function (Match) {
            /**
             * Match input against the {@link Regex.hex} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             *
             * @sortStrategy source-order
             */
            function hex(value) {
                const matches = value.match(Regex.hex.flexible);
                // returns
                if (!matches || !matches[0]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[2] && matches[3]) {
                    return {
                        matches: [
                            matches[0],
                            matches[1],
                            matches[2],
                            matches[3],
                        ],
                        groups: {
                            r: matches[1],
                            g: matches[2],
                            b: matches[3],
                        },
                    };
                }
                // returns
                if (matches[4] && matches[5] && matches[6]) {
                    return {
                        matches: [
                            matches[0],
                            matches[1],
                            matches[2],
                            matches[3],
                            matches[4],
                            matches[5],
                            matches[6],
                            matches[7],
                        ],
                        groups: {
                            r: matches[4],
                            g: matches[5],
                            b: matches[6],
                            alpha: matches[7],
                        },
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                    ],
                };
            }
            Match.hex = hex;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For HSL strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hsl}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.hsl = new RegExp([
            '^\\s*hsla?\\(\\s*', // open bracket
            `(${number_negative}|none)(deg|turn)?`, // hue
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // saturation
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // lightness
            `(?:\\s*[,\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.hsl} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function hsl(value) {
                const matches = value.match(Regex.hsl);
                // returns
                if (!matches || !matches[0]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            h: _matches[1],
                            s: _matches[3],
                            l: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            h: _matches[2],
                            s: _matches[4],
                            l: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.hsl = hsl;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For HWB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hwb}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.hwb = new RegExp([
            '^\\s*hwb\\(\\s*', // open bracket
            `(${number_negative}|none)(deg|turn)?`, // hue
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // saturation
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // lightness
            `(?:\\s*[,\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.hwb} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function hwb(value) {
                const matches = value.match(Regex.hwb);
                // returns
                if (!matches || !matches[0]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            h: _matches[1],
                            w: _matches[3],
                            b: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            h: _matches[2],
                            w: _matches[4],
                            b: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.hwb = hwb;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For LAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-lab}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.lab = new RegExp([
            '^\\s*lab\\(\\s*', // open bracket
            `(${number}|none)(%)?`, // L
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // A
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // B
            `(?:\\s*[\\s\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.lab} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function lab(value) {
                const matches = value.match(Regex.lab);
                // returns
                if (!matches || !matches[0] || !matches[1]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            l: _matches[1],
                            a: _matches[3],
                            b: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            l: _matches[2],
                            a: _matches[4],
                            b: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.lab = lab;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For OkLAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-oklab}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.oklab = new RegExp([
            '^\\s*oklab\\(\\s*', // open bracket
            `(${number}|none)(%)?`, // L
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // A
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // B
            `(?:\\s*[\\s\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.oklab} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function oklab(value) {
                const matches = value.match(Regex.oklab);
                // returns
                if (!matches || !matches[0] || !matches[1]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            l: _matches[1],
                            a: _matches[3],
                            b: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            l: _matches[2],
                            a: _matches[4],
                            b: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.oklab = oklab;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For LAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-lch}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.lch = new RegExp([
            '^\\s*lch\\(\\s*', // open bracket
            `(${number}|none)(%)?`, // L
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // C
            '\\s+', // separator
            `(${number_negative}|none)(%|deg)?`, // H
            `(?:\\s*[\\s\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.lch} regex with c better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function lch(value) {
                const matches = value.match(Regex.lch);
                // returns
                if (!matches || !matches[0] || !matches[1]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            l: _matches[1],
                            c: _matches[3],
                            h: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            l: _matches[2],
                            c: _matches[4],
                            h: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.lch = lch;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For OkLAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-oklch}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.oklch = new RegExp([
            '^\\s*oklch\\(\\s*', // open bracket
            `(${number}|none)(%)?`, // L
            '\\s+', // separator
            `(${number_negative}|none)(%)?`, // C
            '\\s+', // separator
            `(${number_negative}|none)(%|deg)?`, // H
            `(?:\\s*[\\s\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.oklch} regex with c better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function oklch(value) {
                const matches = value.match(Regex.oklch);
                // returns
                if (!matches || !matches[0] || !matches[1]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            l: _matches[1],
                            c: _matches[3],
                            h: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            l: _matches[2],
                            c: _matches[4],
                            h: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.oklch = oklch;
        })(Match = Regex.Match || (Regex.Match = {}));
        /**
         * For RGB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-rgb}
         *
         * @since 0.1.0-beta.0.draft
         */
        Regex.rgb = new RegExp([
            '^\\s*rgba?\\(\\s*', // open bracket
            `(${number}|none)(%)?`, // red
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // green
            '\\s*[,\\s]\\s*', // separator
            `(${number}|none)(%)?`, // blue
            `(?:\\s*[,\\/]\\s*(${number}|none)(%)?)?`, // alpha
            '\\s*\\)\\s*$', // close bracket
        ].join(''), 'i');
        (function (Match) {
            /**
             * Match input against the {@link Regex.rgb} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function rgb(value) {
                const matches = value.match(Regex.rgb);
                // returns
                if (!matches || !matches[0]) {
                    return null;
                }
                // returns
                if (matches[1] && matches[3] && matches[5]) {
                    const _matches = [
                        matches[0],
                        matches[1] === 'none' ? '0' : matches[1],
                        matches[2],
                        matches[3] === 'none' ? '0' : matches[3],
                        matches[4],
                        matches[5] === 'none' ? '0' : matches[5],
                        matches[6],
                        matches[7] === 'none' ? undefined : matches[7],
                        matches[8],
                    ];
                    return {
                        matches: _matches,
                        groups: {
                            r: _matches[1],
                            g: _matches[3],
                            b: _matches[5],
                            alpha: _matches[7],
                        },
                        units: deleteUndefinedProps({
                            r: _matches[2],
                            g: _matches[4],
                            b: _matches[6],
                            alpha: _matches[8],
                        }),
                    };
                }
                return {
                    matches: [
                        matches[0],
                        matches[1],
                        matches[2],
                        matches[3],
                        matches[4],
                        matches[5],
                        matches[6],
                        matches[7],
                        matches[8],
                    ],
                };
            }
            Match.rgb = rgb;
        })(Match = Regex.Match || (Regex.Match = {}));
    })(Regex = CssColours.Regex || (CssColours.Regex = {}));
    /**
     * Whether the given string matches one of the regular expressions in
     * {@link CssColours.Regex} (representing css colour functions).
     *
     * @see {@link CssColours.parseFunction} — Used to check for valid formats.
     *
     * @since 0.1.0-beta.0.draft
     *
     * ## Format Examples
     * {@include ./CssColours.docs.md#test-all}
     */
    function isFunction(value) {
        return !!parseFunction(value);
    }
    CssColours.isFunction = isFunction;
    /**
     * Parses a string and returns data for valid CSS colour codes.
     *
     * @see {@link CssColours.Regex} — Has the regexes used for parsing colour codes.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @useDeclaredType
     *
     * ## Format Examples
     * These are the strings used for testing this function.
     *
     * {@include ./CssColours.docs.md#parseFunction}
     */
    function parseFunction(value, roundingFactor) {
        const hex = parseFunction.hex(value);
        // returns
        if (hex !== false) {
            return hex ?? false;
        }
        const hsl = parseFunction.hsl(value, roundingFactor);
        // returns
        if (hsl !== false) {
            return hsl ?? false;
        }
        const rgb = parseFunction.rgb(value, roundingFactor);
        // returns
        if (rgb !== false) {
            return rgb ?? false;
        }
        const lch = parseFunction.lch(value, roundingFactor);
        // returns
        if (lch !== false) {
            return lch ?? false;
        }
        const oklch = parseFunction.oklch(value, roundingFactor);
        // returns
        if (oklch !== false) {
            return oklch ?? false;
        }
        const hwb = parseFunction.hwb(value, roundingFactor);
        // returns
        if (hwb !== false) {
            return hwb ?? false;
        }
        const lab = parseFunction.lab(value, roundingFactor);
        // returns
        if (lab !== false) {
            return lab ?? false;
        }
        const oklab = parseFunction.oklab(value, roundingFactor);
        // returns
        if (oklab !== false) {
            return oklab ?? false;
        }
        return false;
    }
    CssColours.parseFunction = parseFunction;
    /**
     * Utilities for the {@link parseFunction} function.
     *
     * @since 0.1.0-beta.0.draft
     */
    (function (parseFunction) {
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hex(value) {
            const hexMatches = Regex.Match.hex(value);
            // returns
            if (!hexMatches?.matches) {
                return false;
            }
            const { groups } = hexMatches;
            // returns
            if (!groups) {
                return null;
            }
            const numbers = {
                r: Number(`0x${groups.r.length > 1 ? groups.r : groups.r.repeat(2)}`),
                g: Number(`0x${groups.g.length > 1 ? groups.g : groups.g.repeat(2)}`),
                b: Number(`0x${groups.b.length > 1 ? groups.b : groups.b.repeat(2)}`),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.r) || Number.isNaN(numbers.g) || Number.isNaN(numbers.b)) {
                return null;
            }
            const parsed = {
                r: numbers.r,
                g: numbers.g,
                b: numbers.b,
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = numbers.alpha;
            }
            return { space: 'hex', ...parsed };
        }
        parseFunction.hex = hex;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hsl(value, roundingFactor) {
            const hslMatches = Regex.Match.hsl(value);
            // returns
            if (!hslMatches?.matches) {
                return false;
            }
            // returns
            if (!hslMatches.groups) {
                return null;
            }
            const { groups, units } = hslMatches;
            const numbers = {
                h: Number(groups.h),
                s: Number(groups.s),
                l: Number(groups.l),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.h) || Number.isNaN(numbers.s) || Number.isNaN(numbers.l)) {
                return null;
            }
            const parsed = {
                h: units.h === 'turn' ? (numbers.h * 360) : numbers.h,
                s: units.s ? numbers.s : (numbers.s * 100),
                l: units.l ? numbers.l : (numbers.l * 100),
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }
            roundingFactor = roundingFactor ?? 1000;
            return {
                space: 'hsl',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.hsl = hsl;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hwb(value, roundingFactor) {
            const hwbMatches = Regex.Match.hwb(value);
            // returns
            if (!hwbMatches?.matches) {
                return false;
            }
            // returns
            if (!hwbMatches.groups) {
                return null;
            }
            const { groups, units } = hwbMatches;
            const numbers = {
                h: Number(groups.h),
                w: Number(groups.w),
                b: Number(groups.b),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.h) || Number.isNaN(numbers.w) || Number.isNaN(numbers.b)) {
                return null;
            }
            const parsed = {
                h: units.h === 'turn' ? (numbers.h * 360) : numbers.h,
                w: units.w ? numbers.w : (numbers.w * 100),
                b: units.b ? numbers.b : (numbers.b * 100),
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }
            roundingFactor = roundingFactor ?? 1000;
            return {
                space: 'hwb',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.hwb = hwb;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function lab(value, roundingFactor) {
            const labMatches = Regex.Match.lab(value);
            // returns
            if (!labMatches?.matches) {
                return false;
            }
            // returns
            if (!labMatches.groups) {
                return null;
            }
            const { groups, units } = labMatches;
            const numbers = {
                l: Number(groups.l),
                a: Number(groups.a),
                b: Number(groups.b),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.l) || Number.isNaN(numbers.a) || Number.isNaN(numbers.b)) {
                return null;
            }
            const parsed = {
                l: numbers.l,
                a: units.a === '%' ? (numbers.a * 125) : numbers.a,
                b: units.b === '%' ? (numbers.b * 125) : numbers.b,
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha ? numbers.alpha : (numbers.alpha * 100);
            }
            roundingFactor = roundingFactor ?? 1000;
            return {
                space: 'lab',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.lab = lab;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function oklab(value, roundingFactor) {
            const oklabMatches = Regex.Match.oklab(value);
            // returns
            if (!oklabMatches?.matches) {
                return false;
            }
            // returns
            if (!oklabMatches.groups) {
                return null;
            }
            const { groups, units } = oklabMatches;
            const numbers = {
                l: Number(groups.l),
                a: Number(groups.a),
                b: Number(groups.b),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.l) || Number.isNaN(numbers.a) || Number.isNaN(numbers.b)) {
                return null;
            }
            const parsed = {
                l: units.l === '%' ? (numbers.l / 100) : numbers.l,
                a: units.a === '%' ? (numbers.a * 0.4) : numbers.a,
                b: units.b === '%' ? (numbers.b * 0.4) : numbers.b,
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha === '%' ? (numbers.alpha / 100) : numbers.alpha;
            }
            roundingFactor = roundingFactor ?? 1000000000;
            return {
                space: 'oklab',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.oklab = oklab;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function lch(value, roundingFactor) {
            const lchMatches = Regex.Match.lch(value);
            // returns
            if (!lchMatches?.matches) {
                return false;
            }
            // returns
            if (!lchMatches.groups) {
                return null;
            }
            const { groups, units } = lchMatches;
            const numbers = {
                l: Number(groups.l),
                c: Number(groups.c),
                h: Number(groups.h),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.l) || Number.isNaN(numbers.c) || Number.isNaN(numbers.h)) {
                return null;
            }
            const parsed = {
                l: numbers.l,
                c: units.c === '%' ? (numbers.c * 150) : numbers.c,
                h: units.h === '%' ? (numbers.h * 360) : numbers.h,
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha ? numbers.alpha : (numbers.alpha * 100);
            }
            roundingFactor = roundingFactor ?? 1000;
            return {
                space: 'lch',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.lch = lch;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function oklch(value, roundingFactor) {
            const oklchMatches = Regex.Match.oklch(value);
            // returns
            if (!oklchMatches?.matches) {
                return false;
            }
            // returns
            if (!oklchMatches.groups) {
                return null;
            }
            const { groups, units } = oklchMatches;
            const numbers = {
                l: Number(groups.l),
                c: Number(groups.c),
                h: Number(groups.h),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.l) || Number.isNaN(numbers.c) || Number.isNaN(numbers.h)) {
                return null;
            }
            const parsed = {
                l: units.l === '%' ? (numbers.l / 100) : numbers.l,
                c: units.c === '%' ? (numbers.c * 0.4) : numbers.c,
                h: Math.round((units.h === '%' ? (numbers.h * 360) : numbers.h) * (roundingFactor ?? 1000)) / (roundingFactor ?? 1000),
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha === '%' ? (numbers.alpha / 100) : numbers.alpha;
            }
            roundingFactor = roundingFactor ?? 1000000000;
            return {
                space: 'oklch',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.oklch = oklch;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function rgb(value, roundingFactor) {
            const rgbMatches = Regex.Match.rgb(value);
            // returns
            if (!rgbMatches?.matches) {
                return false;
            }
            // returns
            if (!rgbMatches.groups) {
                return null;
            }
            const { groups, units } = rgbMatches;
            const numbers = {
                r: Number(groups.r),
                g: Number(groups.g),
                b: Number(groups.b),
                alpha: groups.alpha ? Number(groups.alpha) : undefined,
            };
            // returns
            if (Number.isNaN(numbers.r) || Number.isNaN(numbers.g) || Number.isNaN(numbers.b)) {
                return null;
            }
            const parsed = {
                r: units.r === '%' ? ((numbers.r * 255) / 100) : numbers.r,
                g: units.g === '%' ? ((numbers.g * 255) / 100) : numbers.g,
                b: units.b === '%' ? ((numbers.b * 255) / 100) : numbers.b,
            };
            if (typeof numbers.alpha === 'number' && !Number.isNaN(numbers.alpha)) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }
            roundingFactor = roundingFactor ?? 1000;
            return {
                space: 'rgb',
                ...objectMap(parsed, (entry) => typeof entry[1] === 'number'
                    ? Math.round(entry[1] * roundingFactor) / roundingFactor
                    : entry[1]),
            };
        }
        parseFunction.rgb = rgb;
    })(parseFunction = CssColours.parseFunction || (CssColours.parseFunction = {}));
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
     * A set used to check if a string is a {@link Keyword} type.
     *
     * @since 0.1.0-beta.0.draft
     */
    CssColours.keywords = new Set(arrays.keywords);
    /**
     * A set used to check if a string is a {@link Slug} type.
     *
     * @since 0.1.0-beta.0.draft
     */
    CssColours.slugs = new Set(arrays.slugs);
    /**
     * A set used to check if a string is a {@link SystemColor} type.
     *
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
