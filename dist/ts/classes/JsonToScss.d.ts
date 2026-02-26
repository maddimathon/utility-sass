/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.38
 * @license MIT
 */
/**
 * Converts a JSON object to a scss list or map.
 *
 * @since 0.1.0-pre.0
 */
export declare namespace JsonToScss {
    /**
     * Options for the conversion function.
     *
     * @since 0.1.0-alpha.32
     */
    interface Opts {
        coloursAsStrings?: boolean;
    }
    /**
     * Converts a js value into a valid scss string.
     *
     * Quasi-sanitizes output by converting to JSON and back before interpreting.
     */
    function convert<T_Type extends unknown>(json: T_Type, _indent?: string, opts?: Opts): string | undefined;
}
//# sourceMappingURL=JsonToScss.d.ts.map