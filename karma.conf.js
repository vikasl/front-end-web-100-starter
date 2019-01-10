const webpack = require('./webpack.config');
webpack.mode = 'development';
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine'],

        files: [
            { pattern: 'spec/*_spec.js', watched: false },
            { pattern: 'spec/**/*_spec.js', watched: false }
        ],

        preprocessors: {
            'spec/*_spec.js': ['webpack', 'sourcemap'],
            'spec/**/*_spec.js': ['webpack', 'sourcemap']
        },

        webpack,

        reporters: ['dots'],

        browsers: ['ChromeHeadless'], // or just 'Chrome', 'ie', 'firefox', etc.
   
        
    });
};