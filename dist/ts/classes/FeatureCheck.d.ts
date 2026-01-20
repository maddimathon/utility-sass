/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.12
 * @license MIT
 */
/**
 * Utility class that uses client-side JS to test for JS and CSS feature
 * compaibility. Updates root element class names accordingly.
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
 * {@includeCode ./FeatureCheck.example.ts#Simple}
 *
 * The check can also be customized — this customization can mark some features
 * as never available and add on custom feature checks:
 * {@includeCode ./FeatureCheck.example.ts#Custom}
 *
 * @since 0.1.0-pre.0
 */
export declare class FeatureCheck<T_CustomCheckerSlug extends string | never = string, T_CustomChecker extends FeatureCheck.CustomChecker<T_CustomCheckerSlug> = FeatureCheck.CustomChecker<T_CustomCheckerSlug>> {
    /**
     * Builds a feature-check class name that represents the result of a
     * compatibility test.
     *
     * @experimental
     */
    static getClassName<T_Slug extends string>(
    /**
     * Feature slug used to conduct the test.
     */
    featureSlug: T_Slug, 
    /**
     * The version of the class to get. If true, class indicates that the
     * feature is enabled; otherwise, class indicates the feature is
     * unavailable.
     */
    value: boolean): string;
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
     * A list of classes to add to the root element before this script loads and runs.
     *
     * @typeParam T_CustomChecker  Shape(s) of the custom feature checkers.
     *
     * @experimental
     */
    static DEFAULT_CLASSLIST<T_CustomChecker extends FeatureCheck.CustomChecker>(
    /**
     * Custom checks to include in the class list.
     */
    customChecks?: T_CustomChecker[]): string;
    /**
     * Default value for {@link FeatureCheck.opts}.
     */
    static get DEFAULT_OPTS(): {
        readonly aspectRatio: true;
        readonly atProperty: true;
        readonly backgroundFixed: true;
        readonly displayContents: true;
        readonly focusWithin: true;
        readonly focusVisible: true;
        readonly hasSelector: true;
        readonly subgrid: true;
        readonly whereSelector: true;
    };
    /**
     * Completed copy of the built-in check options.
     *
     * See {@link FeatureCheck.constructor} for details.
     */
    protected readonly customChecks: T_CustomChecker[];
    /**
     * Completed copy of the built-in check options.
     *
     * See {@link FeatureCheck.CheckerOpts} for details.
     */
    protected readonly opts: FeatureCheck.CheckerOpts;
    /**
     * The root element used for adding and removing feature-check classes.
     *
     * See {@link FeatureCheck.constructor} for details.
     */
    protected readonly root: Element | null;
    constructor(
    /**
     * Partial options to override defaults.
     */
    opts?: Partial<FeatureCheck.CheckerOpts>, 
    /**
     * Custom feature checks to include in the run.
     */
    customChecks?: T_CustomChecker[], 
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
    check(): void;
    /**
     * Runs a custom check and updates the feature slug's class names on the
     * {@link FeatureCheck.root} element.
     *
     * @experimental
     */
    protected customCheck(
    /**
     * A custom check to run.
     */
    check: T_CustomChecker): void;
    /**
     * Set a feature slug's class names on the {@link FeatureCheck.root}
     * element.
     *
     * @experimental
     */
    protected setFeature(
    /**
     * Feature result to set.
     */
    featureSlug: "js" | T_CustomCheckerSlug | FeatureCheck.Checker, 
    /**
     * If true, the feature is marked as available. Otherwise it is marked
     * unavailable.
     */
    value: boolean, 
    /**
     * Whether to exclude the 'js__' prefix. This is only used to set the
     * 'js' and 'no-js' classes.
     *
     * @internal
     */
    ignorePrefix?: boolean): void;
    /**
     * Checks for `aspect-ratio` css property support.
     *
     * @experimental
     * @source
     */
    protected aspectRatio(): void;
    /**
     * Checks for css `@property` at-rule support.
     *
     * @experimental
     * @source
     */
    protected atProperty(): void;
    /**
     * Checks for `background-attachment: fixed` css rule support.
     *
     * @experimental
     * @source
     */
    protected backgroundFixed(): void;
    /**
     * Checks for `display: contents` css rule support.
     *
     * @experimental
     * @source
     */
    protected displayContents(): void;
    /**
     * Checks for `:focus-within` css selector support.
     *
     * @experimental
     * @source
     */
    protected focusWithin(): void;
    /**
     * Checks for `:focus-visible` css selector support.
     *
     * @experimental
     * @source
     */
    protected focusVisible(): void;
    /**
     * Checks for `:has()` css selector support.
     *
     * @experimental
     * @source
     */
    protected hasSelector(): void;
    /**
     * Checks for `grid-template-columns: subgrid` css rule support.
     *
     * @experimental
     * @source
     */
    protected subgrid(): void;
    /**
     * Checks for `:where()` css selector support.
     *
     * @experimental
     * @source
     */
    protected whereSelector(): void;
}
/**
 * Utilties for the {@link FeatureCheck} class.
 *
 * @since 0.1.0-pre.0
 */
export declare namespace FeatureCheck {
    /**
     * Built-in feature-check methods.
     */
    type Checker = "aspectRatio" | "atProperty" | "backgroundFixed" | "displayContents" | "focusWithin" | "focusVisible" | "hasSelector" | "subgrid" | "whereSelector";
    /**
     * An options object to allow (or disallow) built-in feature checkers.
     *
     * If false, the test is skipped and the feature is always marked
     * unavailable.
     */
    type CheckerOpts = {
        [S in Checker]: boolean;
    };
    /**
     * An additional feature test to check.
     *
     * @typeParam T_Slug  Slugs used for custom feature checkers.
     */
    type CustomChecker<T_Slug extends string = string> = {
        /**
         * The feature slug to use for this test.
         */
        slug: T_Slug;
        /**
         * The test result or the test result to run to determine feature
         * availability.
         */
        test: boolean | ((check: FeatureCheck) => boolean);
    };
}
//# sourceMappingURL=FeatureCheck.d.ts.map