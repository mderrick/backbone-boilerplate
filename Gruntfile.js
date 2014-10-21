/* jshint maxlen: false */
/* global module:false */
module.exports = function(grunt) {

  'use strict';

  // Load all grunt tasks except template-jasmine-requirejs which is required in
  // the jasmine taske below.
  require('matchdep').filterDev('grunt-!(template-jasmine-requirejs)').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cordovacli: {
      options: {
        path: 'dist'
      },
      dist: {
        options: {
          command: ['create', 'platform', 'plugin'],
          platforms: ['ios'],
          plugins: ['device', 'console', 'dialogs'],
          id: 'io.cordova.bacboneboilerplate',
          name: 'BackboneBoilerplate'
        }
      },
      emulate: {
        options: {
          command: 'emulate',
          platforms: ['ios']
        }
      }
    },
    processhtml: {
      options: {
        strip: true,
        process: true,
        data: {
          env: '<%= grunt.config.get("environment") %>',
          version: '<%= pkg.version %>',
          buildnumber: '<%= grunt.config.get("buildnumber") %>',
          footer: 'Build: <%= pkg.name %> v<%= pkg.version %> on <%= grunt.template.today("dd/mm/yyyy") %> (<%= grunt.config.get("buildnumber") %>). Env: <%= grunt.config.get("environment") %>.'
        }
      },
      dist: {
        files: {
          'dist/www/index.html': ['www/index.html'],
          'dist/www/cordova_index.html': ['www/cordova_index.html']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
          ignoreCustomComments: [/^Build:.*/]
        },
        files: {
          'dist/www/index.html': 'dist/www/index.html',
          'dist/www/cordova_index.html': 'dist/www/cordova_index.html'
        }
      }
    },
    modernizr: {
      dist: {
        parseFiles: true,
        files: {
          src: ['www/app/**/*.js', 'www/app/**/*.css', 'www/index.html', 'www/cordova_index.html']
        },
        devFile: 'www/bower_components/modernizr/modernizr.js',
        outputFile: 'dist/.tmp/modernizr-custom.js'
      }
    },
    requirejs: {
      dist: {
        options: {
          preserveLicenseComments: false,
          optimize: 'uglify2',
          generateSourceMaps: true,
          baseUrl: 'www/app/js',
          mainConfigFile: ['www/app/js/config.js'],
          env: '<%= grunt.config.get("environment") %>',
          dir: 'dist/.tmp/app',
          paths: {
            // Overide full development version of modernizr to use our custom
            // built copy.
            modernizr: '../../../dist/.tmp/modernizr-custom'
          },
          modules: [{
            name: 'app',
            include: ['requireLib']
          }]
        }
      }
    },
    jasmine: {
      all: {
        options: {
          src: 'www/app/js/**/*.js',
          specs: 'tests/app/**/*.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: './www/app/js/config.js',
            requireConfig: {
              baseUrl: 'www/app/js'
            }
          }
        }
      }
    },
    'jasmine_node': {
      options: {
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['tests/server/']
    },
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        // Lint everything and use .jshintignore to exclude directories.
        // This will keep linting from other applications in sync.
        './'
      ]
    },
    cssmin: {
      dist: {
        files: {
          'dist/www/assets/styles.min.<%= grunt.config.get("buildnumber") %>.css': ['www/app/css/styles.css']
        }
      }
    },
    copy: {
      dist: {
        files: [{
            expand: true,
            cwd: 'dist/.tmp/app/',
            src: ['app.js', 'app.js.map'],
            dest: 'dist/www/assets/',
            filter: 'isFile'
          }, {
            expand: true,
            src: ['package.json', 'Procfile', '_config.xml'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            src: ['server/**/*'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'www/',
            src: ['**', '!app/**', '!bower_components/**', '!index.html', '!cordova_index.html'],
            dest: 'dist/www',
            filter: 'isFile'
          }]
      }
    },
    rename: {
      dist: {
        files: [{
          src: ['dist/www/assets/app.js'], dest: 'dist/www/assets/app.min.<%= grunt.config.get("buildnumber") %>.js'
        }, {
          src: ['dist/_config.xml'], dest: 'dist/config.xml'
        }]
      }
    },
    clean: {
      after: ['dist/.tmp', 'dist/www/css', 'dist/www/js', 'dist/www/img'],
      before: ['dist']
    },
    env: {
      default: {
        src: 'env/.<%= grunt.config.get("environment") %>'
      }
    },
    shell: {
      dev: {
        command: 'node server/server.js'
      },
      dist: {
        command: 'node dist/server/server.js'
      }
    }
  });
  
  grunt.registerTask('server', function (target) {
    target = target || 'local';
    var tasks = ['env'];

    if (target !== 'local') {
      tasks.push('build:' + target, 'shell:dist');
    } else {
      tasks.push('shell:dev');
    }

    grunt.config.set('environment', target);
    grunt.task.run(tasks);
  });

  grunt.registerTask('build', function(target) {
    var buildnumber = grunt.option('buildnumber') || (new Date()).getTime(),
        cordova = grunt.option('cordova'),
        tasks = ['clean:before'];

    target = target || 'local';

    if (cordova) {
      tasks.push('cordovacli:dist');
    }
    tasks.push(
      'processhtml',
      'htmlmin',
      'modernizr',
      'requirejs',
      'copy',
      'rename',
      'cssmin',
      'clean:after'
    );
    if (cordova) {
      tasks.push('cordovacli:emulate');
    }
    grunt.config.set('buildnumber', buildnumber);
    grunt.config.set('environment', target);
    grunt.task.run(tasks);
  });

  grunt.registerTask('test', ['jshint', 'jasmine', 'jasmine_node']);
};
