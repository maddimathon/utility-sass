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
 * Converts a JSON object to a scss list or map (as a string, to be written to a
 * *.scss file).
 *
 * @category Utilities
 *
 * @since 0.1.0-pre.0
 */
export declare namespace JsonToScss {
    /**
     * Options for the conversion function.
     *
     * @since 0.1.0-alpha.32
     */
    interface Opts {
        /**
         * Whether map keys should always be quoted, no matter their value.
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        alwaysQuoteKeys?: boolean;
        /**
         * Whether map keys should always be quoted if they are a number
         * (regardless of {@link Opts.convertUnitStringsToNumbers} and
         * {@link Opts.convertUnitStringsToNumbers} values).
         *
         * @default true
         *
         * @since 0.1.0-beta.0.draft
         */
        alwaysQuoteNumberKeys?: boolean;
        /**
         * Whether colour functions should be output as quoted strings (instead
         * of sass colours).
         *
         * @default false
         *
         * @since 0.1.0-alpha.32
         */
        coloursAsStrings?: boolean;
        /**
         * Whether to translate strings of numbers with units as numbers in the
         * sass output (instead of as strings).
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        convertUnitStringsToNumbers?: boolean;
        /**
         * Whether to translate strings of numbers equalling to zero as numbers
         * in the sass output (instead of as strings).
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        convertZeroStringsToNumbers?: boolean;
        /**
         * Whether to output detected css strings as quoted strings instead of
         * unquoted values.
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        cssFunctionsAsStrings?: boolean;
        /**
         * Whether to only quote strings if they have space characters.
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        onlyQuoteAsNeeded?: boolean;
        /**
         * The regex used to check for characters in a string that require the
         * string to be quoted.
         *
         * @default /[^a-z|0-9|\-|_]/i
         *
         * @since 0.1.0-beta.0.draft
         */
        requiredQuotesRegex?: RegExp;
        /**
         * The regex used to check for characters in a key that require the
         * key to be quoted.
         *
         * @default /[^a-z|0-9|\-|_]/i
         *
         * @since 0.1.0-beta.0.draft
         */
        requiredQuotesKeyRegex?: RegExp;
        /**
         * Whether numerical strings should be unquoted with the `sass:string`
         * module. Requires `useStringModule` to be true.
         *
         * @default true
         *
         * @since 0.1.0-beta.0.draft
         */
        unquoteNumberString?: boolean;
        /**
         * Whether the `sass:string` module is available for use by the output
         * as a namespace called 'string'.
         *
         * @default false
         *
         * @since 0.1.0-beta.0.draft
         */
        useStringModule?: boolean;
    }
    /**
     * Converts a js value into a valid scss string.
     *
     * Quasi-sanitizes output by converting to JSON and back before interpreting.
     */
    function convert<T_Type extends unknown>(json: T_Type, _indent?: string, _opts?: Opts): string | undefined;
}
