exports.config = {
    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 11000,
    // List test code
    specs:
    [
        //'test/E2E/**/*.js',
        'test/E2E/spec.js'
    ],
    // Don't try to run these things as tests
    exclude: [],
    //List browsers to use
    capabilities:
    {
        'browserName': 'chrome'
    },
     //This is how you test with multiple browsers at once
    /*
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }],
    */
    // Tells protractor to directly use chrome and firefox, does not support ie
    'directConnect': true,
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: "http://localhost:8080",
    // Specify testing framework to use
    framework: 'jasmine',
    jasmineNodeOpts: {
        // set timeout for tests in milliseconds
        defaultTimoutInterval: 30000
    }
}
