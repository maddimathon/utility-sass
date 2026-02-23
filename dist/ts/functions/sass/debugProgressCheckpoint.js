/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.32
 * @license MIT
 */
import { DateTime } from 'luxon';
import * as sass from "sass-embedded";
import { sassAssertValueType } from '../sassAssertValueType.js';
/**
 * A function to include in {@link sass.Options} that outputs a named timestamp
 * to the console (good for debugging compile time).
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_debugProgressCheckpoint({ config, console, params }) {
    return [
        'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )',
        async (args) => {
            const time = DateTime.now();
            const [level = 1, location = 'debug checkpoint', output = true, verbose = false,] = await Promise.all([
                sassAssertValueType('number', args[2]),
                sassAssertValueType('string', args[0]),
                sassAssertValueType('bool', args[1]),
                sassAssertValueType('bool', args[3]),
            ]);
            const message = `${location} @ ${time.toFormat('H:mm:ss.SSS')}`;
            if (output || params.debug || params.verbose) {
                if (!verbose || params.verbose) {
                    console.log(message, level, {
                        clr: 'grey',
                        italic: true,
                        linesIn: 0,
                        linesOut: 0,
                    });
                }
            }
            return new sass.SassString(message);
        },
    ];
}
//# sourceMappingURL=debugProgressCheckpoint.js.map