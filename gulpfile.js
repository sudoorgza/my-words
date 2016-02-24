var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var minifyHTML = require('gulp-htmlmin');
var concat = require('gulp-concat');
var del = require('del');
var webpack = require('webpack-stream');
var htmlReplace = require('gulp-html-replace');

gulp.task('clean', function() {
  del.sync(['dist/css/**']);
  del.sync(['dist/index.html']);
  return del.sync(['dist/app/**']);
});

gulp.task('webpack', ['clean'], function() {
  return gulp.src('src/app/app.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('src/'));
});

gulp.task('js', ['webpack'], function() {
  return gulp.src('src/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('templates' , function(){
  return gulp.src('src/app/*.html')
    .pipe(gulp.dest('dist/app/'));

})

gulp.task('html', ['templates'], function() {
  return gulp.src('src/index.html')
    .pipe(htmlReplace({
      'css': {
        src: 'main.css',
        tpl: '<link rel="stylesheet" type="text/css" href="%s">'
      },
      'js': ['dependencies.js', 'bundle.js']
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('assets', function() {
  return gulp.src('src/**/*.png')
    .pipe(gulp.dest('dist/'));
});

gulp.task('dependencies', function() {
  return gulp.src(['node_modules/reflect-metadata/Reflect.js', 'node_modules/zone.js/dist/zone.js'])
    .pipe(concat('dependencies.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js', 'css', 'html', 'assets', 'dependencies'], function() {
  // add git push heroku master;heroku ps:scale web=1
  return del.sync(['src/bundle.js'])
});
