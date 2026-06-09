/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import { deleteUndefinedProps, objectMap } from '@maddimathon/utility-typescript';

/**
 * Utilities for css colour values.
 * 
 * @category Utilities
 * 
 * @since ___PKG_VERSION___
 */
export namespace CssColours {

    /**
     * Types that represent CSS colour functions/values.
     * 
     * @since ___PKG_VERSION___
     * 
     * @internal
     * @sortStrategy source-order
     */
    export namespace Functions {

        /**
         * A colour value in the HSL space.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export interface HSL {
            h: number;
            s: number;
            l: number;
            alpha?: number;
        }

        /**
         * A colour value in the HWB space.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export interface HWB {
            h: number;
            w: number;
            b: number;
            alpha?: number;
        }

        /**
         * A colour value in the LAB or OkLAB space.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export interface LAB {
            l: number;
            a: number;
            b: number;
            alpha?: number;
        }

        /**
         * A colour value in the LCH or OkLCH space.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export interface LCH {
            l: number;
            c: number;
            h: number;
            alpha?: number;
        }

        /**
         * A colour value in the RGB space.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export interface RGB {
            r: number;
            g: number;
            b: number;
            alpha?: number;
        }

        /**
         * Any of the input colour values to be parsed via
         * {@link parseFunction}.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @sortStrategy source-order
         */
        export type Input =
            | string
            | All.Input.HSL
            | All.Input.HWB
            | All.Input.LAB
            | All.Input.LCH
            | All.Input.RGB;

        /**
         * Any of the single colour values, parsed via
         * {@link parseFunction}.
         *
         * @since ___PKG_VERSION___
         * 
         * @expand
         * @inline
         * @sortStrategy source-order
         */
        export type Parsed = false
            | All.Parsed.Hex
            | All.Parsed.HSL
            | All.Parsed.HWB
            | All.Parsed.LAB
            | All.Parsed.LCH
            | All.Parsed.OKLAB
            | All.Parsed.OKLCH
            | All.Parsed.RGB;

        /**
         * @since ___PKG_VERSION___
         * 
         * @internal
         */
        export namespace All {

            /**
             * All of the single colour values.
             *
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @inline
             * @sortStrategy source-order
             */
            export interface Input {
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
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace Input {
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface HSL extends Functions.HSL { }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface HWB extends Functions.HWB { }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface LAB extends Functions.LAB { }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface LCH extends Functions.LCH { }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface RGB extends Functions.RGB { }
            }

            /**
             * All of the single colour values, parsed via
             * {@link parseFunction}.
             *
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @inline
             * @sortStrategy source-order
             */
            export interface Parsed {
                hex: Parsed.Hex;
                hsl: Parsed.HSL;
                hwb: Parsed.HWB;
                lab: Parsed.LAB;
                lch: Parsed.LCH;
                oklab: Parsed.OKLAB;
                oklch: Parsed.OKLCH;
                rgb: Parsed.RGB;
            };

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace Parsed {
                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface Hex extends Functions.RGB { space: 'hex'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface HSL extends Functions.HSL { space: 'hsl'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface HWB extends Functions.HWB { space: 'hwb'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface LAB extends Functions.LAB { space: 'lab'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface LCH extends Functions.LCH { space: 'lch'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface OKLAB extends Functions.LAB { space: 'oklab'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface OKLCH extends Functions.LCH { space: 'oklch'; }

                /**
                 * @inline
                 * @sortStrategy source-order
                 */
                export interface RGB extends Functions.RGB { space: 'rgb'; }
            }
        }
    }

    /**
     * Regular expressions to use for matching against css colour function
     * strings.
     *
     * @since ___PKG_VERSION___
     *
     * ## Format Examples
     * {@include ./CssColours.docs.md#test-all}
     */
    export namespace Regex {
        // TODO - add tests for the Match functions directly

        const number = '\\d*\\.?\\d+' as const;
        const number_negative: `\\-?${ typeof number }` = `\\-?${ number }` as const;

        /**
         * For Hex strings.
         * 
         * The resulting regex is equivolent to:
         * {@include ./CssColours.docs.md#regex-hex}
         * 
         * @since ___PKG_VERSION___
         */
        export const hex: {
            strict: RegExp;
            flexible: RegExp;
        } = {
            strict: /^\s*#(?:([0-9a-h])([0-9a-h])([0-9a-h])|([0-9a-h]{2})([0-9a-h]{2})([0-9a-h]{2})(\d{2})?)\s*$/i,
            flexible: /^\s*#?(?:([0-9a-h])([0-9a-h])([0-9a-h])|([0-9a-h]{2})([0-9a-h]{2})([0-9a-h]{2})(\d{2})?)\s*$/i,
        };

        export namespace Match {

            /**
             * Match input against the {@link Regex.hex} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             * 
             * @sortStrategy source-order
             */
            export function hex( value: string ): null | Regex.Match.Hex {
                const matches = value.match( Regex.hex.flexible );

                // returns
                if ( !matches || !matches[ 0 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 2 ] && matches[ 3 ] ) {
                    return {
                        matches: [
                            matches[ 0 ],
                            matches[ 1 ],
                            matches[ 2 ],
                            matches[ 3 ],
                        ],

                        groups: {
                            r: matches[ 1 ],
                            g: matches[ 2 ],
                            b: matches[ 3 ],
                        },
                    };
                }

                // returns
                if ( matches[ 4 ] && matches[ 5 ] && matches[ 6 ] ) {
                    return {
                        matches: [
                            matches[ 0 ],
                            matches[ 1 ],
                            matches[ 2 ],
                            matches[ 3 ],
                            matches[ 4 ],
                            matches[ 5 ],
                            matches[ 6 ],
                            matches[ 7 ],
                        ],

                        groups: {
                            r: matches[ 4 ],
                            g: matches[ 5 ],
                            b: matches[ 6 ],
                            alpha: matches[ 7 ],
                        },
                    };
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                    ],
                };
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type Hex =
                | Regex.Match.Hex.Short
                | Regex.Match.Hex.Full
                | Regex.Match.Hex.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace Hex {

                /**
                 * The match result for a full hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        string,
                        string,
                        string,
                        undefined | string,
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
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Short = {
                    readonly matches: readonly [ string, string, string, string ];

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
         * @since ___PKG_VERSION___
         */
        export const hsl: RegExp = new RegExp( [
            '^\\s*hsla?\\(\\s*', // open bracket

            `(${ number_negative }|none)(deg|turn)?`, // hue

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // saturation

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // lightness

            `(?:\\s*[,\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.hsl} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function hsl( value: string ): null | HSL {
                const matches = value.match( Regex.hsl );

                // returns
                if ( !matches || !matches[ 0 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            h: _matches[ 1 ],
                            s: _matches[ 3 ],
                            l: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            h: _matches[ 2 ],
                            s: _matches[ 4 ],
                            l: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type HSL = Regex.Match.HSL.Full | Regex.Match.HSL.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace HSL {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const hwb: RegExp = new RegExp( [
            '^\\s*hwb\\(\\s*', // open bracket

            `(${ number_negative }|none)(deg|turn)?`, // hue

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // saturation

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // lightness

            `(?:\\s*[,\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.hwb} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function hwb( value: string ): null | HWB {
                const matches = value.match( Regex.hwb );

                // returns
                if ( !matches || !matches[ 0 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            h: _matches[ 1 ],
                            w: _matches[ 3 ],
                            b: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            h: _matches[ 2 ],
                            w: _matches[ 4 ],
                            b: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type HWB = Regex.Match.HWB.Full | Regex.Match.HWB.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace HWB {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const lab: RegExp = new RegExp( [
            '^\\s*lab\\(\\s*', // open bracket

            `(${ number }|none)(%)?`, // L

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // A

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // B

            `(?:\\s*[\\s\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.lab} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function lab( value: string ): null | LAB {
                const matches = value.match( Regex.lab );

                // returns
                if ( !matches || !matches[ 0 ] || !matches[ 1 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            l: _matches[ 1 ],
                            a: _matches[ 3 ],
                            b: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            l: _matches[ 2 ],
                            a: _matches[ 4 ],
                            b: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type LAB = Regex.Match.LAB.Full | Regex.Match.LAB.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace LAB {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const oklab: RegExp = new RegExp( [
            '^\\s*oklab\\(\\s*', // open bracket

            `(${ number }|none)(%)?`, // L

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // A

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // B

            `(?:\\s*[\\s\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.oklab} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function oklab( value: string ): null | OKLAB {
                const matches = value.match( Regex.oklab );

                // returns
                if ( !matches || !matches[ 0 ] || !matches[ 1 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            l: _matches[ 1 ],
                            a: _matches[ 3 ],
                            b: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            l: _matches[ 2 ],
                            a: _matches[ 4 ],
                            b: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type OKLAB = Regex.Match.OKLAB.Full | Regex.Match.OKLAB.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace OKLAB {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const lch: RegExp = new RegExp( [
            '^\\s*lch\\(\\s*', // open bracket

            `(${ number }|none)(%)?`, // L

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // C

            '\\s+', // separator

            `(${ number_negative }|none)(%|deg)?`, // H

            `(?:\\s*[\\s\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.lch} regex with c better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function lch( value: string ): null | LCH {
                const matches = value.match( Regex.lch );

                // returns
                if ( !matches || !matches[ 0 ] || !matches[ 1 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            l: _matches[ 1 ],
                            c: _matches[ 3 ],
                            h: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            l: _matches[ 2 ],
                            c: _matches[ 4 ],
                            h: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type LCH = Regex.Match.LCH.Full | Regex.Match.LCH.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace LCH {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const oklch: RegExp = new RegExp( [
            '^\\s*oklch\\(\\s*', // open bracket

            `(${ number }|none)(%)?`, // L

            '\\s+', // separator

            `(${ number_negative }|none)(%)?`, // C

            '\\s+', // separator

            `(${ number_negative }|none)(%|deg)?`, // H

            `(?:\\s*[\\s\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.oklch} regex with c better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function oklch( value: string ): null | OKLCH {
                const matches = value.match( Regex.oklch );

                // returns
                if ( !matches || !matches[ 0 ] || !matches[ 1 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            l: _matches[ 1 ],
                            c: _matches[ 3 ],
                            h: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            l: _matches[ 2 ],
                            c: _matches[ 4 ],
                            h: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type OKLCH = Regex.Match.OKLCH.Full | Regex.Match.OKLCH.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace OKLCH {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
         * @since ___PKG_VERSION___
         */
        export const rgb: RegExp = new RegExp( [
            '^\\s*rgba?\\(\\s*', // open bracket

            `(${ number }|none)(%)?`, // red

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // green

            '\\s*[,\\s]\\s*', // separator

            `(${ number }|none)(%)?`, // blue

            `(?:\\s*[,\\/]\\s*(${ number }|none)(%)?)?`, // alpha

            '\\s*\\)\\s*$', // close bracket
        ].join( '' ), 'i' );

        export namespace Match {

            /**
             * Match input against the {@link Regex.rgb} regex with a better
             * return type.
             * 
             * @since ___PKG_VERSION___
             */
            export function rgb( value: string ): null | RGB {
                const matches = value.match( Regex.rgb );

                // returns
                if ( !matches || !matches[ 0 ] ) {
                    return null;
                }

                // returns
                if ( matches[ 1 ] && matches[ 3 ] && matches[ 5 ] ) {

                    const _matches = [
                        matches[ 0 ],
                        matches[ 1 ] === 'none' ? '0' : matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ] === 'none' ? '0' : matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ] === 'none' ? '0' : matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ] === 'none' ? undefined : matches[ 7 ],
                        matches[ 8 ],
                    ] as const;

                    return {
                        matches: _matches,

                        groups: {
                            r: _matches[ 1 ],
                            g: _matches[ 3 ],
                            b: _matches[ 5 ],
                            alpha: _matches[ 7 ],
                        },

                        units: deleteUndefinedProps( {
                            r: _matches[ 2 ],
                            g: _matches[ 4 ],
                            b: _matches[ 6 ],
                            alpha: _matches[ 8 ],
                        } ),
                    } as const;
                }

                return {
                    matches: [
                        matches[ 0 ],
                        matches[ 1 ],
                        matches[ 2 ],
                        matches[ 3 ],
                        matches[ 4 ],
                        matches[ 5 ],
                        matches[ 6 ],
                        matches[ 7 ],
                        matches[ 8 ],
                    ],
                } as const;
            }

            /**
             * @since ___PKG_VERSION___
             * 
             * @expand
             * @preventInline
             * @sortStrategy source-order
             */
            export type RGB = Regex.Match.RGB.Full | Regex.Match.RGB.Incomplete;

            /**
             * @since ___PKG_VERSION___
             * 
             * @internal
             */
            export namespace RGB {

                /**
                 * The match result for an improperly-formed hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Incomplete = {
                    readonly matches: readonly [
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
                    ];

                    readonly groups?: undefined;
                    readonly units?: undefined;
                };

                /**
                 * The match result for a short hex code.
                 * 
                 * @since ___PKG_VERSION___
                 * 
                 * @expand
                 * @inline
                 * @sortStrategy source-order
                 */
                export type Full = {

                    readonly matches: readonly [
                        string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        string,
                        undefined | string,
                        undefined | string,
                        undefined | string,
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
     * @since ___PKG_VERSION___
     *
     * ## Format Examples
     * {@include ./CssColours.docs.md#test-all}
     */
    export function isFunction( value: string ): boolean {
        return !!parseFunction( value );
    }

    /**
     * Parses a string and returns data for valid CSS colour codes.
     * 
     * @see {@link CssColours.Regex} — Has the regexes used for parsing colour codes.
     * 
     * @since ___PKG_VERSION___
     * 
     * @useDeclaredType
     * 
     * ## Format Examples
     * These are the strings used for testing this function.
     * 
     * {@include ./CssColours.docs.md#parseFunction}
     */
    export function parseFunction(
        value: string,
        roundingFactor?: number | undefined,
    ): Functions.Parsed {

        const hex = parseFunction.hex( value );

        // returns
        if ( hex !== false ) {
            return hex ?? false;
        }

        const hsl = parseFunction.hsl( value, roundingFactor );

        // returns
        if ( hsl !== false ) {
            return hsl ?? false;
        }

        const rgb = parseFunction.rgb( value, roundingFactor );

        // returns
        if ( rgb !== false ) {
            return rgb ?? false;
        }

        const lch = parseFunction.lch( value, roundingFactor );

        // returns
        if ( lch !== false ) {
            return lch ?? false;
        }

        const oklch = parseFunction.oklch( value, roundingFactor );

        // returns
        if ( oklch !== false ) {
            return oklch ?? false;
        }

        const hwb = parseFunction.hwb( value, roundingFactor );

        // returns
        if ( hwb !== false ) {
            return hwb ?? false;
        }

        const lab = parseFunction.lab( value, roundingFactor );

        // returns
        if ( lab !== false ) {
            return lab ?? false;
        }

        const oklab = parseFunction.oklab( value, roundingFactor );

        // returns
        if ( oklab !== false ) {
            return oklab ?? false;
        }

        return false;
    }

    /**
     * Utilities for the {@link parseFunction} function.
     * 
     * @since ___PKG_VERSION___
     */
    export namespace parseFunction {

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function hex(
            value: string,
        ): false | null | Functions.All.Parsed.Hex {
            const hexMatches = Regex.Match.hex( value );

            // returns
            if ( !hexMatches?.matches ) {
                return false;
            }

            const { groups } = hexMatches;

            // returns
            if ( !groups ) {
                return null;
            }

            const numbers: {
                r: number;
                g: number;
                b: number;
                alpha: undefined | number;
            } = {
                r: Number( `0x${ groups.r.length > 1 ? groups.r : groups.r.repeat( 2 ) }` ),
                g: Number( `0x${ groups.g.length > 1 ? groups.g : groups.g.repeat( 2 ) }` ),
                b: Number( `0x${ groups.b.length > 1 ? groups.b : groups.b.repeat( 2 ) }` ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.r ) || Number.isNaN( numbers.g ) || Number.isNaN( numbers.b ) ) {
                return null;
            }

            const parsed: {
                r: number;
                g: number;
                b: number;
                alpha?: number;
            } = {
                r: numbers.r,
                g: numbers.g,
                b: numbers.b,
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = numbers.alpha;
            }

            return { space: 'hex', ...parsed };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function hsl(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.HSL {
            const hslMatches = Regex.Match.hsl( value );

            // returns
            if ( !hslMatches?.matches ) {
                return false;
            }

            // returns
            if ( !hslMatches.groups ) {
                return null;
            }

            const { groups, units } = hslMatches;

            const numbers: {
                h: number;
                s: number;
                l: number;
                alpha: undefined | number;
            } = {
                h: Number( groups.h ),
                s: Number( groups.s ),
                l: Number( groups.l ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.h ) || Number.isNaN( numbers.s ) || Number.isNaN( numbers.l ) ) {
                return null;
            }

            const parsed: {
                h: number;
                s: number;
                l: number;
                alpha?: number;
            } = {
                h: units.h === 'turn' ? ( numbers.h * 360 ) : numbers.h,
                s: units.s ? numbers.s : ( numbers.s * 100 ),
                l: units.l ? numbers.l : ( numbers.l * 100 ),
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }

            roundingFactor = roundingFactor ?? 1000;

            return {
                space: 'hsl',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function hwb(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.HWB {
            const hwbMatches = Regex.Match.hwb( value );

            // returns
            if ( !hwbMatches?.matches ) {
                return false;
            }

            // returns
            if ( !hwbMatches.groups ) {
                return null;
            }

            const { groups, units } = hwbMatches;

            const numbers: {
                h: number;
                w: number;
                b: number;
                alpha: undefined | number;
            } = {
                h: Number( groups.h ),
                w: Number( groups.w ),
                b: Number( groups.b ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.h ) || Number.isNaN( numbers.w ) || Number.isNaN( numbers.b ) ) {
                return null;
            }

            const parsed: {
                h: number;
                w: number;
                b: number;
                alpha?: number;
            } = {
                h: units.h === 'turn' ? ( numbers.h * 360 ) : numbers.h,
                w: units.w ? numbers.w : ( numbers.w * 100 ),
                b: units.b ? numbers.b : ( numbers.b * 100 ),
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }

            roundingFactor = roundingFactor ?? 1000;

            return {
                space: 'hwb',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function lab(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.LAB {
            const labMatches = Regex.Match.lab( value );

            // returns
            if ( !labMatches?.matches ) {
                return false;
            }

            // returns
            if ( !labMatches.groups ) {
                return null;
            }

            const { groups, units } = labMatches;

            const numbers: {
                l: number;
                a: number;
                b: number;
                alpha: undefined | number;
            } = {
                l: Number( groups.l ),
                a: Number( groups.a ),
                b: Number( groups.b ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.l ) || Number.isNaN( numbers.a ) || Number.isNaN( numbers.b ) ) {
                return null;
            }

            const parsed: {
                l: number;
                a: number;
                b: number;
                alpha?: number;
            } = {
                l: numbers.l,
                a: units.a === '%' ? ( numbers.a * 125 ) : numbers.a,
                b: units.b === '%' ? ( numbers.b * 125 ) : numbers.b,
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha ? numbers.alpha : ( numbers.alpha * 100 );
            }

            roundingFactor = roundingFactor ?? 1000;

            return {
                space: 'lab',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function oklab(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.OKLAB {
            const oklabMatches = Regex.Match.oklab( value );

            // returns
            if ( !oklabMatches?.matches ) {
                return false;
            }

            // returns
            if ( !oklabMatches.groups ) {
                return null;
            }

            const { groups, units } = oklabMatches;

            const numbers: {
                l: number;
                a: number;
                b: number;
                alpha: undefined | number;
            } = {
                l: Number( groups.l ),
                a: Number( groups.a ),
                b: Number( groups.b ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.l ) || Number.isNaN( numbers.a ) || Number.isNaN( numbers.b ) ) {
                return null;
            }

            const parsed: {
                l: number;
                a: number;
                b: number;
                alpha?: number;
            } = {
                l: units.l === '%' ? ( numbers.l / 100 ) : numbers.l,
                a: units.a === '%' ? ( numbers.a * 0.4 ) : numbers.a,
                b: units.b === '%' ? ( numbers.b * 0.4 ) : numbers.b,
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha === '%' ? ( numbers.alpha / 100 ) : numbers.alpha;
            }

            roundingFactor = roundingFactor ?? 1000000000;

            return {
                space: 'oklab',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function lch(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.LCH {
            const lchMatches = Regex.Match.lch( value );

            // returns
            if ( !lchMatches?.matches ) {
                return false;
            }

            // returns
            if ( !lchMatches.groups ) {
                return null;
            }

            const { groups, units } = lchMatches;

            const numbers: {
                l: number;
                c: number;
                h: number;
                alpha: undefined | number;
            } = {
                l: Number( groups.l ),
                c: Number( groups.c ),
                h: Number( groups.h ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.l ) || Number.isNaN( numbers.c ) || Number.isNaN( numbers.h ) ) {
                return null;
            }

            const parsed: {
                l: number;
                c: number;
                h: number;
                alpha?: number;
            } = {
                l: numbers.l,
                c: units.c === '%' ? ( numbers.c * 150 ) : numbers.c,
                h: units.h === '%' ? ( numbers.h * 360 ) : numbers.h,
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha ? numbers.alpha : ( numbers.alpha * 100 );
            }

            roundingFactor = roundingFactor ?? 1000;

            return {
                space: 'lch',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function oklch(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.OKLCH {
            const oklchMatches = Regex.Match.oklch( value );

            // returns
            if ( !oklchMatches?.matches ) {
                return false;
            }

            // returns
            if ( !oklchMatches.groups ) {
                return null;
            }

            const { groups, units } = oklchMatches;

            const numbers: {
                l: number;
                c: number;
                h: number;
                alpha: undefined | number;
            } = {
                l: Number( groups.l ),
                c: Number( groups.c ),
                h: Number( groups.h ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.l ) || Number.isNaN( numbers.c ) || Number.isNaN( numbers.h ) ) {
                return null;
            }

            const parsed: {
                l: number;
                c: number;
                h: number;
                alpha?: number;
            } = {
                l: units.l === '%' ? ( numbers.l / 100 ) : numbers.l,
                c: units.c === '%' ? ( numbers.c * 0.4 ) : numbers.c,

                h: Math.round(
                    ( units.h === '%' ? ( numbers.h * 360 ) : numbers.h ) * ( roundingFactor ?? 1000 )
                ) / ( roundingFactor ?? 1000 ),
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha === '%' ? ( numbers.alpha / 100 ) : numbers.alpha;
            }

            roundingFactor = roundingFactor ?? 1000000000;

            return {
                space: 'oklch',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }

        /**
         * @return  False means no match. Null means that it matched the regex
         *          as a whole but something in the parts was malformed.
         * 
         * @since ___PKG_VERSION___
         */
        export function rgb(
            value: string,
            roundingFactor?: number | undefined,
        ): false | null | Functions.All.Parsed.RGB {
            const rgbMatches = Regex.Match.rgb( value );

            // returns
            if ( !rgbMatches?.matches ) {
                return false;
            }

            // returns
            if ( !rgbMatches.groups ) {
                return null;
            }

            const { groups, units } = rgbMatches;

            const numbers: {
                r: number;
                g: number;
                b: number;
                alpha: undefined | number;
            } = {
                r: Number( groups.r ),
                g: Number( groups.g ),
                b: Number( groups.b ),
                alpha: groups.alpha ? Number( groups.alpha ) : undefined,
            };

            // returns
            if ( Number.isNaN( numbers.r ) || Number.isNaN( numbers.g ) || Number.isNaN( numbers.b ) ) {
                return null;
            }

            const parsed: {
                r: number;
                g: number;
                b: number;
                alpha?: number;
            } = {
                r: units.r === '%' ? ( ( numbers.r * 255 ) / 100 ) : numbers.r,
                g: units.g === '%' ? ( ( numbers.g * 255 ) / 100 ) : numbers.g,
                b: units.b === '%' ? ( ( numbers.b * 255 ) / 100 ) : numbers.b,
            };

            if ( typeof numbers.alpha === 'number' && !Number.isNaN( numbers.alpha ) ) {
                parsed.alpha = units.alpha ? numbers.alpha : numbers.alpha * 100;
            }

            roundingFactor = roundingFactor ?? 1000;

            return {
                space: 'rgb',
                ...objectMap(
                    parsed,
                    ( entry ) => typeof entry[ 1 ] === 'number'
                        ? Math.round( entry[ 1 ] * roundingFactor ) / roundingFactor
                        : entry[ 1 ],
                ) as typeof parsed,
            };
        }
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
     * A set used to check if a string is a {@link Keyword} type.
     * 
     * @since ___PKG_VERSION___
     */
    export const keywords: Set<Keyword> = new Set( arrays.keywords );

    /**
     * A set used to check if a string is a {@link Slug} type.
     * 
     * @since ___PKG_VERSION___
     */
    export const slugs: Set<Slug> = new Set( arrays.slugs );

    /**
     * A set used to check if a string is a {@link SystemColor} type.
     * 
     * @since ___PKG_VERSION___
     */
    export const systemColors: Set<SystemColor> = new Set( arrays.systemColors );

    /**
     * These are the keywords used to reference other colour values.
     *
     * For slugs representing web-safe colours, see {@link CssColours.slugs}.
     *
     * @since ___PKG_VERSION___
     *
     * @expand
     * @useDeclaredType
     */
    export type Keyword = typeof arrays.keywords[ number ];

    /**
     * These are the keywords used for defined web-safe colours.
     *
     * @since ___PKG_VERSION___
     * 
     * @expand
     * @useDeclaredType
     */
    export type Slug = typeof arrays.slugs[ number ];

    /**
     * System colour keywords, e.g., to use for forced-colors modes.
     * 
     * @since ___PKG_VERSION___
     * 
     * @expand
     * @useDeclaredType
     */
    export type SystemColor = typeof arrays.systemColors[ number ];

    /**
     * This override has proper typing for always true values.
     */
    export function isKeyword<T_Value extends Keyword>( value: T_Value ): true;

    /**
     * This override has proper typing for string literals.
     */
    export function isKeyword<T_Value extends string>( value: T_Value ): value is Keyword & T_Value;

    /**
     * This override allows for any inputs.
     */
    export function isKeyword<T_Value>( value: T_Value ): value is Extract<T_Value, Keyword>;

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
     * This override has proper typing for always true values.
     */
    export function isSlug<T_Value extends Slug>( value: T_Value ): true;

    /**
     * This override has proper typing for string literals.
     */
    export function isSlug<T_Value extends string>( value: T_Value ): value is Slug & T_Value;

    /**
     * This override allows for any inputs.
     */
    export function isSlug<T_Value>( value: T_Value ): value is Extract<T_Value, Slug>;

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
     * This override has proper typing for always true values.
     */
    export function isSystemColor<T_Value extends SystemColor>( value: T_Value ): true;

    /**
     * This override has proper typing for string literals.
     */
    export function isSystemColor<T_Value extends string>( value: T_Value ): value is SystemColor & T_Value;

    /**
     * This override allows for any inputs.
     */
    export function isSystemColor<T_Value>( value: T_Value ): value is Extract<T_Value, SystemColor>;

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