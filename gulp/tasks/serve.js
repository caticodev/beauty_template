const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const BUILD_BASE = config.BUILD_BASE;
const gulp = require('gulp');
const gutil = require('gulp-util');
const gwatch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const copyToClipboard = require('copy-paste').copy;
const runSequence = require('run-sequence');

gulp.task('serve', ['prepare'], () => {
    // browserSync({
    //     proxy: 'localhost',
    //     open: false
    // }, (unknown, bs) => {
    //     const finalPort = bs.options.get('port');
    //     copyToClipboard(
    //         `localhost:${finalPort}`,
    //         () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))
    //     );
    // });
    browserSync.init({
  		server: { baseDir: BUILD_BASE },
      open: false
  	});

    const watch = (glob, tasks) => gwatch(glob, () => runSequence(...tasks));

    if (DEVELOPMENT) {
        watch(config.CSS_ALL, ['styles']);
        watch(config.JS_ALL, ['eslint:app']);
        watch(config.IMAGES_ALL, ['images', 'tpl']);
        watch(config.SVG_SPRITE_ALL, ['svg', 'tpl']);
        watch(config.TEMPLATE_ALL, ['tpl']);
    }
});
