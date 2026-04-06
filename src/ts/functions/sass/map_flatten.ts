/**
 * @since __PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    CLI,
    Config,
} from '@maddimathon/build-utilities';

import type {
    Logger,
} from '@maddimathon/build-utilities/internal';

import Immutable from 'immutable';
import * as sass from "sass-embedded";

// import { mapFlattenAsync } from '@maddimathon/utility-typescript/functions/objects/mapFlattenAsync';

import { sassAssertValueType } from '../sassAssertValueType.js';
import { sassValueToJS } from '../sassValueToJS.js';
// import { jsValueToSass } from '../jsValueToSass.js';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a var dump to the console.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_map_flatten(
    { console }: {
        config: Config.Class,
        console: Logger,
        params: CLI.Params,
    },
) {
    const _emptyMap = new sass.SassMap();

    const _emptyString = new sass.SassString();
    const _rootString = new sass.SassString( '$' );

    const mapFlattener = async (
        map: sass.SassMap,
        prefix?: string,
        suffix?: string,
    ): Promise<sass.SassMap> => {

        // returns - empty
        if ( !map.contents ) {
            return _emptyMap;
        }

        const _includeSuffix = !!suffix?.length;

        const sassSuffix = suffix ? new sass.SassString( suffix, { quotes: false } ) : null;

        const key_addSuffix = ( key: string | sass.SassNumber | sass.SassString ): sass.SassString => {

            // returns
            if ( typeof key === 'string' ? !key : !key.isTruthy ) {
                return _includeSuffix && sassSuffix ? sassSuffix : _emptyString;
            }

            const stringKey = key.toString().replace( /^['"](.*)['"]$/g, '$1' );

            // returns
            if ( typeof key === 'string' ) {
                return new sass.SassString( _includeSuffix ? `${ stringKey }-${ suffix }` : stringKey, { quotes: false } );
            }

            // returns
            if ( _includeSuffix ) {
                return new sass.SassString( `${ stringKey }-${ suffix }`, { quotes: false } );
            }

            return new sass.SassString( stringKey, { quotes: false } );
        };

        const key_validate_addPrefix = ( key: sass.SassNumber | sass.SassString ): string => [
            prefix,
            key.equals( _rootString ) ? '' : key.toString().replace( /^['"](.*)['"]$/g, '$1' ),
        ].filter( v => v?.length ).join( '-' );

        return Promise.all(
            ( Array.from( map.contents.entries() ) as [ sass.SassNumber | sass.SassString, sass.Value ][] ).map(
                async ( [ t_key, value ] ): Promise<false | [ sass.SassString, sass.Value ][]> => {

                    const key = key_validate_addPrefix( t_key );

                    // returns
                    switch ( sassValueToJS.typeOf( value ) ) {

                        case 'undefined':
                            return false;

                        case 'map':
                            return mapFlattener( value as sass.SassMap, key, suffix ).then(
                                value_flat => {
                                    // returns - empty
                                    if ( !value_flat.contents ) {
                                        return [ [ key_addSuffix( key ), _emptyMap ] ];
                                    }

                                    return Array.from( value_flat.contents.entries() ) as [ sass.SassString, sass.Value ][];
                                }
                            );
                    }

                    return [ [ key_addSuffix( key ), value ] ];
                }
            )
        ).then(
            entries => new sass.SassMap( Immutable.OrderedMap( entries.filter( item => item !== false ).flat() ) )
        );
    };

    return {
        'mmutils-map-flatten( $map, $prefix: null, $suffix: null )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'map', 'map', args[ 0 ], false, ),
                sassAssertValueType( 'prefix', 'string', args[ 1 ], true ),
                sassAssertValueType( 'suffix', 'string', args[ 2 ], true ),
            ] ).then(
                ( [ map, prefix, suffix ] ) => {
                    // returns - empty
                    if ( !map ) {
                        return _emptyMap;
                    }

                    // return mapFlattenAsync( map, { prefix, separator: '-', suffix } ).then(
                    //     flatMap => jsValueToSass( flatMap as Map<number | string, jsValueToSass.SimpleAcceptedValues> )
                    // );
                    return mapFlattener( map, prefix, suffix );
                }
            ),
    } as const satisfies { [ key: string ]: sass.CustomFunction<'async'>; };
}