var requirejsCompileSkip = require('./tasks/requirejs-compile-skip.json');

var pkg = require('./package.json');

var pub = pkg.smartadmin.public;
var tmp = pkg.smartadmin.temp;
var bld = pkg.smartadmin.build;

module.exports = function (grunt) {
     // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        karma: {
          unit: {
            options: {
               
                basePath : '../public',
                files: [
                      'test/main-test.js',
                      {pattern: 'app.config.js', included: false},
                      {pattern: 'app/**/*.js', included: false},
                      {pattern: 'test/**/*.js', included: false},

                      {pattern: 'plugin/**/*.js', included: false},
                      {pattern: 'smartadmin-plugin/**/*.js', included: false},
                    ],

                    exclude: [
                        '../public/app/main.js'
                    ]
            },
            frameworks: ['jasmine', 'requirejs'],
            autoWatch: true,
            browsers: ['Chrome']

          }
        }

         

    });


    grunt.loadNpmTasks('grunt-karma');
};