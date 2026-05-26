/**
 * @since 0.1.0-pre.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '@maddimathon/utility-typescript/types';

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
 * The check can also be customized — this customization can mark some features 
 * as never available and add on custom feature checks:
 * {@includeCode ./FeatureCheck.docs.ts#Custom}
 *
 * @since 0.1.0-pre.0
 */
export class FeatureCheck<
    T_CustomCheckerSlug extends string = string,
> {



    /* STATIC
     * ====================================================================== */

    // when slug is js AND ignorePrefix is not false AND value is true
    public static getClassName<T_Slug extends 'js'>(
        featureSlug: T_Slug,
        value: true,
        ignorePrefix?: true,
    ): T_Slug;

    // when slug is js AND ignorePrefix is not false AND value is false
    public static getClassName<T_Slug extends 'js'>(
        featureSlug: T_Slug,
        value: false,
        ignorePrefix?: true,
    ): `no-${ T_Slug }`;

    // when slug is js AND ignorePrefix is not false
    public static getClassName<T_Slug extends 'js'>(
        featureSlug: T_Slug,
        value: boolean,
        ignorePrefix?: true,
    ): T_Slug | `no-${ T_Slug }`;

    // ignorePrefix is true AND value is true
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: true,
        ignorePrefix: true,
    ): T_Slug;

    // ignorePrefix is true AND value is false
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: false,
        ignorePrefix: true,
    ): `no-${ T_Slug }`;

    // ignorePrefix is true
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: boolean,
        ignorePrefix: true,
    ): T_Slug | `no-${ T_Slug }`;

    // ignorePrefix is false AND value is false
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: false,
        ignorePrefix?: false,
    ): `js__${ T_Slug }`;

    // ignorePrefix is false AND value is false
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: false,
        ignorePrefix?: false,
    ): `js__no-${ T_Slug }`;

    // ignorePrefix is false
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: boolean,
        ignorePrefix?: false,
    ): `js__${ T_Slug }` | `js__no-${ T_Slug }`;

    // fallback override
    public static getClassName<T_Slug extends string>(
        featureSlug: T_Slug,
        value: boolean,
        ignorePrefix?: boolean,
    ): T_Slug | `no-${ T_Slug }` | `js__${ T_Slug }` | `js__no-${ T_Slug }`;

    /**
     * Builds a feature-check class name that represents the result of a
     * compatibility test.
     * 
     * Overloaded for better (but ott) return typeing.
     * 
     * @since ___PKG_VERSION___ — Added overloads for better typing. Added optional ignorePrefix param.
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

        /**
         * Whether to exclude the 'js__' prefix. This is only used to set the
         * 'js' and 'no-js' classes.
         * 
         * @since ___PKG_VERSION___
         *
         * @internal
         */
        ignorePrefix: boolean = featureSlug === 'js',
    ): T_Slug | `no-${ T_Slug }` | `js__${ T_Slug }` | `js__no-${ T_Slug }` {
        const prefix = ignorePrefix ? '' : 'js__' as const;

        return (
            value
                ? `${ prefix }${ featureSlug }` as T_Slug | `js__${ T_Slug }`
                : `${ prefix }no-${ featureSlug }` as `no-${ T_Slug }` | `js__no-${ T_Slug }`
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
     * A list of classes to add to the root element before this script loads and runs. If any tests are booleans instead of functions, those booleans also change the defaults.
     * 
     * @typeParam T_CustomChecker  Shape(s) of the custom feature checkers.
     * 
     * @experimental
     */
    public static DEFAULT_CLASSLIST<T_CustomCheckerSlug extends string>(
        { custom }: FeatureCheck.OptsInput<T_CustomCheckerSlug> = {},
    ): string[] {
        custom = custom ?? {} as NonNullable<FeatureCheck.OptsInput<T_CustomCheckerSlug>[ 'custom' ]>;

        const _customCheckSlugs = Object.keys( custom ) as T_CustomCheckerSlug[];
        const _defaultCheckSlugs = Object.keys( FeatureCheck.DEFAULT_OPTS.checks ) as FeatureCheck.DefaultCheckSlug[];

        const customKeys = new Set( _customCheckSlugs );
        const defaultKeys = new Set( _defaultCheckSlugs );

        const classes: string[] = [
            FeatureCheck.getClassName( 'js', false ),
        ];

        for ( const check of [
            ..._defaultCheckSlugs,
            ..._customCheckSlugs,
        ] ) {
            // continues
            if ( customKeys.has( check as T_CustomCheckerSlug ) ) {
                const { test } = custom[ check as T_CustomCheckerSlug ];

                classes.push( FeatureCheck.getClassName(
                    check,
                    typeof test === 'boolean' ? test : false,
                ) );
                continue;
            }

            // continues
            if ( defaultKeys.has( check as FeatureCheck.DefaultCheckSlug ) ) {

                classes.push( FeatureCheck.getClassName( check, false ) );
                continue;
            }
        }

        return classes;
    }

    /**
     * Default value for {@link FeatureCheck.opts}.
     */
    public static get DEFAULT_OPTS(): Readonly<{
        checks: {
            aspectRatio: true,
            atProperty: true,
            backgroundFixed: true,
            calc: true,
            displayContents: true,
            focusWithin: true,
            focusVisible: true,
            hasSelector: true,
            subgrid: true,
            whereSelector: true,
        },
        custom: {},
        outputResults: false,
    }> {
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
            whereSelector: true,
        } satisfies FeatureCheck.CheckerOpts<never>;

        return {
            checks,
            custom: {},
            outputResults: false,
        } as const satisfies FeatureCheck.Opts<never>;
    }



    /* PROPERTIES
     * ====================================================================== */

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
     * @since ___PKG_VERSION___
     */
    protected readonly allCheckSlugs: ( FeatureCheck.DefaultCheckSlug | T_CustomCheckerSlug )[];

    /**
     * Built from combining the keys of {@link FeatureCheck.opts.checks}.
     *
     * @since ___PKG_VERSION___
     */
    protected readonly defaultCheckSlugs: Set<FeatureCheck.DefaultCheckSlug>;

    /**
     * Checks if the given slug is a default test.
     * 
     * @since ___PKG_VERSION___
     */
    public isDefaultCheck( slug: string ): slug is FeatureCheck.DefaultCheckSlug {
        return this.defaultCheckSlugs.has( slug as FeatureCheck.DefaultCheckSlug );
    }

    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     * 
     * @since ___PKG_VERSION___
     */
    protected readonly customCheckSlugs: Set<T_CustomCheckerSlug>;

    /**
     * Built from the {@link FeatureCheck.Opts<T_CustomCheckerSlug>['custom']}
     * config keys, so every key in here has a custom test.
     * 
     * @since ___PKG_VERSION___
     */
    public isCustomCheck( slug: string ): slug is T_CustomCheckerSlug {
        return this.customCheckSlugs.has( slug as T_CustomCheckerSlug );
    }




    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (

        /**
         * Partial options to override defaults.
         */
        { checks, custom, ...opts }: FeatureCheck.OptsInput<T_CustomCheckerSlug> = {},

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
        const {
            checks: defaultChecks,
            ..._defaultOpts
        } = FeatureCheck.DEFAULT_OPTS;

        const _customCheckSlugs = Object.keys( custom ?? {} ) as T_CustomCheckerSlug[];
        const _defaultCheckSlugs = Object.keys( defaultChecks ) as FeatureCheck.DefaultCheckSlug[];

        this.allCheckSlugs = [
            ..._defaultCheckSlugs,
            ..._customCheckSlugs,
        ];

        this.customCheckSlugs = new Set( _customCheckSlugs );
        this.defaultCheckSlugs = new Set( _defaultCheckSlugs );

        this.opts = {

            checks: {
                ...defaultChecks,
                ...checks,
            } satisfies FeatureCheck.CheckerOpts<T_CustomCheckerSlug>,

            custom: custom ?? (
                {} as FeatureCheck.CustomCheckerOpts<T_CustomCheckerSlug>
            ),

            outputResults: opts.outputResults ?? _defaultOpts.outputResults,
        };

        this.root = root ?? document.querySelector( ':root' );

        this.aspectRatio = this.aspectRatio.bind( this );
        this.atProperty = this.atProperty.bind( this );
        this.backgroundFixed = this.backgroundFixed.bind( this );
        this.calc = this.calc.bind( this );
        this.check = this.check.bind( this );
        this.displayContents = this.displayContents.bind( this );
        this.focusVisible = this.focusVisible.bind( this );
        this.focusWithin = this.focusWithin.bind( this );
        this.hasSelector = this.hasSelector.bind( this );
        this.isCustomCheck = this.isCustomCheck.bind( this );
        this.isDefaultCheck = this.isDefaultCheck.bind( this );
        this.subgrid = this.subgrid.bind( this );
        this.whereSelector = this.whereSelector.bind( this );
    }



    /* METHODS
     * ====================================================================== */

    /**
     * Runs all the checks and sets root element classes accordingly.
     * 
     * @experimental
     */
    public check(): void {
        if ( !this.root ) { return; }

        // if this is running, js will run
        this.setFeature( 'js', true, true );

        for ( const check of this.allCheckSlugs ) {
            // continues
            if ( this.isCustomCheck( check ) ) {

                if ( this.opts.checks[ check ] !== false ) {
                    this.customCheck( check );
                }
                continue;
            }

            // continues
            if ( this.isDefaultCheck( check ) ) {

                if ( this.opts.checks[ check ] ) {
                    this[ check ]();
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
    protected async customCheck(
        slug: T_CustomCheckerSlug,
    ): Promise<boolean> {
        const { test } = this.opts.custom[ slug ];

        return this.setFeature(
            slug,
            typeof test === 'function' ? test( slug, this ) : test
        );
    }

    /**
     * Set a feature slug's class names on the {@link FeatureCheck.root}
     * element.
     *
     * @return  The test result.
     * 
     * @experimental
     */
    protected async setFeature(

        /**
         * Feature result to set.
         */
        featureSlug: "js" | T_CustomCheckerSlug | FeatureCheck.DefaultCheckSlug,

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
        ignorePrefix?: boolean,

    ): Promise<boolean> {
        if ( !this.root ) { return value; }

        const falseSlug = FeatureCheck.getClassName( featureSlug, false, ignorePrefix );
        const trueSlug = FeatureCheck.getClassName( featureSlug, true, ignorePrefix );

        const classToAdd = value ? trueSlug : falseSlug;
        const classToRemove = value ? falseSlug : trueSlug;

        this.root.classList.add( classToAdd );
        this.root.classList.remove( classToRemove );

        if ( this.opts.outputResults ) {
            console.info(
                `[FeatureCheck] checked: ${ featureSlug }\n`,
                { result: value, classToAdd, classToRemove },
            );
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
    public async aspectRatio(): Promise<boolean> {
        return this.setFeature(
            'aspectRatio',
            FeatureCheck.supportsCSS( 'aspect-ratio: 1 / 2' ),
        );
    }

    /**
     * Checks for css `@property` at-rule support.
     * 
     * @experimental
     * @source
     */
    public async atProperty(): Promise<boolean> {
        return this.setFeature( 'atProperty', !!window.CSSPropertyRule );
    }

    /**
     * Checks for `background-attachment: fixed` css rule support.
     * 
     * @experimental
     * @source
     */
    public async backgroundFixed(): Promise<boolean> {
        return this.setFeature(
            'backgroundFixed',
            FeatureCheck.supportsCSS( 'background-attachment: fixed' ),
        );
    }

    /**
     * Checks for `calc()` css value support.
     * 
     * @experimental
     * @source
     */
    public async calc(): Promise<boolean> {
        return this.setFeature(
            'calc',
            FeatureCheck.supportsCSS( 'width: calc( 0.25em + 10% )' ),
        );
    }

    /**
     * Checks for `display: contents` css rule support.
     * 
     * @experimental
     * @source
     */
    public async displayContents(): Promise<boolean> {
        return this.setFeature(
            'displayContents',
            FeatureCheck.supportsCSS( 'display: contents' ),
        );
    }

    /**
     * Checks for `:focus-within` css selector support.
     * 
     * @experimental
     * @source
     */
    public async focusWithin(): Promise<boolean> {
        return this.setFeature(
            'focusWithin',
            FeatureCheck.supportsCSS( 'selector( a:focus-within )' ),
        );
    }

    /**
     * Checks for `:focus-visible` css selector support.
     * 
     * @experimental
     * @source
     */
    public async focusVisible(): Promise<boolean> {
        return this.setFeature(
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
    public async hasSelector(): Promise<boolean> {
        return this.setFeature(
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
    public async subgrid(): Promise<boolean> {
        return this.setFeature(
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
    public async whereSelector(): Promise<boolean> {
        return this.setFeature(
            'whereSelector',
            FeatureCheck.supportsCSS( 'selector( :where( a ) )' ),
        );
    }
}

/**
 * Utilties for the {@link FeatureCheck} class.
 * 
 * @category Module Support
 * 
 * @since 0.1.0-pre.0
 */
export namespace FeatureCheck {

    /**
     * Built-in feature-check methods.
     * 
     * @since ___PKG_VERSION___ Renamed from Checker to DefaultCheckSlug.
     */
    export type DefaultCheckSlug =
        | "aspectRatio"
        | "atProperty"
        | "backgroundFixed"
        | "calc"
        | "displayContents"
        | "focusWithin"
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
    export type CheckerOpts<
        /**
         * The feature slugs to use for these tests.
         */
        T_CustomCheckerSlug extends string = string
    > = {
        [ S in DefaultCheckSlug ]: boolean;
    } & {
            [ S in T_CustomCheckerSlug ]?: boolean;
        };

    /**
     * An additional feature test to check.
     * 
     * @typeParam T_Slug  Slugs used for custom feature checkers.
     */
    export type CustomCheckerOpts<
        /**
         * The feature slugs to use for these tests.
         */
        T_CustomCheckerSlug extends string = string
    > = {
        [ S in T_CustomCheckerSlug ]: {
            /**
             * The test result or the testing callback to run to determine
             * feature availability.
             */
            test: boolean | (
                (
                    slug: DefaultCheckSlug | T_CustomCheckerSlug,
                    inst?: FeatureCheck<T_CustomCheckerSlug>,
                ) => boolean
            );
        }
    } & {
            [ S in DefaultCheckSlug ]?: {
                test: boolean | (
                    (
                        slug: DefaultCheckSlug | T_CustomCheckerSlug,
                        inst?: FeatureCheck<T_CustomCheckerSlug>,
                    ) => boolean
                );
            };
        };

    /**
     * @since ___PKG_VERSION___
     */
    export type Opts<
        /**
         * The feature slugs to use for these tests.
         */
        T_CustomCheckerSlug extends string = string
    > = {

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
        outputResults: boolean;
    };

    /**
     * Partially partialized.
     * 
     * @since ___PKG_VERSION___
     */
    export type OptsInput<
        /**
         * The feature slugs to use for these tests.
         */
        T_CustomCheckerSlug extends string = string
    > = {

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
        outputResults?: undefined | boolean;
    };
}
