exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  capabilities: {
    browserName: "chrome"
  },
  specs: ["chapter*_spec.js"],
  baseUrl: 'http://localhost:9001/',
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true
  }
};