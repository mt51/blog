var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('default', ['admin', 'front']);

gulp.task('admin', function(){
  return gulp.src('admin/dist/**')
    .pipe(gulp.dest('server/views/admin'))
})

gulp.task('front', function(){
  return gulp.src('frontend/dist/**')
    .pipe(gulp.dest('server/views/front'))
})