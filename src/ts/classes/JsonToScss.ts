/**
 * @since 0.1.0-pre.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import { CssColours } from './CssColours.js';

/**
 * Converts a JSON object to a scss list or map (as a string, to be written to a
 * *.scss file).
 *
 * @category Utilities
 *
 * @since 0.1.0-pre.0
 */
export namespace JsonToScss {

    /**
     * Options for the conversion function.
     * 
     * @since 0.1.0-alpha.32
     */
    export interface Opts {

        /**
         * Whether map keys should always be quoted, no matter their value.
         * 
         * @default false
         *
         * @since ___PKG_VERSION___
         */
        alwaysQuoteKeys?: boolean;

        /**
         * Whether map keys should always be quoted if they are a number
         * (regardless of {@link Opts.convertUnitStringsToNumbers} and
         * {@link Opts.convertUnitStringsToNumbers} values).
         *
         * @default true
         *
         * @since ___PKG_VERSION___
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
         * @since ___PKG_VERSION___
         */
        convertUnitStringsToNumbers?: boolean;

        /**
         * Whether to translate strings of numbers equalling to zero as numbers
         * in the sass output (instead of as strings).
         * 
         * @default false
         *
         * @since ___PKG_VERSION___
         */
        convertZeroStringsToNumbers?: boolean;

        /**
         * Whether to output detected css strings as quoted strings instead of
         * unquoted values.
         * 
         * @default false
         *
         * @since ___PKG_VERSION___
         */
        cssFunctionsAsStrings?: boolean;

        /**
         * Whether to only quote strings if they have space characters.
         * 
         * @default false
         *
         * @since ___PKG_VERSION___
         */
        onlyQuoteAsNeeded?: boolean;

        /**
         * The regex used to check for characters in a string that require the
         * string to be quoted.
         *
         * @default /[^a-z|0-9|\-|_]/i
         *
         * @since ___PKG_VERSION___
         */
        requiredQuotesRegex?: RegExp;

        /**
         * The regex used to check for characters in a key that require the
         * key to be quoted.
         * 
         * @default /[^a-z|0-9|\-|_]/i
         *
         * @since ___PKG_VERSION___
         */
        requiredQuotesKeyRegex?: RegExp;

        /**
         * Whether numerical strings should be unquoted with the `sass:string`
         * module. Requires `useStringModule` to be true.
         *
         * @default true
         *
         * @since ___PKG_VERSION___
         */
        unquoteNumberString?: boolean;

        /**
         * Whether the `sass:string` module is available for use by the output
         * as a namespace called 'string'.
         * 
         * @default false
         *
         * @since ___PKG_VERSION___
         */
        useStringModule?: boolean;
    }

    /**
     * Converts a js value into a valid scss string.
     * 
     * Quasi-sanitizes output by converting to JSON and back before interpreting.
     */
    export function convert<T_Type extends unknown>(
        json: T_Type,
        _indent: string = '',
        _opts?: Opts,
    ): string | undefined {

        const opts = {
            alwaysQuoteKeys: false,
            alwaysQuoteNumberKeys: true,

            coloursAsStrings: _opts?.cssFunctionsAsStrings ?? false,

            convertUnitStringsToNumbers: false,
            convertZeroStringsToNumbers: false,

            cssFunctionsAsStrings: false,
            onlyQuoteAsNeeded: false,

            requiredQuotesRegex: /[^a-z|0-9|\-|_]/i,
            requiredQuotesKeyRegex: /[^a-z|0-9|\-|_]/i,

            useStringModule: false,

            ..._opts,

            unquoteNumberString: ( _opts?.unquoteNumberString ?? true ) && ( _opts?.useStringModule ?? false ),

        } satisfies Required<Opts>;

        let scss: string | undefined;

        switch ( typeof json ) {

            case 'boolean':
            case 'bigint':
            case 'number':
                scss = json.toString();
                break;

            case 'string':
                scss = convert_string( json, opts );
                break;

            case 'object':

                // returns
                if ( !json ) {
                    return undefined;
                }

                json = JSON.parse( JSON.stringify( json ) );

                scss = convert_object( json as object, opts );
                break;

            case 'undefined':
                return undefined;
        }

        // returns
        if ( !scss?.length || !_indent.length ) {
            return scss;
        }

        return scss.split( /\n/g ).map( _line => _indent + _line ).join( '\n' );
    };

    /**
     * Converts an array to scss, calling the convert function as needed.
     */
    function convert_array( input: any[], opts: Required<Opts> ): string {

        // returns
        if ( !input.length ) {
            return '()';
        }

        return '(\n' + input.map( i => convert( i, '    ', opts ) ).filter( i => typeof i !== 'undefined' ).join( ',\n' ) + '\n)';
    }

    /**
     * Converts any object to scss, calling the convert function as needed.
     */
    function convert_object( input: object, opts: Required<Opts> ): string {

        // returns
        if ( Array.isArray( input ) ) {
            return convert_array( input, opts );
        }

        const scss: string[] = [];

        for ( const _t_key in input ) {
            const _key = _t_key as keyof typeof input;

            const _convertedValue = convert(
                input[ _key ],
                '    ',
                opts,
            )?.trim();

            if ( typeof _convertedValue !== 'undefined' ) {

                const _keyType = typeof _key;

                const _convertedKey = opts.alwaysQuoteKeys
                    ? quote_string( _key )
                    : convert(
                        opts.alwaysQuoteNumberKeys && ( _keyType === 'bigint' || _keyType === 'number' ) ? String( _key ) : _key,
                        undefined,
                        {
                            ...opts,

                            convertUnitStringsToNumbers: opts.alwaysQuoteNumberKeys ? false : opts.convertUnitStringsToNumbers,
                            convertZeroStringsToNumbers: opts.alwaysQuoteNumberKeys ? false : opts.convertZeroStringsToNumbers,

                            requiredQuotesRegex: opts.requiredQuotesKeyRegex,

                            useStringModule: false,
                        },
                    );

                scss.push( `    ${ _convertedKey }: ${ _convertedValue }` );
            }
        }

        // returns
        if ( !scss.length ) {
            return '()';
        }

        return '(\n' + scss.join( ',\n' ) + '\n)';
    }

    /**
     * Converts a string for proper scss output.
     */
    function convert_string( input: string, opts: Required<Opts> ): string {

        // returns - if it is a colour string, it gets no quotes
        if (
            !opts.coloursAsStrings && (
                input.match( /^\s*#[0-9|A-H]{3,6}\s*$/i )
                || input.match( /^\s*hsl\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+%?\s*[,\s]\s*[\d\.]+%?\s*\)\s*$/i )
                || input.match( /^\s*(ok)?l(ch|ab)\(\s*[\d\.]+%?\s+\s*[\d\.]+\s+\s*[\d\.]+(deg|g?rad|turn)?\s*\)\s*$/i )
                || input.match( /^\s*rgb\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*\)\s*$/i )
            )
        ) {
            return `${ input }`;
        }

        const isUnitedNumber = input.match( /^\s*-?\d[\d\.]*(%|[cm]m|cq(b|h|i|w|max|min)|deg|in|m?s|p[ctx]|g?rad|r?(c(ap|h)|e[mx]|ic|lh)|turn|[dls]?v(b|h|i|w|max|min)|Q)\s*$/i ) !== null;
        const isZeroNumber = input.match( /^\s*-?0[0\.]*\s*$/i ) !== null;

        // returns - no quotes
        if (
            ( isUnitedNumber && opts.convertUnitStringsToNumbers )
            || ( isZeroNumber && opts.convertZeroStringsToNumbers )
        ) {
            return `${ input }`;
        }

        // returns - maybe unquoted
        if (
            isUnitedNumber
            || isZeroNumber
            || input.match( /^\s*-?\d[\d\.]*\s*$/i ) !== null
        ) {
            return quote_string(
                input,
                opts.useStringModule && opts.unquoteNumberString,
            );
        }

        // returns - this is a css function
        if (
            !opts.cssFunctionsAsStrings
            && input.match( /^\s*(calc|clamp|max|min|url|var)\(.+\)\s*$/i )
        ) {
            return `${ input }`;
        }

        // returns - not a colour slug, not a number, & only characters that don't need quotes means no quotes
        if (
            opts.onlyQuoteAsNeeded
            && !CssColours.isSlug( input )
            && input.match( opts.requiredQuotesRegex ) === null
        ) {

            // returns - as an unquoted string if possible
            switch ( input ) {

                case 'currentColor':
                case 'inherit':
                    return `${ input }`;

                default:
                    // returns
                    if ( CssColours.isKeyword( input ) ) {
                        return quote_string( input, opts.useStringModule );
                    }

                    return `${ input }`;
            }
        }

        return quote_string( input );
    }

    /**
     * Quotes the given string for scss output.
     * 
     * @since ___PKG_VERSION___
     */
    function quote_string( input: string, unquote: boolean = false ) {

        const hasSingleQuote = input.match( /'/ ) !== null;
        const hasDoubleQuote = input.match( /"/ ) !== null;

        // returns
        if ( !hasSingleQuote ) {
            return unquote ? `string.unquote( '${ input }' )` : `'${ input }'`;
        }

        // returns
        if ( !hasDoubleQuote ) {
            return unquote ? `string.unquote( "${ input }" )` : `"${ input }"`;
        }

        input = input.replace( /'/gi, '\\\'' );

        return unquote ? `string.unquote( '${ input }' )` : `'${ input }'`;
    }
}