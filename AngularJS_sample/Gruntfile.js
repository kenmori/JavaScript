module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      keepalive: {
        options: {
          base: './',
          port: '9000',
          open: true,
          keepalive: true
        }
      },
      server: {
        options: {
          base: './',
          port: '9001'
        }
      }
    },
    protractor: {
      e2e: {
        options: {
          configFile: "tests/protractor.conf.js"
        }
      }
    }
  });

  grunt.registerTask(
    'serve',
    'サンプルプログラムを実行',
    ['connect:keepalive']
  );
  grunt.registerTask(
    'test',
    'インテグレーションテストの実行',
    ['connect:server', 'protractor']
  );
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
