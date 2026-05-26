import { FeatureCheck } from './FeatureCheck.js';

//#region Simple
// run the checks and update class names
new FeatureCheck().check();
//#endregion Simple


//#region Custom
const custom = {

    backgroundGradient: {
        test: () => FeatureCheck.supportsCSS(
            'background: linear-gradient( to right, red, blue )'
        ),
    },

    // never indicate support for subgrid
    subgrid: {
        test: false,
    },
} satisfies FeatureCheck.CustomCheckerOpts;

const opts = {

    checks: {
        // this skips the test and always disables this feature
        whereSelector: false,
    },

    custom,

    // outputs each test and its results to console.info()
    outputResults: true,

} satisfies FeatureCheck.OptsInput;

// run the checks and update class names
new FeatureCheck( opts ).check();
//#endregion Custom
