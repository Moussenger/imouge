module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            concat : {
                files : ['lib/**/*.js'],
                tasks : ['concat']
            },

            uglify : {
                files : ['dist/imouge.js'],
                tasks : ['uglify']
            } 
        },

        concat: {
            options: { },
            dist: {
                src: [
                    'lib/imouge.js',
                    'lib/color/*.js',
                    'lib/image/*.js'
                ],
                dest: 'dist/imouge.js',
            }
        },

        uglify: {
            minjs : {
                options : { },
                files : {
                    'dist/imouge.min.js' : ['dist/imouge.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('devmode', ['watch']);
};