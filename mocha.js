



// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<html><head></head><body></body></html>';

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = global.document.defaultView;

// Allow for things like window.location
global.navigator = global.window.navigator;

let spyFn;
let stubFn;
let mockFn;
let useFakeTimersFn;
global.createSpy = (...args) => spyFn(...args);
global.createStub = (...args) => stubFn(...args);
global.createMock = (...args) => mockFn(...args);
global.useFakeTimers = (...args) => useFakeTimersFn(...args);
const throwMustUseInsideStartTests = name => {
    throw new Error(`Can only use "${name}" inside "startTests" scope.`);
};

const initTestUtilsWithErrors = () => {
    spyFn = () => {
        throwMustUseInsideStartTests('spy');
    };
    stubFn = () => {
        throwMustUseInsideStartTests('stub');
    };
    mockFn = () => {
        throwMustUseInsideStartTests('mock');
    };
    useFakeTimersFn = () => {
        throwMustUseInsideStartTests('useFakeTimers');
    };
};
const initTestUtils = sandbox => {
    spyFn = (...args) => sandbox.spy(...args);
    stubFn = (...args) => {
        console.time('STUB');
        const stub = sandbox.stub(...args);
        console.timeEnd('STUB');
        return stub;
    };
    mockFn = (...args) => sandbox.mock(...args);
    useFakeTimersFn = (...args) => sandbox.useFakeTimers(...args);
};

initTestUtilsWithErrors();
// Disabling no undef for some mocha variables, better deal using the the test eslint which knows about mocha globals
/* eslint-disable no-undef */
global.startTests = cb => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        initTestUtils(sandbox);
    });
    afterEach(() => {
        sandbox.restore();
    });
    after(() => {
        initTestUtilsWithErrors();
    });
    cb();
};
/* eslint-enable  no-undef */

