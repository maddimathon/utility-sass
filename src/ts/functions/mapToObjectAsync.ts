/**
 * @since 0.1.0-alpha.32
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 * 
 * @since 0.1.0-alpha.32
*/
export async function mapToObjectAsync<
    T_Keys extends unknown,
    T_Values extends unknown,
>( map: Map<T_Keys, T_Values> ): Promise<Record<
    T_Keys & ( number | string | symbol ),
    T_Values
>> {

    return Promise.all(
        Array.from( map.entries() ).map(
            async ( [ key, value ] ): Promise<[ T_Keys, T_Values ]> => {
                // returns
                if ( !( value instanceof Map ) ) {
                    return [ key, value ];
                }

                return mapToObjectAsync( value ).then( val => [ key, val ] );
            }
        )
    ).then(
        ( arr ) => Object.fromEntries( arr )
    );
}