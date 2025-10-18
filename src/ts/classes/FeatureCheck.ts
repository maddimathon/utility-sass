/**
 * @since 0.1.0-pre.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
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
export class FeatureCheck<
    T_CustomCheckerSlug extends string | never = string,
    T_CustomChecker extends FeatureCheck.CustomChecker<T_CustomCheckerSlug> = FeatureCheck.CustomChecker<T_CustomCheckerSlug>,
> {



    /* STATIC
     * ====================================================================== */

    /**
     * Builds a feature-check class name that represents the result of a
     * compatibility test.
     * 
     * @experimental
     */
    public static getClassName<T_Slug extends string>(

        /**
         * Feature slug used to conduct the test.
         */
        featureSlug: T_Slug,

        /**
         * The version of the class to get. If true, class indicates that the
         * feature is enabled; otherwise, class indicates the feature is
         * unavailable.
         */
        value: boolean,
    ): string {

        return (
            value
                ? `js__${ featureSlug }` as `js__no-${ T_Slug }`
                : `js__no-${ featureSlug }` as `js__${ T_Slug }`
        );
    }

    /**
     * Checks for CSS rule support.
     * 
     * @experimental
     */
    public static supportsCSS(

        /**
         * A valid test param for the CSS `@supports()` rule.
         */
        supports: string,

    ): boolean {

        return window.CSS && CSS.supports && CSS.supports( supports );
    }


    /* ## Static - Default Values ===================================== */

    /**
     * A list of classes to add to the root element before this script loads and runs.
     * 
     * @typeParam T_CustomChecker  Shape(s) of the custom feature checkers.
     * 
     * @experimental
     */
    public static DEFAULT_CLASSLIST<
        T_CustomChecker extends FeatureCheck.CustomChecker
    >(
        /**
         * Custom checks to include in the class list.
         */
        customChecks?: T_CustomChecker[],
    ) {

        const keys = Object.keys( FeatureCheck.DEFAULT_OPTS )
            .concat( ( customChecks ?? [] ).map( _check => _check.slug ) )
            .filter( ( v, i, a ) => a.indexOf( v ) === i );

        return (
            ''
            + 'no-js '
            + keys.map( _key => FeatureCheck.getClassName( _key, false ) ).join( ' ' )
        );
    }

    /**
     * Default value for {@link FeatureCheck.opts}.
     */
    public static get DEFAULT_OPTS() {

        return {
            aspectRatio: true,
            atProperty: true,
            backgroundFixed: true,
            displayContents: true,
            focusVisible: true,
            hasSelector: true,
            subgrid: true,
            whereSelector: true,
        } as const satisfies FeatureCheck.CheckerOpts;
    }



    /* PROPERTIES
     * ====================================================================== */

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




    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (

        /**
         * Partial options to override defaults.
         */
        opts: Partial<FeatureCheck.CheckerOpts> = {},

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
        root?: Element,
    ) {

        this.customChecks = customChecks ?? [];

        this.opts = {
            ...FeatureCheck.DEFAULT_OPTS,
            ...opts,
        };

        this.root = root ?? document.querySelector( ':root' );

        this.check = this.check.bind( this );
    }



    /* METHODS
     * ====================================================================== */

    /**
     * Runs all the checks and sets root element classes accordingly.
     * 
     * @experimental
     */
    public check() {
        if ( !this.root ) { return; }

        const checkers = {
            default: Object.keys( FeatureCheck.DEFAULT_OPTS ) as FeatureCheck.Checker[],
            custom: ( this.customChecks ?? [] ).map( _check => _check.slug )
        };

        // if this is running, js will run
        this.setFeature( 'js', true, true );

        for ( const checker of checkers.default ) {
            this.opts[ checker ] && this[ checker ]();
        }

        if ( this.customChecks?.length ) {

            for ( const check of this.customChecks ) {
                this.customCheck( check );
            }
        }
    }

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
        check: T_CustomChecker,
    ) {
        const { test, slug } = check;

        this.setFeature(
            slug,
            typeof test === 'function' ? test( this ) : test
        );
    }

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
        ignorePrefix: boolean = false,

    ): void {
        if ( !this.root ) { return; }

        const prefix = ignorePrefix ? '' : 'js__';

        const falseSlug = `${ prefix }no-${ featureSlug }`;
        const trueSlug = `${ prefix }${ featureSlug }`;

        const classToAdd = value ? trueSlug : falseSlug;
        const classToRemove = value ? falseSlug : trueSlug;

        this.root.classList.add( classToAdd );
        this.root.classList.remove( classToRemove );
    }


    /* Checkers ===================================== */

    /**
     * Checks for `aspect-ratio` css property support.
     * 
     * @experimental
     * @source
     */
    protected aspectRatio() {

        this.setFeature(
            'aspectRatio',
            FeatureCheck.supportsCSS( 'aspect-ratio: 1 / 1' ),
        );
    }

    /**
     * Checks for css `@property` at-rule support.
     * 
     * @experimental
     * @source
     */
    protected atProperty() {
        this.setFeature( 'atProperty', !!window.CSSPropertyRule );
    }

    /**
     * Checks for `background-attachment: fixed` css rule support.
     * 
     * @experimental
     * @source
     */
    protected backgroundFixed() {

        this.setFeature(
            'backgroundFixed',
            FeatureCheck.supportsCSS( 'background-attachment: fixed' ),
        );
    }

    /**
     * Checks for `display: contents` css rule support.
     * 
     * @experimental
     * @source
     */
    protected displayContents() {

        this.setFeature(
            'displayContents',
            FeatureCheck.supportsCSS( 'display: contents' ),
        );
    }

    /**
     * Checks for `:focus-visible` css selector support.
     * 
     * @experimental
     * @source
     */
    protected focusVisible() {

        this.setFeature(
            'focusVisible',
            FeatureCheck.supportsCSS( 'selector( a:focus-visible )' ),
        );
    }

    /**
     * Checks for `:has()` css selector support.
     * 
     * @experimental
     * @source
     */
    protected hasSelector() {

        this.setFeature(
            'hasSelector',
            FeatureCheck.supportsCSS( 'selector( :has( a ) )' ),
        );
    }

    /**
     * Checks for `grid-template-columns: subgrid` css rule support.
     * 
     * @experimental
     * @source
     */
    protected subgrid() {

        this.setFeature(
            'subgrid',
            FeatureCheck.supportsCSS( 'grid-template-columns: subgrid' ),
        );
    }

    /**
     * Checks for `:where()` css selector support.
     * 
     * @experimental
     * @source
     */
    protected whereSelector() {

        this.setFeature(
            'whereSelector',
            FeatureCheck.supportsCSS( 'selector( :where( a ) )' ),
        );
    }
}

/**
 * Utilties for the {@link FeatureCheck} class.
 * 
 * @since 0.1.0-pre.0
 */
export namespace FeatureCheck {

    /**
     * Built-in feature-check methods.
     */
    export type Checker =
        | "aspectRatio"
        | "atProperty"
        | "backgroundFixed"
        | "displayContents"
        | "focusVisible"
        | "hasSelector"
        | "subgrid"
        | "whereSelector";

    /**
     * An options object to allow (or disallow) built-in feature checkers.
     *
     * If false, the test is skipped and the feature is always marked
     * unavailable.
     */
    export type CheckerOpts = {
        [ S in Checker ]: boolean;
    };

    /**
     * An additional feature test to check.
     * 
     * @typeParam T_Slug  Slugs used for custom feature checkers.
     */
    export type CustomChecker<T_Slug extends string = string> = {

        /**
         * The feature slug to use for this test.
         */
        slug: T_Slug;

        /**
         * The test result or the test result to run to determine feature
         * availability.
         */
        test: boolean | ( ( check: FeatureCheck ) => boolean );
    };
}
