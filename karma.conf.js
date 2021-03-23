// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
			// require('karma-coverage-istanbul-reporter'),
      // require('karma-typescript'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    // karmaTypescriptConfig: {
    //   // include: {
    //   //   mode: "merge|replace",
    //   //   values: ["src/**/*.ts"]
    //   // },
    //   coverageOptions: {
    //     exclude: /(\.(d|spec|test)\.ts|\.js)/i,
    //   },
    //   reports:
    //   {
    //       "cobertura": "coverage",
    //       "lcovonly": "coverage",
    //       "html": "coverage",
    //       "text-summary": ""
    //   }
    // },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-app'),
      subdir: '.',
      reporters: [
        // { type: 'lcov' },
        { type: 'cobertura' },
        { type: 'lcovonly' },
        { type: 'html' },
        { type: 'text-summary' },
      ],
      verbose: true
    },
		// coverageIstanbulReporter: {
    //   dir: require('path').join(__dirname, './coverage/angular-app'),
    //   subdir: '.',
		// 	reports: ['html', 'lcovonly', 'text-summary', 'cobertura'], /*  || 'lcov' */
		// 	fixWebpackSourcePaths: true,
    //   verbose: true
		// },
    reporters: ['progress', 'kjhtml', 'coverage'],
    // reporters: ['progress', 'kjhtml', 'karma-typescript'],
    // reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--headless',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
