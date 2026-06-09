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
     * Types that represent CSS colour functions/values.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @internal
     * @sortStrategy source-order
     */
    export namespace Functions {
        /**
         * A colour value in the HSL space.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        interface HSL {
            h: number;
            s: number;
            l: number;
            alpha?: number;
        }
        /**
         * A colour value in the HWB space.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        interface HWB {
            h: number;
            w: number;
            b: number;
            alpha?: number;
        }
        /**
         * A colour value in the LAB or OkLAB space.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        interface LAB {
            l: number;
            a: number;
            b: number;
            alpha?: number;
        }
        /**
         * A colour value in the LCH or OkLCH space.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        interface LCH {
            l: number;
            c: number;
            h: number;
            alpha?: number;
        }
        /**
         * A colour value in the RGB space.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        interface RGB {
            r: number;
            g: number;
            b: number;
            alpha?: number;
        }
        /**
         * Any of the input colour values to be parsed via
         * {@link parseFunction}.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @sortStrategy source-order
         */
        type Input = string | All.Input.HSL | All.Input.HWB | All.Input.LAB | All.Input.LCH | All.Input.RGB;
        /**
         * Any of the single colour values, parsed via
         * {@link parseFunction}.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @expand
         * @inline
         * @sortStrategy source-order
         */
        type Parsed = false | All.Parsed.Hex | All.Parsed.HSL | All.Parsed.HWB | All.Parsed.LAB | All.Parsed.LCH | All.Parsed.OKLAB | All.Parsed.OKLCH | All.Parsed.RGB;
        /**
         * @since 0.1.0-beta.0.draft
         *
         * @internal
         */
        namespace All {
            /**
             * All of the single colour values.
             *
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @inline
             * @sortStrategy source-order
             */
            interface Input {
                hex: string;
                hsl: Input.HSL;
                hwb: Input.HWB;
                lab: Input.LAB;
                lch: Input.LCH;
                oklab: Input.LAB;
                oklch: Input.LCH;
                rgb: Input.RGB;
            }
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace Input {
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface HSL extends Functions.HSL {
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface HWB extends Functions.HWB {
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface LAB extends Functions.LAB {
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface LCH extends Functions.LCH {
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface RGB extends Functions.RGB {
                }
            }
            /**
             * All of the single colour values, parsed via
             * {@link parseFunction}.
             *
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @inline
             * @sortStrategy source-order
             */
            interface Parsed {
                hex: Parsed.Hex;
                hsl: Parsed.HSL;
                hwb: Parsed.HWB;
                lab: Parsed.LAB;
                lch: Parsed.LCH;
                oklab: Parsed.OKLAB;
                oklch: Parsed.OKLCH;
                rgb: Parsed.RGB;
            }
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace Parsed {
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface Hex extends Functions.RGB {
                    space: 'hex';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface HSL extends Functions.HSL {
                    space: 'hsl';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface HWB extends Functions.HWB {
                    space: 'hwb';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface LAB extends Functions.LAB {
                    space: 'lab';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface LCH extends Functions.LCH {
                    space: 'lch';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface OKLAB extends Functions.LAB {
                    space: 'oklab';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface OKLCH extends Functions.LCH {
                    space: 'oklch';
                }
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                interface RGB extends Functions.RGB {
                    space: 'rgb';
                }
            }
        }
    }
    /**
     * Regular expressions to use for matching against css colour function
     * strings.
     *
     * @since 0.1.0-beta.0.draft
     *
     * ## Format Examples
     * {@include ./CssColours.docs.md#test-all}
     */
    export namespace Regex {
        /**
         * For Hex strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hex}
         *
         * @since 0.1.0-beta.0.draft
         */
        const hex: {
            strict: RegExp;
            flexible: RegExp;
        };
        namespace Match {
            /**
             * Match input against the {@link Regex.hex} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             *
             * @sortStrategy source-order
             */
            function hex(value: string, strict?: boolean): null | Regex.Match.Hex;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type Hex = Regex.Match.Hex.Short | Regex.Match.Hex.Full | Regex.Match.Hex.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace Hex {
                /**
                 * The match result for a full hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        string,
                        string,
                        string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly r: string;
                        readonly g: string;
                        readonly b: string;
                        readonly alpha: undefined | string;
                    };
                };
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Short = {
                    readonly matches: readonly [string, string, string, string];
                    readonly groups: {
                        readonly r: string;
                        readonly g: string;
                        readonly b: string;
                        readonly alpha?: undefined;
                    };
                };
            }
        }
        /**
         * For HSL strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hsl}
         *
         * @since 0.1.0-beta.0.draft
         */
        const hsl: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.hsl} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function hsl(value: string): null | HSL;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type HSL = Regex.Match.HSL.Full | Regex.Match.HSL.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace HSL {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly h: string;
                        readonly s: string;
                        readonly l: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly h?: string;
                        readonly s?: string;
                        readonly l?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For HWB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hwb}
         *
         * @since 0.1.0-beta.0.draft
         */
        const hwb: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.hwb} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function hwb(value: string): null | HWB;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type HWB = Regex.Match.HWB.Full | Regex.Match.HWB.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace HWB {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly h: string;
                        readonly w: string;
                        readonly b: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly h?: string;
                        readonly w?: string;
                        readonly b?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For LAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-lab}
         *
         * @since 0.1.0-beta.0.draft
         */
        const lab: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.lab} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function lab(value: string): null | LAB;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type LAB = Regex.Match.LAB.Full | Regex.Match.LAB.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace LAB {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly l: string;
                        readonly a: string;
                        readonly b: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly l?: string;
                        readonly a?: string;
                        readonly b?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For OkLAB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-oklab}
         *
         * @since 0.1.0-beta.0.draft
         */
        const oklab: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.oklab} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function oklab(value: string): null | OKLAB;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type OKLAB = Regex.Match.OKLAB.Full | Regex.Match.OKLAB.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace OKLAB {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly l: string;
                        readonly a: string;
                        readonly b: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly l?: string;
                        readonly a?: string;
                        readonly b?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For LCH strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-lch}
         *
         * @since 0.1.0-beta.0.draft
         */
        const lch: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.lch} regex with c better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function lch(value: string): null | LCH;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type LCH = Regex.Match.LCH.Full | Regex.Match.LCH.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace LCH {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly l: string;
                        readonly c: string;
                        readonly h: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly l?: string;
                        readonly c?: string;
                        readonly h?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For OkLCH strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-oklch}
         *
         * @since 0.1.0-beta.0.draft
         */
        const oklch: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.oklch} regex with c better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function oklch(value: string): null | OKLCH;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type OKLCH = Regex.Match.OKLCH.Full | Regex.Match.OKLCH.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace OKLCH {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly l: string;
                        readonly c: string;
                        readonly h: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly l?: string;
                        readonly c?: string;
                        readonly h?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
        /**
         * For RGB strings.
         *
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-rgb}
         *
         * @since 0.1.0-beta.0.draft
         */
        const rgb: RegExp;
        namespace Match {
            /**
             * Match input against the {@link Regex.rgb} regex with a better
             * return type.
             *
             * @since 0.1.0-beta.0.draft
             */
            function rgb(value: string): null | RGB;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            type RGB = Regex.Match.RGB.Full | Regex.Match.RGB.Incomplete;
            /**
             * @since 0.1.0-beta.0.draft
             *
             * @internal
             */
            namespace RGB {
                /**
                 * The match result for an improperly-formed hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups?: undefined;
                    readonly units?: undefined;
                };
                /**
                 * The match result for a short hex code.
                 *
                 * @since 0.1.0-beta.0.draft
                 *
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                type Full = {
                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string
                    ];
                    readonly groups: {
                        readonly r: string;
                        readonly g: string;
                        readonly b: string;
                        readonly alpha: undefined | string;
                    };
                    readonly units: {
                        readonly r?: string;
                        readonly g?: string;
                        readonly b?: string;
                        readonly alpha?: string;
                    };
                };
            }
        }
    }
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
    export function isFunction(value: string, args?: Parameters<typeof parseFunction>[1]): boolean;
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
    export function parseFunction(value: string, args?: {
        roundingFactor?: number | undefined;
        strict?: boolean;
    }): Functions.Parsed;
    /**
     * Utilities for the {@link parseFunction} function.
     *
     * @since 0.1.0-beta.0.draft
     */
    export namespace parseFunction {
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hex(value: string, strict?: boolean): false | null | Functions.All.Parsed.Hex;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hsl(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.HSL;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function hwb(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.HWB;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function lab(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.LAB;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function oklab(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.OKLAB;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function lch(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.LCH;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function oklch(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.OKLCH;
        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         *
         * @since 0.1.0-beta.0.draft
         */
        function rgb(value: string, roundingFactor?: number | undefined): false | null | Functions.All.Parsed.RGB;
    }
    /**
     * @since 0.1.0-beta.0.draft
     */
    const arrays: {
        readonly keywords: readonly ["currentColor", "inherit", "transparent"];
        readonly slugs: readonly ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
        readonly systemColors: readonly ["AccentColor", "AccentColorText", "ActiveText", "ButtonBorder", "ButtonFace", "ButtonText", "Canvas", "CanvasText", "Field", "FieldText", "GrayText", "Highlight", "HighlightText", "LinkText", "Mark", "MarkText", "SelectedItem", "SelectedItemText", "VisitedText"];
    };
    /**
     * A set used to check if a string is a {@link Keyword} type.
     *
     * @since 0.1.0-beta.0.draft
     */
    export const keywords: Set<Keyword>;
    /**
     * A set used to check if a string is a {@link Slug} type.
     *
     * @since 0.1.0-beta.0.draft
     */
    export const slugs: Set<Slug>;
    /**
     * A set used to check if a string is a {@link SystemColor} type.
     *
     * @since 0.1.0-beta.0.draft
     */
    export const systemColors: Set<SystemColor>;
    /**
     * These are the keywords used to reference other colour values.
     *
     * For slugs representing web-safe colours, see {@link CssColours.slugs}.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @expand
     * @useDeclaredType
     */
    export type Keyword = typeof arrays.keywords[number];
    /**
     * These are the keywords used for defined web-safe colours.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @expand
     * @useDeclaredType
     */
    export type Slug = typeof arrays.slugs[number];
    /**
     * System colour keywords, e.g., to use for forced-colors modes.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @expand
     * @useDeclaredType
     */
    export type SystemColor = typeof arrays.systemColors[number];
    /**
     * This override has proper typing for always true values.
     */
    export function isKeyword<T_Value extends Keyword>(value: T_Value): true;
    /**
     * This override has proper typing for string literals.
     */
    export function isKeyword<T_Value extends string>(value: T_Value): value is Keyword & T_Value;
    /**
     * This override allows for any inputs.
     */
    export function isKeyword<T_Value>(value: T_Value): value is Extract<T_Value, Keyword>;
    /**
     * This override has proper typing for always true values.
     */
    export function isSlug<T_Value extends Slug>(value: T_Value): true;
    /**
     * This override has proper typing for string literals.
     */
    export function isSlug<T_Value extends string>(value: T_Value): value is Slug & T_Value;
    /**
     * This override allows for any inputs.
     */
    export function isSlug<T_Value>(value: T_Value): value is Extract<T_Value, Slug>;
    /**
     * This override has proper typing for always true values.
     */
    export function isSystemColor<T_Value extends SystemColor>(value: T_Value): true;
    /**
     * This override has proper typing for string literals.
     */
    export function isSystemColor<T_Value extends string>(value: T_Value): value is SystemColor & T_Value;
    /**
     * This override allows for any inputs.
     */
    export function isSystemColor<T_Value>(value: T_Value): value is Extract<T_Value, SystemColor>;
    export {};
}
