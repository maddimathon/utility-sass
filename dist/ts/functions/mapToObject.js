/**
 * @since 0.1.0-alpha.32
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.35
 * @license MIT
 */
/**
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 *
 * @since 0.1.0-alpha.32
*/
export function mapToObject(map) {
    const entries = Array.from(map.entries()).map(([key, value]) => {
        // returns
        if (!(value instanceof Map)) {
            return [key, value];
        }
        return [key, mapToObject(value)];
    });
    return Object.fromEntries(entries);
}
//# sourceMappingURL=mapToObject.js.map