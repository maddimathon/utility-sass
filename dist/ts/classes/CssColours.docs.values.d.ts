/**
 * @since 0.1.0-beta.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-beta.1
 * @license MIT
 */
export declare const colourValues: {
    hex: {
        short: '#f8c';
        full: '#ff88cc';
    };
    hsl: {
        h: -172.08;
        s: 68.187;
        l: 35.2;
    };
    hwb: {
        h: -44.64;
        w: 30.2;
        b: 50.2;
    };
    lab: {
        l: 45.186;
        a: -109.1;
        b: -9.3;
    };
    oklab: {
        l: 0.452;
        a: -0.35;
        b: -0.029;
    };
    lch: {
        l: 70.2;
        c: -32.625;
        h: -223.2;
    };
    oklch: {
        l: 0.74;
        c: -0.12;
        h: -217.08;
    };
    rgb: {
        r: 45.186;
        g: 40.188;
        b: 68.187;
    };
};
type Parsed = ['hex', {
    r: number;
    g: number;
    b: number;
    space: 'hex';
}] | ['hsl', typeof colourValues.hsl & {
    space: 'hsl';
}] | ['hsla', typeof colourValues.hsl & {
    space: 'hsl';
    alpha: 85;
}] | ['hwb', typeof colourValues.hwb & {
    space: 'hwb';
}] | ['hwba', typeof colourValues.hwb & {
    space: 'hwb';
    alpha: 85;
}] | ['lab', typeof colourValues.lab & {
    space: 'lab';
}] | ['laba', typeof colourValues.lab & {
    space: 'lab';
    alpha: 85;
}] | ['lch', typeof colourValues.lch & {
    space: 'lch';
}] | ['lcha', typeof colourValues.lch & {
    space: 'lch';
    alpha: 85;
}] | ['oklab', typeof colourValues.oklab & {
    space: 'oklab';
}] | ['oklaba', typeof colourValues.oklab & {
    space: 'oklab';
    alpha: 0.85;
}] | ['oklch', typeof colourValues.oklch & {
    space: 'oklch';
}] | ['oklcha', typeof colourValues.oklch & {
    space: 'oklch';
    alpha: 0.85;
}] | ['rgb', typeof colourValues.rgb & {
    space: 'rgb';
}] | ['rgba', typeof colourValues.rgb & {
    space: 'rgb';
    alpha: 85;
}];
declare const colourValuesParsedEntries: Parsed[];
export declare const colourValuesParsed: { [K in (typeof colourValuesParsedEntries)[number][0]]: Extract<(typeof colourValuesParsedEntries)[number][1], {
    space: K;
}>; };
type ValueTestKeys = 'hex' | 'hsl' | 'hsla' | 'hwb' | 'hwba' | 'lab' | 'laba' | 'lch' | 'lcha' | 'oklab' | 'oklaba' | 'oklch' | 'oklcha' | 'rgb' | 'rgba';
export declare const colourValueFunctions: {
    readonly [K in ValueTestKeys]: readonly string[];
};
export {};
