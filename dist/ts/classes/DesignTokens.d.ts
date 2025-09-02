/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.draft
 * @license MIT
 */
import { AbstractDesignTokens } from './AbstractDesignTokens.js';
/**
 * This is a class that can be used to build tokens that work with the
 * {@link ../../scss/templates/design-tokens/index.docs.md | design tokens}
 * template.
 *
 * The class "exports" by writing the tokens to a JSON or SCSS file.
 *
 * @since 0.1.0-alpha.draft
 */
export declare class DesignTokens<T_AdditionalColourKeys extends string = never> extends AbstractDesignTokens {
    static get DEFAULT(): DesignTokens.Tokens.Default;
    static completeShadeMap(part: Partial<DesignTokens.ShadeMap>): DesignTokens.ShadeMap;
    protected static generateColours<T_AdditionalKeys extends string = never>(part?: DesignTokens.Input.Colours<T_AdditionalKeys>): DesignTokens.Tokens.Colours<T_AdditionalKeys>;
    static mixColours(clrA: DesignTokens.Colour, clrB: DesignTokens.Colour): DesignTokens.Colour;
    readonly colours: DesignTokens.Tokens.Colours<T_AdditionalColourKeys>;
    constructor(part?: DesignTokens.Input<T_AdditionalColourKeys>);
    toJSON(): DesignTokens.Tokens<T_AdditionalColourKeys>;
    toVars(): {
        colours: DesignTokens.Tokens.Colours<T_AdditionalColourKeys>;
    };
    toSCSS(): {
        [K in keyof DesignTokens.Tokens<T_AdditionalColourKeys>]: string;
    };
}
/**
 * Utilities for the {@link DesignTokens} class.
 *
 * @since 0.1.0-alpha.draft
 */
export declare namespace DesignTokens {
    type HexCode = `#${string}`;
    /**
     * Valid ways to pass a colour value.
     *
     * @since 0.1.0-alpha.draft
     */
    export type Colour = HexCode | {
        h: number;
        s: number;
        l: number;
    } | {
        l: number;
        c: number;
        h: number;
    } | {
        r: number;
        g: number;
        b: number;
    };
    /**
     * Font-weight derived level names used throughout the system.
     *
     * @since 0.1.0-alpha.draft
     */
    export type Level = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    /**
     * Define shades of the same colour.
     *
     * @since 0.1.0-alpha.draft
     * @interface
     */
    export type ShadeMap = {
        [L in Level]: Colour;
    };
    /**
     * Defines the shape of the constructor param.
     *
     * @since 0.1.0-alpha.draft
     */
    export interface Input<T_AdditionalColourKeys extends string = never> {
        colours?: DesignTokens.Input.Colours<T_AdditionalColourKeys>;
    }
    /**
     * Defines the shape of the constructor param.
     *
     * @since 0.1.0-alpha.draft
     */
    export namespace Input {
        /**
         * Colours that can be used thoughout the scss.
         *
         * @since 0.1.0-alpha.draft
         * @interface
         */
        type Colours<T_AdditionalKeys extends string = never> = {
            [K in DesignTokens.Tokens.Colours.Key]?: Partial<ShadeMap>;
        } & {
            [K in T_AdditionalKeys]: Partial<ShadeMap>;
        };
    }
    /**
     * Defines the shape of the complete tokens object.
     *
     * @since 0.1.0-alpha.draft
     */
    export interface Tokens<T_AdditionalColourKeys extends string = never> {
        colours: DesignTokens.Tokens.Colours<T_AdditionalColourKeys>;
        margins?: never;
        brightnessMode_all?: never;
        contrastMode_all?: never;
        brightnessMode_default?: never;
        contrastMode_default?: never;
        font_sizes?: never;
        line_height_base?: never;
        line_heights?: never;
        border_radii?: never;
        border_widths?: never;
        strokes_relative?: never;
        transition_times?: never;
        z_indices?: never;
    }
    /**
     * Defines the shape of the actual token objects.
     *
     * @since 0.1.0-alpha.draft
     */
    export namespace Tokens {
        /**
         * Colours that can be used thoughout the scss.
         *
         * @since 0.1.0-alpha.draft
         * @interface
         */
        type Colours<T_AdditionalKeys extends string = never> = {
            [K in Colours.Key | T_AdditionalKeys]: ShadeMap;
        };
        /**
         * Utilities for the {@link Colours} interface.
         *
         * @since 0.1.0-alpha.draft
         */
        namespace Colours {
            type Key = "base" | "primary" | "secondary" | "active";
        }
        /**
         * Shape of the default tokens object.
         *
         * @since 0.1.0-alpha.draft
         */
        interface Default {
            colours: {
                base: {
                    [L in "100" | "900"]: Colour;
                };
            } & {
                [K in Exclude<DesignTokens.Tokens.Colours.Key, "base">]: {
                    [L in "100" | "500" | "900"]: Colour;
                };
            };
        }
    }
    export {};
}
//# sourceMappingURL=DesignTokens.d.ts.map