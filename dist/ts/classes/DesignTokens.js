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
import { JsonToScss } from './JsonToScss.js';
/**
 * This is a class that can be used to build tokens that work with the
 * {@link ../../scss/templates/design-tokens/index.docs.md | design tokens}
 * template.
 *
 * The class "exports" by writing the tokens to a JSON or SCSS file.
 *
 * @since 0.1.0-alpha.draft
 */
export class DesignTokens extends AbstractDesignTokens {
    /* # STATIC
     * ====================================================================== */
    static get DEFAULT() {
        const colours = {
            base: {
                '100': { h: 0, s: 0, l: 98 },
                '900': { h: 0, s: 0, l: 2 },
            },
            primary: {
                '100': { h: 281, s: 81, l: 97 },
                '500': { h: 281, s: 50, l: 53 },
                '900': { h: 281, s: 85, l: 2 },
            },
            secondary: {
                '100': { h: 146, s: 72, l: 95 },
                '500': { h: 166, s: 90, l: 29 },
                '900': { h: 166, s: 100, l: 1 },
            },
            active: {
                '100': { h: 350, s: 83, l: 97 },
                '500': { h: 350, s: 49, l: 54 },
                '900': { h: 357, s: 100, l: 2 },
            },
        };
        return { colours };
    }
    static completeShadeMap(part) {
        const inputKeys = Object.keys(part);
        let l_100;
        let l_900;
        let l_200 = null;
        let l_300 = null;
        let l_400 = null;
        let l_600 = null;
        let l_700 = null;
        let l_800 = null;
        /*
         * Making sure the minimum required levels are present.
         */
        if (!inputKeys.length) {
            // we should set the default basics and generate a grey map, then
            l_100 = { h: 0, s: 0, l: 98 };
            l_900 = { h: 0, s: 0, l: 2 };
        }
        else if (!('100' in part) || !('900' in part)) {
            // if these core colours aren't set, we have to generate them or the
            // reset of the system will break
            l_100 = { h: 0, s: 0, l: 98 };
            l_900 = { h: 0, s: 0, l: 2 };
        }
        else {
            // now we can safely assume these exist
            l_100 = part['100'];
            l_900 = part['900'];
        }
        let l_500;
        if (!('500' in part)) {
            // we should merge it from what's available
            l_500 = DesignTokens.mixColours(l_100, l_900);
        }
        else {
            // now we can safely assume this exists
            l_500 = part['500'];
        }
        return {
            '100': l_100,
            // @ts-expect-error
            '200': l_200,
            // @ts-expect-error
            '300': l_300,
            // @ts-expect-error
            '400': l_400,
            '500': l_500,
            // @ts-expect-error
            '600': l_600,
            // @ts-expect-error
            '700': l_700,
            // @ts-expect-error
            '800': l_800,
            '900': l_900,
        };
    }
    static generateColours(part) {
        const def = DesignTokens.DEFAULT;
        const complete = {
            ...def.colours,
            ...(part ?? {}),
        };
        for (const t_key in complete) {
            const _key = t_key;
            complete[_key] = DesignTokens.completeShadeMap(complete[_key]);
        }
        return complete;
    }
    static mixColours(clrA, clrB) {
        return { h: 0, s: 100, l: 50 };
    }
    /* # LOCAL
     * ====================================================================== */
    colours;
    constructor(part = {}) {
        super();
        this.colours = DesignTokens.generateColours(part.colours);
    }
    toJSON() {
        return { colours: this.colours };
    }
    toVars() {
        return { colours: this.colours };
    }
    toSCSS() {
        const json = this.toVars();
        return {
            colours: JsonToScss.convert(json.colours) || '()',
        };
    }
}
/**
 * Utilities for the {@link DesignTokens} class.
 *
 * @since 0.1.0-alpha.draft
 */
(function (DesignTokens) {
    ;
    ;
})(DesignTokens || (DesignTokens = {}));
//# sourceMappingURL=DesignTokens.js.map