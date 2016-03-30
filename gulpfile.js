var gulp = require('gulp'),
    uglify = require('gulp-uglify')
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    critical = require('critical');

var ngrok = require('ngrok'),
    psi = require('psi'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

/*Concatenate and minify css files in pizza.html
to reduce HTTP requests*/
gulp.task('useref', function(){
  return gulp.src('src/views/*.html')
    .pipe(useref())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulp.dest('dist/views/'));
});

/*Minify CSS files*/
gulp.task('cssmin', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({stream: true}));
});

/*Minify JS files*/
gulp.task('jsmin', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(reload({stream: true}));

  gulp.src('src/views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js/'))
    .pipe(reload({stream: true}));
});

/*Compress images*/
gulp.task('img-compress', function() {
  gulp.src('src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({stream: true}));
});

/*Minify html files*/
gulp.task('htmlmin', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));

  gulp.src('dist/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'))
    .pipe(reload({stream: true}));
});

gulp.task('critical', function (cb) {
    critical.generate({
        inline: true,
        base: 'src/',
        src: 'index.html',
        css: ['dist/css/style.css'],
        dest: 'dist/index.html',
        minify: true,
        width: 768,
        height: 1024
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    }, function callback (err, bs) {
      ngrok.connect(bs.options.get('port'), function (err, url) {
        psi(url, {
          nokey: 'true',
          strategy: 'mobile',
          threshold: 80
        }).then(function (data) {
            console.log('Mobile Speed score: ' + data.ruleGroups.SPEED.score);
            console.log('Mobile Usability score: ' + data.ruleGroups.USABILITY.score);
        });
        psi(url, {
            nokey: 'true',
            strategy: 'desktop',
            threshold: 80
        }).then(function (data) {
            console.log('Desktop Speed score: ' + data.ruleGroups.SPEED.score);
        });
      });
    });

    gulp.watch(['src/img/**'], ['img-compress']);
    gulp.watch(['src/css/*.css'], ['cssmin']);
    gulp.watch(['src/js/*.js' , 'src/views/js/*.js'], ['jsmin']);
    gulp.watch(['src/views/css/*.css', 'src/views/*.html'],['useref', reload]);
    gulp.watch(['src/*.html', 'dist/views/*.html'], ['htmlmin', 'critical', reload]);
});

gulp.task('default', ['jsmin','img-compress','useref','cssmin','htmlmin','critical']);