/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.0.draft
 * @license MIT
 */
import { CssColours } from './CssColours.js';
/**
 * Converts a JSON object to a scss list or map (as a string, to be written to a
 * *.scss file).
 *
 * @category Utilities
 *
 * @since 0.1.0-pre.0
 */
export var JsonToScss;
(function (JsonToScss) {
    /**
     * Converts a js value into a valid scss string.
     *
     * Quasi-sanitizes output by converting to JSON and back before interpreting.
     */
    function convert(json, _indent = '', _opts) {
        var _a, _b, _c;
        const opts = Object.assign(Object.assign({ alwaysQuoteKeys: false, alwaysQuoteNumberKeys: true, coloursAsStrings: (_a = _opts === null || _opts === void 0 ? void 0 : _opts.cssFunctionsAsStrings) !== null && _a !== void 0 ? _a : false, convertUnitStringsToNumbers: false, convertZeroStringsToNumbers: false, cssFunctionsAsStrings: false, onlyQuoteAsNeeded: false, requiredQuotesRegex: /[^a-z|0-9|\-|_]/i, requiredQuotesKeyRegex: /[^a-z|0-9|\-|_]/i, useStringModule: false }, _opts), { unquoteNumberString: ((_b = _opts === null || _opts === void 0 ? void 0 : _opts.unquoteNumberString) !== null && _b !== void 0 ? _b : true) && ((_c = _opts === null || _opts === void 0 ? void 0 : _opts.useStringModule) !== null && _c !== void 0 ? _c : false) });
        let scss;
        switch (typeof json) {
            case 'boolean':
            case 'bigint':
            case 'number':
                scss = json.toString();
                break;
            case 'string':
                scss = convert_string(json, opts);
                break;
            case 'object':
                // returns
                if (!json) {
                    return undefined;
                }
                json = JSON.parse(JSON.stringify(json));
                scss = convert_object(json, opts);
                break;
            case 'undefined':
                return undefined;
        }
        // returns
        if (!(scss === null || scss === void 0 ? void 0 : scss.length) || !_indent.length) {
            return scss;
        }
        return scss.split(/\n/g).map(_line => _indent + _line).join('\n');
    }
    JsonToScss.convert = convert;
    ;
    /**
     * Converts an array to scss, calling the convert function as needed.
     */
    function convert_array(input, opts) {
        // returns
        if (!input.length) {
            return '()';
        }
        return '(\n' + input.map(i => convert(i, '    ', opts)).filter(i => typeof i !== 'undefined').join(',\n') + '\n)';
    }
    /**
     * Converts any object to scss, calling the convert function as needed.
     */
    function convert_object(input, opts) {
        var _a;
        // returns
        if (Array.isArray(input)) {
            return convert_array(input, opts);
        }
        const scss = [];
        for (const _t_key in input) {
            const _key = _t_key;
            const _convertedValue = (_a = convert(input[_key], '    ', opts)) === null || _a === void 0 ? void 0 : _a.trim();
            if (typeof _convertedValue !== 'undefined') {
                const _keyType = typeof _key;
                const _convertedKey = opts.alwaysQuoteKeys
                    ? quote_string(_key)
                    : convert(opts.alwaysQuoteNumberKeys && (_keyType === 'bigint' || _keyType === 'number') ? String(_key) : _key, undefined, Object.assign(Object.assign({}, opts), { convertUnitStringsToNumbers: opts.alwaysQuoteNumberKeys ? false : opts.convertUnitStringsToNumbers, convertZeroStringsToNumbers: opts.alwaysQuoteNumberKeys ? false : opts.convertZeroStringsToNumbers, requiredQuotesRegex: opts.requiredQuotesKeyRegex, useStringModule: false }));
                scss.push(`    ${_convertedKey}: ${_convertedValue}`);
            }
        }
        // returns
        if (!scss.length) {
            return '()';
        }
        return '(\n' + scss.join(',\n') + '\n)';
    }
    /**
     * Converts a string for proper scss output.
     */
    function convert_string(input, opts) {
        // returns - if it is a colour string, it gets no quotes
        if (!opts.coloursAsStrings && (CssColours.parseFunction.hex(input)
            || CssColours.parseFunction.hsl(input)
            || CssColours.parseFunction.rgb(input)
            || input.match(/^\s*hsl\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+%?\s*[,\s]\s*[\d\.]+%?\s*\)\s*$/i)
            || input.match(/^\s*(ok)?l(ch|ab)\(\s*[\d\.]+%?\s+\s*[\d\.]+\s+\s*[\d\.]+(deg|g?rad|turn)?\s*\)\s*$/i)
            || input.match(/^\s*rgb\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*\)\s*$/i))) {
            return `${input}`;
        }
        const isUnitedNumber = input.match(/^\s*-?\d[\d\.]*(%|[cm]m|cq(b|h|i|w|max|min)|deg|in|m?s|p[ctx]|g?rad|r?(c(ap|h)|e[mx]|ic|lh)|turn|[dls]?v(b|h|i|w|max|min)|Q)\s*$/i) !== null;
        const isZeroNumber = input.match(/^\s*-?0[0\.]*\s*$/i) !== null;
        // returns - no quotes
        if ((isUnitedNumber && opts.convertUnitStringsToNumbers)
            || (isZeroNumber && opts.convertZeroStringsToNumbers)) {
            return `${input}`;
        }
        // returns - maybe unquoted
        if (isUnitedNumber
            || isZeroNumber
            || input.match(/^\s*-?\d[\d\.]*\s*$/i) !== null) {
            return quote_string(input, opts.useStringModule && opts.unquoteNumberString);
        }
        // returns - this is a css function
        if (!opts.cssFunctionsAsStrings
            && input.match(/^\s*(calc|clamp|max|min|url|var)\(.+\)\s*$/i)) {
            return `${input}`;
        }
        // returns - not a colour slug, not a number, & only characters that don't need quotes means no quotes
        if (opts.onlyQuoteAsNeeded
            && !CssColours.isSlug(input)
            && input.match(opts.requiredQuotesRegex) === null) {
            // returns - as an unquoted string if possible
            switch (input) {
                case 'currentColor':
                case 'inherit':
                    return `${input}`;
                default:
                    // returns
                    if (CssColours.isKeyword(input)) {
                        return quote_string(input, opts.useStringModule);
                    }
                    return `${input}`;
            }
        }
        return quote_string(input);
    }
    /**
     * Quotes the given string for scss output.
     *
     * @since 0.1.0-beta.0.draft
     */
    function quote_string(input, unquote = false) {
        const hasSingleQuote = input.match(/'/) !== null;
        const hasDoubleQuote = input.match(/"/) !== null;
        // returns
        if (!hasSingleQuote) {
            return unquote ? `string.unquote( '${input}' )` : `'${input}'`;
        }
        // returns
        if (!hasDoubleQuote) {
            return unquote ? `string.unquote( "${input}" )` : `"${input}"`;
        }
        input = input.replace(/'/gi, '\\\'');
        return unquote ? `string.unquote( '${input}' )` : `'${input}'`;
    }
})(JsonToScss || (JsonToScss = {}));
