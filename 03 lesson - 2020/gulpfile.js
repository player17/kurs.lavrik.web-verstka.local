const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

//console.log(process.argv); // список всех аргуметов команды gulp
let isDev = process.argv.includes('--dev');
let isProd = !isDev;

if(isDev) {
    console.log('Modus Dev');
} else {
    console.log('Modus Prod');
}

function clean() {
    return del('./build/*');
}

function html() {
    return gulp.src('./src/**/*.html')
        // silense
        .pipe(gulp.dest('./build'));
}

function styles() {
    //return gulp.src('./src/css/**/*.css')
    return gulp.src(['./src/css/styles.css', './src/css/flow.css'])
        // pipe: minify, prefix, join
        .pipe(gulpIf(isDev,sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({}))
        .pipe(gulpIf(isProd, cleanCSS({
            level: 2
        })))
        .pipe(gulpIf(isDev,sourcemaps.write()))
        .pipe(gulp.dest('./build/css/'))
        .pipe(gulpIf(isDev,browserSync.stream()));
}

function images() {
    return gulp.src('./src/img/**/*')
        // size down, webp
        .pipe(gulp.dest('./build/img/'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch('./src/css/**/*.css', styles);
}

let build = gulp.parallel(html, styles, images);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch);

gulp.task('build', buildWithClean);
gulp.task('watch', dev);