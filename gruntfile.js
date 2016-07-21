'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					"public/main.js": "src/main.js"
				}
			}
		},
		sass: {
		    dist: {
				files: {
				    'public/main.css': 'src/main.scss'
				}
		    }
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-sass");
	
	grunt.registerTask("default",["browserify", "sass"]);
};