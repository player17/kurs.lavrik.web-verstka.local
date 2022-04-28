const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const webp = require('gulp-webp');
const less = require('gulp-less');


//console.log(process.argv); // список всех аргуметов команды gulp
let isDev = process.argv.includes('--dev');
let isProd = !isDev;
let isConcat = process.argv.includes('--concat');
let isClean = process.argv.includes('--clean');
let isSync = process.argv.includes('--sync');

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
        .pipe(gulp.dest('./build/'))
        .pipe(gulpIf(isSync,browserSync.stream()));
}

function styles() {
    //return gulp.src('./src/css/**/*.css')
    return gulp.src(['./src/css/main.less'])
        // pipe: minify, prefix, join
        .pipe(gulpIf(isDev,sourcemaps.init()))
        //.pipe(gulpIf(isConcat,concat('main.less')))
        .pipe(less())
        //.pipe(autoprefixer({}))
        //.pipe(gcmq())
        .pipe(gulpIf(isClean, cleanCSS({
            level: 2
        })))
        .pipe(gulpIf(isDev,sourcemaps.write()))
        .pipe(gulp.dest('./build/css/'))
        .pipe(gulpIf(isSync,browserSync.stream()));
}

function images() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img/'));
}

function imagesToWebp() {
    return gulp.src('./src/img/**/*')
        .pipe(webp())
        .pipe(gulp.dest('./build/img/'));
}

function watch() {
    if(isSync) {
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });
    }
    gulp.watch('./src/**/*.html', html);
    //gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/css/**/*.less', styles);
}

let build = gulp.parallel(html, styles, images, imagesToWebp);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch);

gulp.task('build', buildWithClean);
gulp.task('watch', dev);