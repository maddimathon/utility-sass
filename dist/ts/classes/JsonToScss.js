/**
 * @since 0.1.0-pre.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.36
 * @license MIT
 */
/**
 * Converts a JSON object to a scss list or map.
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
    function convert(json, _indent = '', opts = {}) {
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
        if (!scss?.length || !_indent.length) {
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
        // returns
        if (Array.isArray(input)) {
            return convert_array(input, opts);
        }
        const scss = [];
        for (const _t_key in input) {
            const _key = _t_key;
            const _converted = convert(input[_key], '    ', opts)?.trim();
            if (typeof _converted !== 'undefined') {
                scss.push(`    ${convert(_key, undefined, opts)}: ${_converted}`);
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
        if (!opts.coloursAsStrings && (input.match(/^\s*#[0-9|A-H]{3,6}$/i)
            || input.match(/^\s*hsl\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+%?\s*[,\s]\s*[\d\.]+%?\s*\)\s*$/i)
            || input.match(/^\s*(ok)?l(ch|ab)\(\s*[\d\.]+%?\s+\s*[\d\.]+\s+\s*[\d\.]+(deg)?\s*\)\s*$/i)
            || input.match(/^\s*rgb\(\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*[,\s]\s*[\d\.]+\s*\)\s*$/i))) {
            return `${input}`;
        }
        const hasSingleQuote = input.match(/'/) !== null;
        const hasDoubleQuote = input.match(/"/) !== null;
        // returns
        if (!hasSingleQuote) {
            return `'${input}'`;
        }
        // returns
        if (!hasDoubleQuote) {
            return `"${input}"`;
        }
        return `'${input.replace(/'/gi, '\\\'')}'`;
    }
})(JsonToScss || (JsonToScss = {}));
//# sourceMappingURL=JsonToScss.js.map