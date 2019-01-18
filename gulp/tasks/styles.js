const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const sassGlob = require('gulp-sass-glob');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', ['stylelint'], () => {
    return gulp.src(config.CSS_ENTRY)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass())
            .on('error', sass.logError)
        .pipe(postcss([ flexbugsFixes, autoprefixer() ]))
        .pipe(gulpif(DEVELOPMENT, sourcemaps.write()))
        .pipe(gulp.dest(config.CSS_BUILD))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
        .pipe(gulpif(PRODUCTION, postcss([ cssnano({ safe: true }) ])))
        .pipe(gulpif(PRODUCTION, gulp.dest(config.CSS_BUILD)));
});
