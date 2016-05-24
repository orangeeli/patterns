(()=> {
  
  'use strict';

  const gulp = require('gulp'),
    mocha = require('gulp-mocha');

  const tasks = {

    mocha (){
      return gulp.src(['./test/**/*.js'], {read: false})

        .pipe(mocha({
          reporter: 'nyan',
          recursive: true
        })).once('error', function () {
          process.exit(1);
        });
    }

  };

  gulp.task('test:mocha', tasks.mocha);
  gulp.task('default', ['test:mocha']);
  
})();