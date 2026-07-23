/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import type { RecursivePartial } from '@maddimathon/utility-typescript/types';
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
export declare class FeatureCheck<
/**
 * The slugs for additional custom checker functions included in the
 * instance & its output.
 */
T_CustomCheckerSlug extends string = string> {
    #private;
    static getClassName<T_Slug extends 'js'>(featureSlug: T_Slug, value: true, ignorePrefix?: true): T_Slug;
    static getClassName<T_Slug extends 'js'>(featureSlug: T_Slug, value: false, ignorePrefix?: true): `no-${T_Slug}`;
    static getClassName<T_Slug extends 'js'>(featureSlug: T_Slug, value: boolean, ignorePrefix?: true): T_Slug | `no-${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: true, ignorePrefix: true): T_Slug;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: false, ignorePrefix: true): `no-${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: boolean, ignorePrefix: true): T_Slug | `no-${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: false, ignorePrefix?: false): `js__${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: false, ignorePrefix?: false): `js__no-${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: boolean, ignorePrefix?: false): `js__${T_Slug}` | `js__no-${T_Slug}`;
    static getClassName<T_Slug extends string>(featureSlug: T_Slug, value: boolean, ignorePrefix?: boolean): T_Slug | `no-${T_Slug}` | `js__${T_Slug}` | `js__no-${T_Slug}`;
    /**
     * Checks for CSS rule support.
     *
     * @experimental
     */
    static supportsCSS(
    /**
     * A valid test param for the CSS `@supports()` rule.
     */
    supports: string): boolean;
    /**
     * A list of classes to add to the root element before this script loads and runs. If any tests are booleans instead of functions, those booleans also change the defaults.
     *
     * @typeParam T_CustomChecker  Shape(s) of the custom feature checkers.
     *
     * @experimental
     */
    static DEFAULT_CLASSLIST<T_CustomCheckerSlug extends string>({ custom }?: FeatureCheck.OptsInput<T_CustomCheckerSlug>): string[];
    /**
     * Default value for {@link FeatureCheck.opts}.
     */
    static get DEFAULT_OPTS(): Readonly<{
        checks: {
            aspectRatio: true;
            atProperty: true;
            backgroundFixed: true;
            calc: true;
            displayContents: true;
            focusWithin: true;
            focusVisible: true;
            hasSelector: true;
            subgrid: true;
            touch: true;
            variableFonts: true;
            whereSelector: true;
        };
        custom: {};
        logResults: false;
    }>;
    /**
     * Completed copy of the options.
     *
     * See {@link FeatureCheck.Opts} for details.
     */
    protected readonly opts: FeatureCheck.Opts<T_CustomCheckerSlug>;
    /**
     * The root element used for adding and removing feature-check classes.
     *
     * See {@link FeatureCheck.constructor} for details.
     */
    protected readonly root: Element | null;
    /**
     * Built from combining {@link FeatureCheck.customCheckSlugs} and the keys
     * of {@link FeatureCheck.opts.checks}.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly allCheckSlugs: (FeatureCheck.DefaultCheckSlug | T_CustomCheckerSlug)[];
    /**
     * Built from combining the keys of {@link FeatureCheck.opts.checks}.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly defaultCheckSlugs: Set<FeatureCheck.DefaultCheckSlug>;
    /**
     * Checks if the given slug is a default test.
     *
     * @since 0.1.0-beta.0.draft
     */
    isDefaultCheck(slug: string): slug is FeatureCheck.DefaultCheckSlug;
    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly customCheckSlugs: Set<T_CustomCheckerSlug>;
    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     *
     * @since 0.1.0-beta.0.draft
     */
    isCustomCheck(slug: string): slug is T_CustomCheckerSlug;
    constructor(
    /**
     * Partial options to override defaults.
     */
    { checks, custom, ...opts }?: FeatureCheck.OptsInput<T_CustomCheckerSlug>, 
    /**
     * The root element to add feature classes to.
     *
     * @default
     * ```ts
     * document.querySelector( ':root' )
     * ```
     */
    root?: Element);
    /**
     * Runs all the checks and sets root element classes accordingly.
     *
     * @experimental
     */
    check(): Promise<void>;
    /**
     * Gets a test result, caches it, and returns the cached value if already
     * calculated. If you're using this class for conditional JS (instead of for
     * its body classes), use this method to get test results.
     */
    getCheck(check: "js" | T_CustomCheckerSlug | FeatureCheck.DefaultCheckSlug): Promise<boolean>;
    /**
     * Set a feature slug's class names on the {@link FeatureCheck.root}
     * element.
     *
     * @return  The test result.
     *
     * @experimental
     */
    protected setFeature(
    /**
     * Feature result to set.
     */
    featureSlug: "js" | T_CustomCheckerSlug | FeatureCheck.DefaultCheckSlug, 
    /**
     * If true, the feature is marked as available. Otherwise it is marked
     * unavailable.
     */
    value: boolean | Promise<boolean>, 
    /**
     * Whether to exclude the 'js__' prefix. This is only used to set the
     * 'js' and 'no-js' classes.
     *
     * @inline
     * @internal
     */
    ignorePrefix?: boolean): Promise<boolean>;
}
/**
 * Utilties for the {@link FeatureCheck} class.
 *
 * @category Module Support
 *
 * @since 0.1.0-pre.0
 */
export declare namespace FeatureCheck {
    /**
     * Built-in feature-check methods.
     *
     * @since 0.1.0-beta.0.draft Renamed from Checker to DefaultCheckSlug.
     */
    type DefaultCheckSlug = "aspectRatio" | "atProperty" | "backgroundFixed" | "calc" | "displayContents" | "focusWithin" | "focusVisible" | "hasSelector" | "subgrid"
    /**
     * Tries to detect if this device accepts touch input — this is useful
     * for increasing spacing for buttons and other click targets.
     */
     | "touch" | "variableFonts" | "whereSelector";
    /**
     * An options object to allow (or disallow) built-in feature checkers.
     *
     * If false, the test is skipped and the feature is always marked
     * unavailable.
     */
    type CheckerOpts<
    /**
     * The feature slugs to use for these tests.
     */
    T_CustomCheckerSlug extends string = string> = {
        [S in DefaultCheckSlug]: boolean;
    } & {
        [S in T_CustomCheckerSlug]?: boolean;
    };
    /**
     * An additional feature test to check.
     *
     * @typeParam T_Slug  Slugs used for custom feature checkers.
     */
    type CustomCheckerOpts<
    /**
     * The feature slugs to use for these tests.
     */
    T_CustomCheckerSlug extends string = string> = {
        [S in T_CustomCheckerSlug]: {
            /**
             * The test result or the testing callback to run to determine
             * feature availability.
             */
            test: boolean | ((slug: DefaultCheckSlug | T_CustomCheckerSlug, inst?: FeatureCheck<T_CustomCheckerSlug>) => boolean);
        };
    } & {
        [S in DefaultCheckSlug]?: {
            test: boolean | ((slug: DefaultCheckSlug | T_CustomCheckerSlug, inst?: FeatureCheck<T_CustomCheckerSlug>) => boolean);
        };
    };
    /**
     * @since 0.1.0-beta.0.draft
     */
    type Opts<
    /**
     * The feature slugs to use for these tests.
     */
    T_CustomCheckerSlug extends string = string> = {
        /**
         * Whether to include/exclude the given checks.
         */
        checks: CheckerOpts<NoInfer<T_CustomCheckerSlug>>;
        /**
         * Configuration for custom
         */
        custom: CustomCheckerOpts<T_CustomCheckerSlug>;
        /**
         * Whether to output the results of each feature check as it is made.
         */
        logResults: boolean;
    };
    /**
     * Partially partialized.
     *
     * @since 0.1.0-beta.0.draft
     */
    type OptsInput<
    /**
     * The feature slugs to use for these tests.
     */
    T_CustomCheckerSlug extends string = string> = {
        /**
         * Whether to include/exclude the given checks.
         */
        checks?: undefined | RecursivePartial<CheckerOpts<NoInfer<T_CustomCheckerSlug>>>;
        /**
         * Configuration for custom
         */
        custom?: CustomCheckerOpts<T_CustomCheckerSlug>;
        /**
         * Whether to output the results of each feature check as it is made.
         */
        logResults?: undefined | boolean;
    };
    /**
     * The default checker functions.
     *
     * @since 0.1.0-beta.0.draft
     */
    const CHECKERS: {
        /**
         * Checks for `aspect-ratio` css property support.
         *
         * @experimental
         * @source
         */
        aspectRatio: () => Promise<boolean>;
        /**
         * Checks for css `@property` at-rule support.
         *
         * @experimental
         * @source
         */
        atProperty: () => Promise<boolean>;
        /**
         * Checks for `background-attachment: fixed` css rule support.
         *
         * @experimental
         * @source
         */
        backgroundFixed: () => Promise<boolean>;
        /**
         * Checks for `calc()` css value support.
         *
         * @experimental
         * @source
         */
        calc: () => Promise<boolean>;
        /**
         * Checks for `display: contents` css rule support.
         *
         * @experimental
         * @source
         */
        displayContents: () => Promise<boolean>;
        /**
         * Checks for `:focus-within` css selector support.
         *
         * @experimental
         * @source
         */
        focusWithin: () => Promise<boolean>;
        /**
         * Checks for `:focus-visible` css selector support.
         *
         * @experimental
         * @source
         */
        focusVisible: () => Promise<boolean>;
        /**
         * Checks for `:has()` css selector support.
         *
         * @experimental
         * @source
         */
        hasSelector: () => Promise<boolean>;
        /**
         * Checks for `grid-template-columns: subgrid` css rule support.
         *
         * @experimental
         * @source
         */
        subgrid: () => Promise<boolean>;
        /**
         * Tries to detect if this device accepts touch input — this is useful for
         * increasing spacing for buttons and other click targets.
         *
         * @experimental
         * @source
         */
        touch: () => Promise<boolean>;
        /**
         * Checks for `grid-template-columns: subgrid` css rule support.
         *
         * @since 0.1.0-beta.0.draft
         *
         * @experimental
         * @source
         */
        variableFonts: () => Promise<boolean>;
        /**
         * Checks for `:where()` css selector support.
         *
         * @experimental
         * @source
         */
        whereSelector: () => Promise<boolean>;
    };
}
