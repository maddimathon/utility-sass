/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Converts a JSON object to a scss list or map.
 * 
 * @since ___PKG_VERSION___
 */
export namespace JsonToScss {

    /**
     * Converts a js value into a valid scss string.
     * 
     * Quasi-sanitizes output by converting to JSON and back before interpreting.
     */
    export function convert( json: any, _indent: string = '' ) {
        json = JSON.parse( JSON.stringify( json ) );

        const type = typeof json;

        let scss: string | undefined;

        switch ( type ) {

            case 'boolean':
            case 'bigint':
            case 'number':
                scss = json.toString();
                break;

            case 'string':
                scss = convert_string( json );
                break;

            case 'object':
                scss = convert_object( json );
                break;
        }

        // returns
        if ( !scss || !_indent.length ) {
            return scss;
        }

        return scss.split( /\n/g ).map( _line => _indent + _line ).join( '\n' );
    };

    /**
     * Converts an array to scss, calling the convert function as needed.
     */
    function convert_array( input: any[] ): string {

        // returns
        if ( !input.length ) {
            return '()';
        }

        return '(\n' + input.map( i => convert( i, '    ' ) ).filter( i => typeof i !== 'undefined' ).join( ',\n' ) + '\n)';
    }

    /**
     * Converts any object to scss, calling the convert function as needed.
     */
    function convert_object( input: object ): string {

        // returns
        if ( Array.isArray( input ) ) {
            return convert_array( input );
        }

        const scss: string[] = [];

        for ( const _t_key in input ) {
            const _key = _t_key as keyof typeof input;

            const _converted = JsonToScss.convert( input[ _key ], '    ' )?.trim();

            if ( typeof _converted !== 'undefined' ) {
                scss.push( `    ${ JsonToScss.convert( _key ) }: ${ _converted }` );
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
    function convert_string( input: string ): string {

        const hasSingleQuote = input.match( /'/ ) !== null;
        const hasDoubleQuote = input.match( /"/ ) !== null;

        // returns
        if ( !hasSingleQuote ) {
            return `'${ input }'`;
        }

        // returns
        if ( !hasDoubleQuote ) {
            return `"${ input }"`;
        }

        return `'${ input.replace( /'/gi, '\\\'' ) }'`;
    }
}