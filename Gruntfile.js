module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'wordpress/', src: ['*'], dest: 'build/source/', filter: 'isFile'},
          {expand: true, cwd: 'wordpress/', src: ['wp-admin/**'], dest: 'build/source/' },
          {expand: true, cwd: 'wordpress/', src: ['wp-content/**'], dest: 'build/source/' },
          {expand: true, cwd: 'wordpress/', src: ['wp-includes/**'], dest: 'build/source/' },
        ]
      }
    },
    exec: {
      mysqlDump: {
        cwd: '/vagrant/build/',
        command: 'mkdir -p database && cd database && rm -f latest.sql && mysqldump -u wordpress -pwordpress wordpress > latest.sql'
      },
      mysqlImport: {
        cwd: '/vagrant/build/database',
        command: 'mysql -u wordpress -pwordpress wordpress < latest.sql'
      }
    },
    sass: {
        main: {
            files: {
                'source/wp-content/themes/bones/library/css/style.css': 'source/wp-content/themes/bones/library/scss/style.scss',
                'source/wp-content/themes/bones/library/css/ie.css': 'source/wp-content/themes/bones/library/scss/ie.scss',
                'source/wp-content/themes/bones/library/css/login.css': 'source/wp-content/themes/bones/library/scss/login.scss',
            }
        }
    }, 
    watch: {
      files: ['source/**/*'],
      tasks: ['sass']
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');

  // Add tasks
  grunt.registerTask('build', ['sass', 'copy', 'exec:mysqlDump']);
  grunt.registerTask('import', ['exec:mysqlImport']);

};