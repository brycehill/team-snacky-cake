module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt, 'grunt-*');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {},
            vendor: {
                src: [
                    'src/vendor/jquery/jquery.min.js',
                    'src/vendor/modernizr/modernizr.js',
                    'src/vendor/handlebars/handlebars.js',
                    'src/vendor/ember/ember.min.js'
                ],
                dest: 'staticfiles/assets/vendor.js'
            },
            core: {
                src: [
                    '.tmp/templates.js',
                    'src/application/*.js',
                    'src/application/(controller,model,view)/*.js'
                ],
                dest: 'staticfiles/assets/core.js'
            }
        },
        emberTemplates: {
            compile: {
                options: {
                    amd: false,
                    templateBasePath: /src\/application\/_templates\//
                },
                files: {
                    '.tmp/templates.js': 'src/application/_templates/*.hbs'
                }
            }
        },
        less: {
            core: {
                options: {
                    yuicompress: true
                },
                files: {
                    "staticfiles/assets/core.css": [
                        "src/application/_less/*.less"
                    ]
                }
            }
        },
        jshint: {
            all: 'src/application/!(tests)/*.js'
        },
        watch: {
            css: {
                files: [
                    'src/application/_less/*.less'
                ],
                tasks: [
                    'less.core'
                ],
                options: {
                    spawn: false
                }
            },
            js: {
                files: [
                    'src/application/**/*.js',
                    'src/application/_templates/*.hbs'
                ],
                tasks: [
                    'emberTemplates',
                    'uglify'
                ],
                options: {
                    spawn: false
                }
            },
            server: {
                files: ['server.js'],
                tasks: [],
                options: {
                    spawn: false
                }
            }
        },
        nodemon: {
            prod: {
                options: {
                    file: 'server.js',
                    ignoredFiles: ['README.md', 'node_modules/**', 'src/**', 'staticfiles/**', 'Gruntfile.js'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    delayTime: 1,
                    legacyWatch: true,
                    env: {
                        ENVIRONMENT: 'dev',
                        PORT: '8081'
                    },
                    cwd: __dirname
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        }
    });

    grunt.registerTask('dev', function () {
        grunt.task.run([
            'emberTemplates',
            'less',
            'uglify:core',
            'watch'
        ]);
    });
    grunt.registerTask('vendor', function () {
        grunt.task.run([
            'uglify:vendor'
        ]);
    });

};
