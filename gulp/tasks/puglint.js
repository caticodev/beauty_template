const config = require('../config');
const gulp = require('gulp');
const puglint = require('gulp-pug-lint');
const cached = require('gulp-cached');

gulp.task('puglint', () => {
    return gulp
            .src(config.TEMPLATE_ALL)
            .pipe(cached('puglint'))
            .pipe(puglint());
});
