/**
 * @since 0.1.0-alpha.32
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.32
 * @license MIT
 */
/**
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 *
 * @since 0.1.0-alpha.32
*/
export async function mapToObjectAsync(map) {
    return Promise.all(Array.from(map.entries()).map(async ([key, value]) => {
        // returns
        if (!(value instanceof Map)) {
            return [key, value];
        }
        return mapToObjectAsync(value).then(val => [key, val]);
    })).then((arr) => Object.fromEntries(arr));
}
//# sourceMappingURL=mapToObjectAsync.js.map