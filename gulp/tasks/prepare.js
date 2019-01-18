const gulp = require('gulp');
const runSequence = require('run-sequence');
const sequence = ['clean', ['images', 'svg', 'styles', 'js'], 'tpl'];

gulp.task('prepare', () => runSequence(...sequence));

module.exports = {
    sequence
};
