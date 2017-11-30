var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('default', ['admin', 'front', 'static']);

gulp.task('admin', function(){
  return gulp.src('admin/dist/index.html')
    .pipe(gulp.dest('server/views/admin'))
})

gulp.task('static', function(){
  return gulp.src('admin/dist/static/**')
    .pipe(gulp.dest('server/public/static'))
})

gulp.task('front', function(){
  return gulp.src('frontend/dist/**')
    .pipe(gulp.dest('server/views/front'))
})