/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { DateTime } from 'luxon';
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
/**
 * Returns a call signature and function to include in {@link sass.Options} that
 * outputs a named timestamp to the console (good for debugging compile time).
 *
 * @category Sass API - Compiler Functions
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_debugProgressCheckpoint({ console, params }) {
    return {
        'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': async (args) => {
            const time = DateTime.now();
            return Promise.all([
                sassAssertValueType('location', 'number', args[2]),
                sassAssertValueType('output', 'string', args[0]),
                sassAssertValueType('level', 'bool', args[1]),
                sassAssertValueType('verbose', 'bool', args[3]),
            ]).then(([level, location, output, verbose]) => {
                const message = `${location?.toString() ?? 'debug checkpoint'} @ ${time.toFormat('H:mm:ss.SSS')}`;
                if ((output?.isTruthy ?? true) || params.debug || params.verbose) {
                    if (!verbose?.isTruthy || params.verbose) {
                        console.log(message, level?.asInt ?? 1, {
                            clr: 'grey',
                            italic: true,
                            linesIn: 0,
                            linesOut: 0,
                        });
                    }
                }
                return new sass.SassString(message);
            });
        },
    };
}
