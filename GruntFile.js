module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-ts');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: 'src/app/**/*.ts',
			tasks: ['ts:app']
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
	grunt.registerTask('default', ['run:greeting','watch']);
}
