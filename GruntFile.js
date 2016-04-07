module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-ts');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: { 
					port: 8077,
					base: './'
				}
			}
		},
		watch: {
			files: 'src/app/**/*.ts',
			tasks: ['ts:app', 'run:app']
		},
		//Deprecated
		typescript: {
			greeting: {
				src: ['src/greeting.ts'],
				dest: 'js/greeting.js',
				options: {
					module: 'amd',
					target: 'es5'
				}
			}
		},
		
		open: {
			dev : {
				path: 'http://localhost:8077/html/index.html'
			}
		},
		concat: {
			buildAll: {
				src: ['src/app/**/*.js'],
				dest: 'js/final.js'
			}
		},
		run: {
			greeting: {
				cmd: "node",
				args: ["js/greeting.js"]
			},
			cpl-index: {
				cmd: "node",
				args: [
					"js/app.js",
					"cpl"
				]
			},
			cpl-details: {
				cmd: "node",
				args: [
					"js/app.js",
					"details"
				]
			},
		},
		ts: {
		app: {
				files: [
					{src: ['src/app/**/*.ts'], dest: 'js/app.js'}
				],
				options: {
					target: "es5",
					compiler: "node_modules/typescript/bin/tsc",
				}
			}
		}
	});
	grunt.registerTask('default', ['connect', 'typescript:greeting','run:greeting','watch']);
}
