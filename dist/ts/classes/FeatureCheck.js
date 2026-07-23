/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _FeatureCheck_checkCache;
/**
 * Utility class that uses client-side JS to test for JS and CSS feature
 * compaibility. Updates root element class names accordingly.
 *
 * @category Module Support
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
 * customization can mark some features as never available (or always
 * available), replace defaul testing logic, or add on additional custom feature
 * checks:
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
        custom = custom !== null && custom !== void 0 ? custom : {};
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
            touch: true,
            variableFonts: true,
            whereSelector: true,
        };
        return {
            checks,
            custom: {},
            logResults: false,
        };
    }
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
    isCustomCheck(slug) {
        return this.customCheckSlugs.has(slug);
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(
    /**
     * Partial options to override defaults.
     */
    _a = {}, 
    /**
     * The root element to add feature classes to.
     *
     * @default
     * ```ts
     * document.querySelector( ':root' )
     * ```
     */
    root) {
        var _b;
        var 
        /**
         * Partial options to override defaults.
         */
        { checks, custom } = _a, opts = __rest(_a, 
        /**
         * Partial options to override defaults.
         */
        ["checks", "custom"]);
        _FeatureCheck_checkCache.set(this, {});
        const _c = FeatureCheck.DEFAULT_OPTS, { checks: defaultChecks } = _c, _defaultOpts = __rest(_c, ["checks"]);
        const _customCheckSlugs = Object.keys(custom !== null && custom !== void 0 ? custom : {});
        const _defaultCheckSlugs = Object.keys(defaultChecks);
        this.allCheckSlugs = [
            ..._defaultCheckSlugs,
            ..._customCheckSlugs,
        ];
        this.customCheckSlugs = new Set(_customCheckSlugs);
        this.defaultCheckSlugs = new Set(_defaultCheckSlugs);
        this.opts = {
            checks: Object.assign(Object.assign({}, defaultChecks), checks),
            custom: custom !== null && custom !== void 0 ? custom : {},
            logResults: (_b = opts.logResults) !== null && _b !== void 0 ? _b : _defaultOpts.logResults,
        };
        this.root = root !== null && root !== void 0 ? root : document.querySelector(':root');
        this.check = this.check.bind(this);
        this.isCustomCheck = this.isCustomCheck.bind(this);
        this.isDefaultCheck = this.isDefaultCheck.bind(this);
    }
    /* METHODS
     * ====================================================================== */
    /**
     * Runs all the checks and sets root element classes accordingly.
     *
     * @experimental
     */
    async check() {
        if (!this.root) {
            return;
        }
        return Promise.all([
            this.setFeature('js', true, true),
            ...this.allCheckSlugs.map(check => this.setFeature(check, this.getCheck(check)))
        ]).then(() => { });
    }
    /**
     * Gets a test result, caches it, and returns the cached value if already
     * calculated. If you're using this class for conditional JS (instead of for
     * its body classes), use this method to get test results.
     */
    async getCheck(check) {
        // returns
        if (typeof __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check] !== 'undefined') {
            return __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check];
        }
        // returns
        if (this.isCustomCheck(check)) {
            __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check] = this.opts.checks[check] ? (typeof this.opts.custom[check].test === 'function'
                ? this.opts.custom[check].test(check, this)
                : this.opts.custom[check].test) : false;
            return __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check];
        }
        // returns
        if (this.isDefaultCheck(check) && this.opts.checks[check]) {
            __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check] = FeatureCheck.CHECKERS[check]();
            return __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check];
        }
        __classPrivateFieldGet(this, _FeatureCheck_checkCache, "f")[check] = false;
        return false;
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
        value = await value;
        const falseClass = FeatureCheck.getClassName(featureSlug, false, ignorePrefix);
        const trueClass = FeatureCheck.getClassName(featureSlug, true, ignorePrefix);
        const classToAdd = value ? trueClass : falseClass;
        const classToRemove = value ? falseClass : trueClass;
        this.root.classList.remove(classToRemove);
        this.root.classList.add(classToAdd);
        if (this.opts.logResults) {
            console.info(`[FeatureCheck] checked: ${featureSlug}\n`, { result: value, classToAdd, classToRemove });
        }
        return value;
    }
}
_FeatureCheck_checkCache = new WeakMap();
/**
 * Utilties for the {@link FeatureCheck} class.
 *
 * @category Module Support
 *
 * @since 0.1.0-pre.0
 */
(function (FeatureCheck) {
    /**
     * The default checker functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    FeatureCheck.CHECKERS = {
        /**
         * Checks for `aspect-ratio` css property support.
         *
         * @experimental
         * @source
         */
        aspectRatio: async () => FeatureCheck.supportsCSS('aspect-ratio: 1 / 2'),
        /**
         * Checks for css `@property` at-rule support.
         *
         * @experimental
         * @source
         */
        atProperty: async () => !!window.CSSPropertyRule,
        /**
         * Checks for `background-attachment: fixed` css rule support.
         *
         * @experimental
         * @source
         */
        backgroundFixed: async () => FeatureCheck.supportsCSS('background-attachment: fixed'),
        /**
         * Checks for `calc()` css value support.
         *
         * @experimental
         * @source
         */
        calc: async () => FeatureCheck.supportsCSS('width: calc( 0.25em + 10% )'),
        /**
         * Checks for `display: contents` css rule support.
         *
         * @experimental
         * @source
         */
        displayContents: async () => FeatureCheck.supportsCSS('display: contents'),
        /**
         * Checks for `:focus-within` css selector support.
         *
         * @experimental
         * @source
         */
        focusWithin: async () => FeatureCheck.supportsCSS('selector( a:focus-within )'),
        /**
         * Checks for `:focus-visible` css selector support.
         *
         * @experimental
         * @source
         */
        focusVisible: async () => FeatureCheck.supportsCSS('selector( a:focus-visible )'),
        /**
         * Checks for `:has()` css selector support.
         *
         * @experimental
         * @source
         */
        hasSelector: async () => FeatureCheck.supportsCSS('selector( :has( a ) )'),
        /**
         * Checks for `grid-template-columns: subgrid` css rule support.
         *
         * @experimental
         * @source
         */
        subgrid: async () => FeatureCheck.supportsCSS('grid-template-columns: subgrid'),
        /**
         * Tries to detect if this device accepts touch input — this is useful for
         * increasing spacing for buttons and other click targets.
         *
         * @experimental
         * @source
         */
        touch: async () => {
            const _navigator = navigator;
            let testResult = false;
            if (typeof _navigator.maxTouchPoints !== 'undefined'
                || typeof _navigator.msMaxTouchPoints !== 'undefined') {
                // use these values to test
                testResult = !!(_navigator.maxTouchPoints || _navigator.msMaxTouchPoints);
            }
            else {
                // this is an old (pre 2014-2020) browser without that detection
                // method available
                // I consider this test more likely to return false positives (and
                // it only has marginally better support), but this feature is
                // important to detect for accessibly-sized touch targets
                testResult = 'ontouchstart' in window;
            }
            return testResult;
        },
        /**
         * Checks for `grid-template-columns: subgrid` css rule support.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @experimental
         * @source
         */
        variableFonts: async () => FeatureCheck.supportsCSS('font-variation-settings: normal'),
        /**
         * Checks for `:where()` css selector support.
         *
         * @experimental
         * @source
         */
        whereSelector: async () => FeatureCheck.supportsCSS('selector( :where( a ) )'),
    };
})(FeatureCheck || (FeatureCheck = {}));
