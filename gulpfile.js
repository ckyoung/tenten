const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const zip = require('gulp-zip');
const minify = require('gulp-minify');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const tasks = ['styles', 'pug', 'scripts', 'copy-svg'];

// Setup local server using Browser-sync
// And watch file changes
gulp.task('serve', tasks, function() {
  browserSync.init({
      server: {
        baseDir: "dist"
      }
  });

  gulp.watch("src/js/*.js", ['scripts']).on('change', browserSync.reload);
  gulp.watch("src/sass/*.sass", ['styles']).on('change', browserSync.reload);
  gulp.watch("src/views/layouts/*.pug", ['pug']).on('change', browserSync.reload);
  gulp.watch("src/views/*.pug", ['pug']).on('change', browserSync.reload);
});

// Compile SASS, autoprefix and minified the CSS 
gulp.task('styles', function() {
  const plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano({preset: 'default'})
  ];

  gulp.src('src/sass/main.sass')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/css'));
});

// Use Babel for better Javascript browser compatibily
// Minify Javascript
gulp.task('scripts', function() {
  gulp.src('src/js/main.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(minify())
  .pipe(gulp.dest('dist/js'));
});

// Compile Pug template
gulp.task('pug', function () {
  gulp.src('src/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'));
});

// Copy SVGs to dist folder
gulp.task('copy-svg', function () {
  gulp.src('src/assets/svg/*.svg')
  .pipe(gulp.dest('dist/img'));
});

// Compress the dist folder
gulp.task('zip', function(){
  gulp.src('src/*')
  .pipe(zip('archive.zip'))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', tasks);

 