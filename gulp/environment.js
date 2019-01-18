const argv = require('yargs').argv;
const package_json = require('../package.json');
const gutil = require('gulp-util');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const isDevelopment = argv.dev || false;

// check the minimal supported version of node
function check() {
    const nodeMajorVersion = process.version.substr(1, 1);
    const minMajorVersion = package_json.engines.node.substr(-1);

    if (nodeMajorVersion < minMajorVersion) {
        gutil.log(
            gutil.colors.red(`Node version ${package_json.engines.node} is required.`),
            gutil.colors.cyan(`You are using ${process.version}`)
        );
        process.exit(1);
    }
}

module.exports = {
    type: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment,
    check
};
