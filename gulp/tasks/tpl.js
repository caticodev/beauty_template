const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const prettify = require('gulp-prettify');
const pug = require('gulp-pug');

gulp.task('tpl-compile', ['puglint'], () => {
    return gulp.src(config.TEMPLATE_ENTRY)
        .on('error', e => gutil.log(`${gutil.colors.red(`${e.name}:`)} in ${e.plugin}: ${e.message}`))
        .pipe(pug({ pretty: true }))
        .pipe(rename(path => (path.extname = '.html')))
        .pipe(gulpif(PRODUCTION, prettify()))
        .pipe(gulp.dest(config.HTML_BUILD));
});

gulp.task('tpl', ['tpl-compile'], (done) => {
    browserSync.reload();
    done();
});
