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
} from '@maddimathon/build-utilities';

import type {
} from '@maddimathon/build-utilities/internal';

import Immutable from 'immutable';
import * as sass from "sass-embedded";

import { sassAssertValueType } from '../sassAssertValueType.js';
import { sassValueToJS } from '../sassValueToJS.js';
import { toValidNumber } from '@maddimathon/utility-typescript';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * uses js utilities to merge two maps.
 *
 * @category Sass API - Compiler Functions
 *
 * @since __PKG_VERSION___
 */
export function sassFn_map_merge(): {
    'mmutils-map-merge( $defaults, $inputs, $recursive: false, $respectUNDEFINED: false, $sort: false, $sortAs: "string", $sortReverse: false )': sass.CustomFunction<'async'>;
} {
    const _emptyMap = new sass.SassMap();

    const _undefinedString = new sass.SassString( 'UNDEFINED' );

    const mapFlattener = async (
        defaults: sass.SassMap | undefined,
        inputs: sass.SassMap | undefined,
        opts: {
            recursive: boolean;
            respectUNDEFINED: boolean;
            sort: boolean;
            sortAs: string | undefined;
            sortReverse: boolean;
        },
    ): Promise<sass.SassMap> => {
        const newMap = new Map( defaults?.contents?.entries() ?? [] );

        const inputEntries = inputs?.contents?.entries();

        if ( inputEntries ) {
            for ( const [ key, value ] of inputEntries ) {
                const _valueTypeOf = sassValueToJS.typeOf( value );

                // if respect undefined and this is a string, then we will test
                if (
                    opts.respectUNDEFINED
                    && _valueTypeOf === 'string'
                ) {
                    if ( value.equals( _undefinedString ) ) {
                        // then we remove it
                        newMap.delete( key );
                    } else {
                        // replace as normal
                        newMap.set( key, value );
                    }
                }
                // if recursive and this is a map, then we need to recurse
                else if (
                    opts.recursive
                    && _valueTypeOf === 'map'
                    && sassValueToJS.typeOf.isMap( defaults?.get( key ) )
                ) {
                    newMap.set(
                        key,
                        await mapFlattener(
                            defaults?.get( key ) as sass.SassMap | undefined,
                            value as sass.SassMap | undefined,
                            opts,
                        ),
                    );
                } else {
                    newMap.set( key, value );
                }
            }
        }

        // returns
        if ( !opts.sort ) {
            return new sass.SassMap( Immutable.OrderedMap( newMap.entries() ) );
        }

        const entries = Array.from( newMap.entries() );

        const _sortMaker = opts.sortAs === 'number'
            ? ( [ key ]: [ sass.Value, sass.Value ] ) => toValidNumber( sassValueToJS.sync( key ) ) ?? String( sassValueToJS.sync( key ) )
            : ( [ key ]: [ sass.Value, sass.Value ] ) => String( sassValueToJS.sync( key ) );

        entries.sort(
            ( value_a, value_b ) => {
                const sorter_a = _sortMaker( value_a );
                const sorter_b = _sortMaker( value_b );

                if ( sorter_a > sorter_b ) {
                    return 1;
                }

                if ( sorter_a < sorter_b ) {
                    return -1;
                }

                return 0;
            }
        );

        if ( opts.sortReverse ) {
            entries.reverse();
        }

        return new sass.SassMap( Immutable.OrderedMap( entries ) );
    };

    return {
        'mmutils-map-merge( $defaults, $inputs, $recursive: false, $respectUNDEFINED: false, $sort: false, $sortAs: "string", $sortReverse: false )':
            async ( args: sass.Value[] ) => Promise.all( [
                sassAssertValueType( 'defaults', 'map', args[ 0 ], false ),
                sassAssertValueType( 'inputs', 'map', args[ 1 ], false ),
                sassAssertValueType( 'recursive', 'bool', args[ 2 ], true ),
                sassAssertValueType( 'respectUNDEFINED', 'bool', args[ 3 ], true ),
                sassAssertValueType( 'sort', 'bool', args[ 4 ], true ),
                sassAssertValueType( 'sortAs', 'string', args[ 5 ], true ),
                sassAssertValueType( 'sortReverse', 'bool', args[ 6 ], true ),
            ] ).then(
                ( [ defaults, inputs, recursive, respectUNDEFINED, sort, sortAs, sortReverse ] ) => {
                    // returns - empty
                    if ( !defaults || !defaults?.contents?.size ) {
                        return inputs ?? _emptyMap;
                    }

                    // returns - empty
                    if ( !inputs || !inputs?.contents?.size ) {
                        return defaults ?? _emptyMap;
                    }

                    return mapFlattener( defaults, inputs, {
                        recursive: recursive ?? false,
                        respectUNDEFINED: respectUNDEFINED ?? false,
                        sort: sort ?? false,
                        sortAs,
                        sortReverse: sortReverse ?? false,
                    } );
                }
            ),
    } as const satisfies { [ key: string ]: sass.CustomFunction<'async'>; };
}