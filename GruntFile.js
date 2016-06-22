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
			server: {
				cmd: "node",
				args:["js/app.js"]
			},
			par: {
				cmd: "node",
				args: [
					"js/app.js",
					"par"
				]
			},
			cpl_index: {
				cmd: "node",
				args: [
					"js/app.js",
					"cpl"
				]
			},
			cpl_details: {
				cmd: "node",
				args: [
					"js/app.js",
					"cpl",
					"details"
				]
			}
		},
		ts: {
			app: {
				files: [
					{src: ['src/app/system/**/*.ts', 'src/app/crawler/**/*.ts', 'src/app/config/**/*.ts','src/app/*.ts', "!**/config/*stub*.ts"], dest: 'js/app.js'}
				],
				options: {
					target: "es5",
					compiler: "node_modules/typescript/bin/tsc",
					//module: "commonjs"
				}
			}
		}
	});
	grunt.registerTask('default', ['run:greeting','watch']);
}
