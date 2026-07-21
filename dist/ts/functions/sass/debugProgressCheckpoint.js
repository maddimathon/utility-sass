/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        'mmutils-global-debugProgressCheckpoint( $location, $output: false, $level: 1, $verbose: false )': (args) => __awaiter(this, void 0, void 0, function* () {
            const time = DateTime.now();
            return Promise.all([
                sassAssertValueType('location', 'number', args[2]),
                sassAssertValueType('output', 'string', args[0]),
                sassAssertValueType('level', 'bool', args[1]),
                sassAssertValueType('verbose', 'bool', args[3]),
            ]).then(([level, location, output, verbose]) => {
                var _a, _b, _c;
                const message = `${(_a = location === null || location === void 0 ? void 0 : location.toString()) !== null && _a !== void 0 ? _a : 'debug checkpoint'} @ ${time.toFormat('H:mm:ss.SSS')}`;
                if (((_b = output === null || output === void 0 ? void 0 : output.isTruthy) !== null && _b !== void 0 ? _b : true) || params.debug || params.verbose) {
                    if (!(verbose === null || verbose === void 0 ? void 0 : verbose.isTruthy) || params.verbose) {
                        console.log(message, (_c = level === null || level === void 0 ? void 0 : level.asInt) !== null && _c !== void 0 ? _c : 1, {
                            clr: 'grey',
                            italic: true,
                            linesIn: 0,
                            linesOut: 0,
                        });
                    }
                }
                return new sass.SassString(message);
            });
        }),
    };
}
