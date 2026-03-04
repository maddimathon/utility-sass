import { FeatureCheck } from './FeatureCheck.js';

//#region Simple
// run the checks and update class names
new FeatureCheck().check();
//#endregion Simple


//#region Custom
const opts: Partial<FeatureCheck.CheckerOpts> = {

    // this skips the test and always disables this feature
    whereSelector: false,
};

const customChecks: FeatureCheck.CustomChecker[] = [
    {
        slug: 'backgroundGradient',
        test: () => FeatureCheck.supportsCSS(
            'background: linear-gradient( to right, red, blue )'
        ),
    },
    {
        slug: 'exampleFeature',
        test: false,
    },
];

// run the checks and update class names
new FeatureCheck( opts, customChecks ).check();
//#endregion Custom
