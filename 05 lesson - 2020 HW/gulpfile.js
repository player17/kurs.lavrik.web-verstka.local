const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const smartGrid = require('smart-grid');
const path = require('path');
const webp = require('gulp-webp');

let isMap = process.argv.includes('--map');
let isMinify = process.argv.includes('--clean');
let isSync = process.argv.includes('--sync');

function clean(){
    return del('./build/*');
}

function html(){
    return gulp.src('./src/**/*.html')
        // silense
        .pipe(gulp.dest('./build'))
        .pipe(gulpIf(isSync, browserSync.stream()));
}

function styles(){
    return gulp.src('./src/css/styles.less')
        .pipe(gulpIf(isMap, sourcemaps.init()))
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(gulpIf(isMinify, cleanCSS({
            level: 2
        })))
        .pipe(gulpIf(isMap, sourcemaps.write()))
        .pipe(gulp.dest('./build/css'))
        .pipe(gulpIf(isSync, browserSync.stream()));
}


// function images(){
//     return gulp.src('./src/img/**/*')
//         // size down, webp
//         .pipe(webp())
//         .pipe(gulp.dest('./build/img'));
// }

function images() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img/'));
}

function imagesToWebp() {
    return gulp.src('./src/img/**/*')
        .pipe(webp())
        .pipe(gulp.dest('./build/img/'));
}

function watch(){
    if(isSync){
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });
    }

    gulp.watch('./src/css/**/*.less', styles);
    gulp.watch('./src/**/*.html', html);
    gulp.watch('./smartgrid.js', grid);
}

function grid(done){
    delete require.cache[path.resolve('./smartgrid.js')];
    let options = require('./smartgrid.js');
    smartGrid('./src/css', options);
    done();
}

let build = gulp.parallel(html, styles, images, imagesToWebp);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch);

gulp.task('build', buildWithClean);
gulp.task('watch', dev);
gulp.task('grid', grid);