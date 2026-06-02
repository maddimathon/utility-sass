import { FeatureCheck } from './FeatureCheck.js';

//#region Simple
// run the checks and update root element’s class names
new FeatureCheck().check();
//#endregion Simple


//#region Custom
// create custom feature checks or replace the default tests
const custom = {

    backgroundGradient: {
        test: () => FeatureCheck.supportsCSS(
            'background: linear-gradient( to right, red, blue )'
        ),
    },

    subgrid: {
        // i.e.: never indicate support for subgrid
        test: false,
    },
} satisfies FeatureCheck.CustomCheckerOpts;

const opts = {

    checks: {
        // i.e.: skip this test and never indicate support for this feature
        whereSelector: false,
    },

    custom,

    // logs each test and its results via console.info()
    outputResults: true,

} satisfies FeatureCheck.OptsInput;

// run the checks (including custom) and update root element’s class names
new FeatureCheck( opts ).check();
//#endregion Custom
