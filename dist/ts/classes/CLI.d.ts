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
 * This class runs the CLI.
 *
 * @since 0.1.0-alpha.draft
 */
export declare class CLI {
    protected readonly params: Partial<CLI.Params>;
    constructor(params: Partial<CLI.Params>);
    /**
     * Runs the command according to the passed params.
     */
    go(): void | Promise<void>;
    protected compileTokens(): Promise<void>;
    protected help(): void;
    protected unknownCommand(): void;
}
/**
 * Utilities for the {@link CLI} class.
 *
 * @since 0.1.0-alpha.draft
 */
export declare namespace CLI {
    /**
     * Possible command options for the CLI.
     *
     * @since 0.1.0-alpha.draft
     */
    type Command = "debug" | "help" | "compile-tokens";
    /**
     * Accepted command line params (parsed via minimist).
     *
     * @since 0.1.0-alpha.draft
     */
    type Params = {
        _: string[];
        debug: boolean;
    } & (Params.CompileTokens);
    /**
     * Variations of the input params depending on command.
     *
     * @since 0.1.0-alpha.draft
     */
    namespace Params {
        /**
         * Accepted command line params for the compile-tokens command.
         *
         * @since 0.1.0-alpha.draft
         */
        interface CompileTokens {
            /**
             * Path to the file, if any, that defines the default token
             * overrides. Should be a JS file with a default exported object
             * that satisfies the {@link DesignTokens.Input} interface.
             */
            in?: string;
            /**
             * Output location for the SCSS tokens.
             */
            out: string;
            /**
             * Whether to output scss tokens as default values.
             *
             * @default false
             */
            tokensAsDefault?: boolean;
        }
    }
}
//# sourceMappingURL=CLI.d.ts.map