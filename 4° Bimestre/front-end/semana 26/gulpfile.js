const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => {
    return gulp.src('styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src('app.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('styles.scss', gulp.series('styles'));
    gulp.watch('app.js', gulp.series('scripts'));
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'serve'));
