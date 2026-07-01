/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
/**
 * Utility class that uses client-side JS to test for JS and CSS feature
 * compaibility. Updates root element class names accordingly.
 *
 * @category Module Support
 *
 * @typeParam T_CustomCheckerSlug  Slugs used for custom feature checkers.
 * @typeParam T_CustomChecker      Shape(s) of the custom feature checkers.
 *
 * @example
 * This class is meant to be used client-side to assess local CSS & JS
 * compatibility.
 *
 * The simplest way to use this class is by importing:
 * ```ts
 * import { FeatureCheck } from '@maddimathon/utility-sass';
 * ```
 *  and running one line:
 * {@includeCode ./FeatureCheck.docs.ts#Simple}
 *
 * If you don’t want simple, the checks can also be customized — this
 * customization can mark some features as never available and add on custom
 * feature checks:
 * {@includeCode ./FeatureCheck.docs.ts#Custom}
 *
 * @since 0.1.0-pre.0
 */
export class FeatureCheck {
    /**
     * Builds a feature-check class name that represents the result of a
     * compatibility test.
     *
     * Overloaded for better (but ott) return typeing.
     *
     * @since 0.1.0-beta.0.draft — Added overloads for better typing. Added optional ignorePrefix param.
     *
     * @experimental
     */
    static getClassName(
    /**
     * Feature slug used to conduct the test.
     */
    featureSlug, 
    /**
     * The version of the class to get. If true, class indicates that the
     * feature is enabled; otherwise, class indicates the feature is
     * unavailable.
     */
    value, 
    /**
     * Whether to exclude the 'js__' prefix. This is only used to set the
     * 'js' and 'no-js' classes.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @inline
     * @internal
     */
    ignorePrefix = featureSlug === 'js') {
        const prefix = ignorePrefix ? '' : 'js__';
        return (value
            ? `${prefix}${featureSlug}`
            : `${prefix}no-${featureSlug}`);
    }
    /**
     * Checks for CSS rule support.
     *
     * @experimental
     */
    static supportsCSS(
    /**
     * A valid test param for the CSS `@supports()` rule.
     */
    supports) {
        return window.CSS && CSS.supports && CSS.supports(supports);
    }
    /* ## Static - Default Values ===================================== */
    /**
     * A list of classes to add to the root element before this script loads and runs. If any tests are booleans instead of functions, those booleans also change the defaults.
     *
     * @typeParam T_CustomChecker  Shape(s) of the custom feature checkers.
     *
     * @experimental
     */
    static DEFAULT_CLASSLIST({ custom } = {}) {
        custom = custom ?? {};
        const _customCheckSlugs = Object.keys(custom);
        const _defaultCheckSlugs = Object.keys(FeatureCheck.DEFAULT_OPTS.checks);
        const customKeys = new Set(_customCheckSlugs);
        const defaultKeys = new Set(_defaultCheckSlugs);
        const classes = [
            FeatureCheck.getClassName('js', false),
        ];
        for (const check of [
            ..._defaultCheckSlugs,
            ..._customCheckSlugs,
        ]) {
            // continues
            if (customKeys.has(check)) {
                const { test } = custom[check];
                classes.push(FeatureCheck.getClassName(check, typeof test === 'boolean' ? test : false));
                continue;
            }
            // continues
            if (defaultKeys.has(check)) {
                classes.push(FeatureCheck.getClassName(check, false));
                continue;
            }
        }
        return classes;
    }
    /**
     * Default value for {@link FeatureCheck.opts}.
     */
    static get DEFAULT_OPTS() {
        const checks = {
            aspectRatio: true,
            atProperty: true,
            backgroundFixed: true,
            calc: true,
            displayContents: true,
            focusWithin: true,
            focusVisible: true,
            hasSelector: true,
            subgrid: true,
            variableFonts: true,
            whereSelector: true,
        };
        return {
            checks,
            custom: {},
            outputResults: false,
        };
    }
    /* PROPERTIES
     * ====================================================================== */
    /**
     * Completed copy of the options.
     *
     * See {@link FeatureCheck.Opts} for details.
     */
    opts;
    /**
     * The root element used for adding and removing feature-check classes.
     *
     * See {@link FeatureCheck.constructor} for details.
     */
    root;
    /**
     * Built from combining {@link FeatureCheck.customCheckSlugs} and the keys
     * of {@link FeatureCheck.opts.checks}.
     *
     * @since 0.1.0-beta.0.draft
     */
    allCheckSlugs;
    /**
     * Built from combining the keys of {@link FeatureCheck.opts.checks}.
     *
     * @since 0.1.0-beta.0.draft
     */
    defaultCheckSlugs;
    /**
     * Checks if the given slug is a default test.
     *
     * @since 0.1.0-beta.0.draft
     */
    isDefaultCheck(slug) {
        return this.defaultCheckSlugs.has(slug);
    }
    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     *
     * @since 0.1.0-beta.0.draft
     */
    customCheckSlugs;
    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     *
     * @since 0.1.0-beta.0.draft
     */
    isCustomCheck(slug) {
        return this.customCheckSlugs.has(slug);
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(
    /**
     * Partial options to override defaults.
     */
    { checks, custom, ...opts } = {}, 
    /**
     * The root element to add feature classes to.
     *
     * @default
     * ```ts
     * document.querySelector( ':root' )
     * ```
     */
    root) {
        const { checks: defaultChecks, ..._defaultOpts } = FeatureCheck.DEFAULT_OPTS;
        const _customCheckSlugs = Object.keys(custom ?? {});
        const _defaultCheckSlugs = Object.keys(defaultChecks);
        this.allCheckSlugs = [
            ..._defaultCheckSlugs,
            ..._customCheckSlugs,
        ];
        this.customCheckSlugs = new Set(_customCheckSlugs);
        this.defaultCheckSlugs = new Set(_defaultCheckSlugs);
        this.opts = {
            checks: {
                ...defaultChecks,
                ...checks,
            },
            custom: custom ?? {},
            outputResults: opts.outputResults ?? _defaultOpts.outputResults,
        };
        this.root = root ?? document.querySelector(':root');
        this.aspectRatio = this.aspectRatio.bind(this);
        this.atProperty = this.atProperty.bind(this);
        this.backgroundFixed = this.backgroundFixed.bind(this);
        this.calc = this.calc.bind(this);
        this.check = this.check.bind(this);
        this.displayContents = this.displayContents.bind(this);
        this.focusVisible = this.focusVisible.bind(this);
        this.focusWithin = this.focusWithin.bind(this);
        this.hasSelector = this.hasSelector.bind(this);
        this.isCustomCheck = this.isCustomCheck.bind(this);
        this.isDefaultCheck = this.isDefaultCheck.bind(this);
        this.subgrid = this.subgrid.bind(this);
        this.variableFonts = this.variableFonts.bind(this);
        this.whereSelector = this.whereSelector.bind(this);
    }
    /* METHODS
     * ====================================================================== */
    /**
     * Runs all the checks and sets root element classes accordingly.
     *
     * @experimental
     */
    check() {
        if (!this.root) {
            return;
        }
        // if this is running, js will run
        this.setFeature('js', true, true);
        for (const check of this.allCheckSlugs) {
            // continues
            if (this.isCustomCheck(check)) {
                if (this.opts.checks[check] !== false) {
                    this.customCheck(check);
                }
                continue;
            }
            // continues
            if (this.isDefaultCheck(check)) {
                if (this.opts.checks[check]) {
                    this[check]();
                }
                continue;
            }
        }
    }
    /**
     * Runs a custom check and updates the feature slug's class names on the
     * {@link FeatureCheck.root} element.
     *
     * @return  The test result.
     *
     * @experimental
     */
    async customCheck(slug) {
        const { test } = this.opts.custom[slug];
        return this.setFeature(slug, typeof test === 'function' ? test(slug, this) : test);
    }
    /**
     * Set a feature slug's class names on the {@link FeatureCheck.root}
     * element.
     *
     * @return  The test result.
     *
     * @experimental
     */
    async setFeature(
    /**
     * Feature result to set.
     */
    featureSlug, 
    /**
     * If true, the feature is marked as available. Otherwise it is marked
     * unavailable.
     */
    value, 
    /**
     * Whether to exclude the 'js__' prefix. This is only used to set the
     * 'js' and 'no-js' classes.
     *
     * @inline
     * @internal
     */
    ignorePrefix) {
        if (!this.root) {
            return value;
        }
        const falseSlug = FeatureCheck.getClassName(featureSlug, false, ignorePrefix);
        const trueSlug = FeatureCheck.getClassName(featureSlug, true, ignorePrefix);
        const classToAdd = value ? trueSlug : falseSlug;
        const classToRemove = value ? falseSlug : trueSlug;
        this.root.classList.add(classToAdd);
        this.root.classList.remove(classToRemove);
        if (this.opts.outputResults) {
            console.info(`[FeatureCheck] checked: ${featureSlug}\n`, { result: value, classToAdd, classToRemove });
        }
        return value;
    }
    /* Checkers ===================================== */
    /**
     * Checks for `aspect-ratio` css property support.
     *
     * @experimental
     * @source
     */
    async aspectRatio() {
        return this.setFeature('aspectRatio', FeatureCheck.supportsCSS('aspect-ratio: 1 / 2'));
    }
    /**
     * Checks for css `@property` at-rule support.
     *
     * @experimental
     * @source
     */
    async atProperty() {
        return this.setFeature('atProperty', !!window.CSSPropertyRule);
    }
    /**
     * Checks for `background-attachment: fixed` css rule support.
     *
     * @experimental
     * @source
     */
    async backgroundFixed() {
        return this.setFeature('backgroundFixed', FeatureCheck.supportsCSS('background-attachment: fixed'));
    }
    /**
     * Checks for `calc()` css value support.
     *
     * @experimental
     * @source
     */
    async calc() {
        return this.setFeature('calc', FeatureCheck.supportsCSS('width: calc( 0.25em + 10% )'));
    }
    /**
     * Checks for `display: contents` css rule support.
     *
     * @experimental
     * @source
     */
    async displayContents() {
        return this.setFeature('displayContents', FeatureCheck.supportsCSS('display: contents'));
    }
    /**
     * Checks for `:focus-within` css selector support.
     *
     * @experimental
     * @source
     */
    async focusWithin() {
        return this.setFeature('focusWithin', FeatureCheck.supportsCSS('selector( a:focus-within )'));
    }
    /**
     * Checks for `:focus-visible` css selector support.
     *
     * @experimental
     * @source
     */
    async focusVisible() {
        return this.setFeature('focusVisible', FeatureCheck.supportsCSS('selector( a:focus-visible )'));
    }
    /**
     * Checks for `:has()` css selector support.
     *
     * @experimental
     * @source
     */
    async hasSelector() {
        return this.setFeature('hasSelector', FeatureCheck.supportsCSS('selector( :has( a ) )'));
    }
    /**
     * Checks for `grid-template-columns: subgrid` css rule support.
     *
     * @experimental
     * @source
     */
    async subgrid() {
        return this.setFeature('subgrid', FeatureCheck.supportsCSS('grid-template-columns: subgrid'));
    }
    /**
     * Checks for `grid-template-columns: subgrid` css rule support.
     *
     * @since 0.1.0-beta.0.draft
     *
     * @experimental
     * @source
     */
    async variableFonts() {
        return this.setFeature('variableFonts', FeatureCheck.supportsCSS('font-variation-settings: normal'));
    }
    /**
     * Checks for `:where()` css selector support.
     *
     * @experimental
     * @source
     */
    async whereSelector() {
        return this.setFeature('whereSelector', FeatureCheck.supportsCSS('selector( :where( a ) )'));
    }
}
