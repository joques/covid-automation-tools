module.exports = function(grunt) {
	
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sshconfig: {
			verde: {
				host: '196.216.167.220',
				username: 'hackathon',
				agent: process.env.SSH_AUTH_SOCK
			}
		},
		sshexec: {
			webdep: {
				command: ['cd covid19-essapp/', 'git pull origin master', 'cd', 'cd /var/www/covid19/html', 'cp -rf ~/covid19-essapp/src/website/Namcovid19/dist/convid19-esswebsite/* .'].join(' && '),
				options: {
					config: 'verde'
				}
			}
		}
	});
	
	//Load Npm tasks
	grunt.loadNpmTasks('grunt-ssh');
	
	//register tasks
	grunt.registerTask('deployweb', ['sshexec:webdep']);
};