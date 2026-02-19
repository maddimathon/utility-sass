/**
 * @since 0.1.0-alpha.29
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.29
 * @license MIT
 */
import * as sass from "sass-embedded";
/**
 * A function to include in {@link sass.Options} that outputs a var dump to the console.
 *
 * @since 0.1.0-alpha.29
 */
export function sassFn_Template({ config, console, params }) {
    return ['mmutils-global-jsFnTemplate()', async () => {
            return new sass.SassString('hello');
        }];
}
//# sourceMappingURL=@sassFn_Template.js.map