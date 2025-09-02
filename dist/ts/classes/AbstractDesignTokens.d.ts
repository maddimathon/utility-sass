/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.draft
 * @license MIT
 */
/**
 * An abstract class for any level of the design tokens.
 *
 * @since 0.1.0-alpha.draft
 */
export declare abstract class AbstractDesignTokens {
    abstract toJSON(): object;
    abstract toVars(): object;
    abstract toSCSS(): {
        [key: string]: string;
    };
}
//# sourceMappingURL=AbstractDesignTokens.d.ts.map