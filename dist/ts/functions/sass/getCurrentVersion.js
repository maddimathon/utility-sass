/**
 * @since 0.1.0-alpha.8
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.10
 * @license MIT
 */
import Immutable from 'immutable';
import semver from 'semver';
import * as sass from "sass-embedded";
/**
 * A function to include in {@link sass.Options} that gets the version of the
 * active sass compiler.
 *
 * @since 0.1.0-alpha.8
 */
export async function sass_getCurrentVersion() {
    let version;
    try {
        version = semver.coerce(sass.info.replace(/^[\n\s]*sass(-embedded)([\n\s]+|$)/gi, ''), {
            includePrerelease: true,
            loose: true,
        });
    }
    catch (err) {
        version = null;
    }
    // returns
    if (version === null) {
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
                ? Array.isArray(version.prerelease) && version.prerelease.length
                    ? new sass.SassList(version.prerelease.map(_str => new sass.SassString(_str)))
                    : sass.sassNull
                : sass.sassNull,
        ],
        [
            new sass.SassString('meta'),
            version.build
                ? Array.isArray(version.build) && version.build.length
                    ? new sass.SassList(version.build.map(_str => new sass.SassString(_str)))
                    : sass.sassNull
                : sass.sassNull,
        ],
    ]));
}
//# sourceMappingURL=getCurrentVersion.js.map