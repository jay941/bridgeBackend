module.exports = function(grunt) {
    grunt.initConfig({

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {"css/flexslider/main.css": "css/flexslider/flexslider.less"}
            }
            //,production: {
            //    options: {
            //        paths: ["css"],
            //        cleancss: true
            //    },
            //    files: {"css/flexslider/main.css": "css/flexslider/flexslider.less"}
            //}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);
};