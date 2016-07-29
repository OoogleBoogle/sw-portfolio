var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    // concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server');


// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['> 5%']
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sass:prod', function() {
  return gulp.src('sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
        browsers: ['> 5%']
    }))
    .pipe(gulp.dest('build/css'));
})

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('build/'));
});

// Minify index
gulp.task('html:prod', function() {
  return gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// // JavaScript build task, removes whitespace and concatenates all files
// gulp.task('scripts', function() {
//   return browserify('src/js/main.js')
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(gulp.dest('build/js'));
// });

// gulp.task('scripts:prod', function() {
//   return browserify('src/js/main.js')
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(gulp.dest('build/js'));
// });

// Image optimization task
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});


// gulp.task('favicons', function() {
//   return gulp.src('src/favicons/*')
//     .pipe(gulp.dest('build'));
// })

// Watch task
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('index.html', ['html']);
  gulp.watch('images/*', ['images']);
});

// start server
gulp.task('serve', function() {
  var server = gls.static('build', 3000);
  server.start().then(function(result) {
    process.exit(result.code);
  });

  gulp.watch(['build/css/main.css', 'build/index.html'], function(file) {
    server.notify.apply(server, [file]);
  });
})


// Default task
gulp.task('dev', ['html', 'sass', 'images', 'watch','serve']);

// Build task
gulp.task('build', ['sass:prod', 'html:prod', 'images']);

// git build push command
// git push origin `git subtree split --prefix build gh-pages`:gh-pages --force