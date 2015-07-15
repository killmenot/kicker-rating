module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    watch: {
      js: {
        files: ['bin/*.js', 'config/*.js', 'migration/*.js', 'models/*.js', 'routes/*.js', 'app.js', 'Gruntfile.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      all: ['bin/*.js', 'config/*.js', 'migration/*.js', 'models/*.js', 'routes/*.js', 'app.js', 'Gruntfile.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concurrent: {
      js: {
        tasks: ['watch:js'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    mocha: {
      client: {
        src: ['tests/client/testrunner.html']
      },
      options: {
        run: true
      }
    }

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });
};
