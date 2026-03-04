/**
 * @since 0.1.0-alpha.8
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@___CURRENT_VERSION___
 * @license MIT
 */

import { OrderedMap } from 'immutable';
import * as sass from "sass-embedded";
import semver from 'semver';

/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * gets the version of the active sass compiler.
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.8
 */
export function sassFn_getCurrentVersion() {

    return {
        'mmutils-global-getCurrentVersion()': () => {
            let version: semver.SemVer | null;

            try {
                version = semver.coerce(
                    sass.info.replace(
                        /^[\n\s]*sass(-embedded)([\n\s]+|$)/gi,
                        '',
                    ),
                    {
                        includePrerelease: true,
                        loose: true,
                    },
                );
            } catch ( err ) {

                version = null;
            }

            // returns
            if ( version === null ) {

                return new sass.SassMap(
                    OrderedMap( [
                        [ new sass.SassString( 'major' ), new sass.SassNumber( 0 ) ],
                        [ new sass.SassString( 'minor' ), new sass.SassNumber( 0 ) ],
                        [ new sass.SassString( 'patch' ), new sass.SassNumber( 0 ) ],

                        [ new sass.SassString( 'prerelease' ), sass.sassNull ],
                        [ new sass.SassString( 'meta' ), sass.sassNull ],
                    ] )
                );
            }

            return new sass.SassMap(
                OrderedMap( [
                    [ new sass.SassString( 'major' ), new sass.SassNumber( version.major ) ],
                    [ new sass.SassString( 'minor' ), new sass.SassNumber( version.minor ) ],
                    [ new sass.SassString( 'patch' ), new sass.SassNumber( version.patch ) ],
                    [
                        new sass.SassString( 'prerelease' ),
                        version.prerelease
                            ? Array.isArray( version.prerelease ) && version.prerelease.length
                                ? new sass.SassList( version.prerelease.map(
                                    _str => new sass.SassString( _str )
                                ) )
                                : sass.sassNull
                            : sass.sassNull,
                    ],
                    [
                        new sass.SassString( 'meta' ),
                        version.build
                            ? Array.isArray( version.build ) && version.build.length
                                ? new sass.SassList( version.build.map(
                                    _str => new sass.SassString( _str )
                                ) )
                                : sass.sassNull
                            : sass.sassNull,
                    ],
                ] )
            );
        }
    } as const satisfies { [ key: string ]: sass.CustomFunction<'async'>; };
}