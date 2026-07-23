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

    calc: {
        // replace the default test
        test: FeatureCheck.supportsCSS( 'width: calc( 0.25em + 10% )' ),
    },

    subgrid: {
        // i.e.: always indicate support for subgrid, without a runtime test
        test: true,
    },
} satisfies FeatureCheck.CustomCheckerOpts;

const opts = {

    checks: {
        // i.e.: do test this feature on FeatureCheck.prototype.check()
        subgrid: true,
        // i.e.: skip this test and never indicate support for this feature
        whereSelector: false,
    },

    custom,

    // logs each test and its results via console.info()
    logResults: true,

} satisfies FeatureCheck.OptsInput;

// you can save this object in a variable if you want to use its test results in
// your script
const features = new FeatureCheck( opts );

// run the checks (including custom) and update root element’s class names
await features.check();

if ( await features.getCheck( 'subgrid' ) ) {
    // some logic that runs only when the browser supports subgrid
}
//#endregion Custom
