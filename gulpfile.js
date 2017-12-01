var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('default', ['clean'], function(){
  gulp.start('admin', 'front', 'static')
});

gulp.task('clean', function () {
  return gulp.src(['server/views/front', 'server/public/static', 'server/views/admin', 'frontend/dist/favicon.ico'])
  .pipe(clean())
})

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
