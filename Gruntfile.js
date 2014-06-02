/* global module:false */
module.exports = function(grunt) {
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
                'dist/app/index.html': ['app/index.html']
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
          'dist/app/index.html': 'dist/app/index.html'
        }
      }
    },
    modernizr: {
      dist: {
        parseFiles: true,
        files: {
          src: ['app/js/**/*.js', 'app/css/**/*.css']
        },
        devFile: 'app/bower_components/modernizr/modernizr.js',
        outputFile: 'dist/.tmp/modernizr-custom.js'
      }
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: 'app/js',
          mainConfigFile: ['app/js/config.js'],
          env: '<%= grunt.config.get("environment") %>',
          dir: 'dist/.tmp/',
          optimize: 'none',
          modules: [{
            name: 'app'
          }]
        }
      }
    },
    uglify: {
      dist: {
        files: { 
          'dist/app/assets/header.min.<%= grunt.config.get("buildnumber") %>.js': [
            'dist/.tmp/modernizr-custom.js'
          ],
          'dist/app/assets/app.min.<%= grunt.config.get("buildnumber") %>.js': [
            'app/bower_components/requirejs/require.js',
            'app/js/config.js',
            'dist/.tmp/app.js'
          ]
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/app/assets/styles.min.<%= grunt.config.get("buildnumber") %>.css': ['app/css/styles.css']
        }
      }
    },
    copy: {
      dist: {
        files: [{
            expand: true,
            src: ['package.json', 'Procfile'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            src: ['server/**/*'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'app/',
            src: ['**', '!css/**', '!js/**', '!bower_components/**', '!index.html'],
            dest: 'dist/app',
            filter: 'isFile'
          }]
      }
    },
    clean: {
      after: ['dist/.tmp'],
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
    var buildnumber = grunt.option('buildnumber') || (new Date()).getTime();
    target = target || 'local';
    tasks = [
      'clean:before',
      'processhtml',
      'htmlmin',
      'requirejs',
      'modernizr',
      'uglify',
      'copy',
      'cssmin',
      'clean:after'
    ];
    grunt.config.set('buildnumber', buildnumber);
    grunt.config.set('environment', target);
    grunt.task.run(tasks);
  });
};
