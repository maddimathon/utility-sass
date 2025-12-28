/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.8
 * @license MIT
 */
import Immutable from 'immutable';
import * as sass from "sass-embedded";
// import { VariableInspector } from '@maddimathon/utility-typescript/classes';
import { SemVer, } from '@maddimathon/build-utilities/internal';
/**
 * Returns a call signature and function to include in {@link sass.Options}.
 *
 * @since 0.1.0-alpha.8
 */
export function sass_getCurrentVersion(console) {
    return async () => {
        let version;
        try {
            version = new SemVer(sass.info.replace(/^[\n\s]*sass(-embedded)([\n\s]+|$)/gi, ''), console);
        }
        catch (err) {
            return new sass.SassMap(Immutable.OrderedMap([
                [new sass.SassString('major'), new sass.SassNumber(0)],
                [new sass.SassString('minor'), new sass.SassNumber(0)],
                [new sass.SassString('patch'), new sass.SassNumber(0)],
                [new sass.SassString('prerelease'), sass.sassNull],
                [new sass.SassString('meta'), sass.sassNull],
            ]));
        }
        // const toDump = {
        //     info: sass.info,
        //     version,
        // };
        return new sass.SassMap(Immutable.OrderedMap([
            [new sass.SassString('major'), new sass.SassNumber(version.major)],
            [new sass.SassString('minor'), new sass.SassNumber(version.minor)],
            [new sass.SassString('patch'), new sass.SassNumber(version.patch)],
            [
                new sass.SassString('prerelease'),
                version.prerelease
                    ? Array.isArray(version.prerelease)
                        ? new sass.SassList(version.prerelease.map(_str => new sass.SassString(_str)))
                        : new sass.SassString(version.prerelease)
                    : sass.sassNull,
            ],
            [
                new sass.SassString('meta'),
                version.meta ? new sass.SassString(version.meta) : sass.sassNull,
            ],
        ]));
        // return new sass.SassList(
        //     [
        //         new sass.SassString( VariableInspector.stringify( { toDump } ) ),
        //     ],
        //     {
        //         brackets: false,
        //         separator: ',',
        //     },
        // );
    };
}
//# sourceMappingURL=getCurrentVersion.js.map