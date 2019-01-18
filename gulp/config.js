/* eslint-disable one-var */
const environment = require('./environment');

const
    /* General */
    PORT = 3000,

    /* Paths */
    NPM = './node_modules',
    DEVELOPMENT_BASE = './templates',
    BUILD_BASE = './public',

    /* Gulp */
    GULP_ALL = ['./gulpfile.js', './gulp/**/*.js'],

    /* CSS */
    CSS_BASE = `${DEVELOPMENT_BASE}/scss`,
    CSS_ENTRY = `${CSS_BASE}/main.scss`,
    CSS_ALL = `${CSS_BASE}/**/*.scss`,
    CSS_BUILD = `${BUILD_BASE}`,

    /* JavaScript */
    JS_BASE = `${DEVELOPMENT_BASE}/js`,
    JS_MAIN_FILENAME = 'main.js',
    JS_ENTRY = `${JS_BASE}/${JS_MAIN_FILENAME}`,
    JS_ALL = `${JS_BASE}/components/*.js`,
    JS_VENDOR_ALL = `${JS_BASE}/vendor/**/*.js`,
    JS_BUILD = `${BUILD_BASE}`,

    /* GFX */
    GFX_BASE = `${DEVELOPMENT_BASE}/assets`,
    GFX_BUILD = `${BUILD_BASE}/assets`,
    GFX_TPL_PATH = '/assets',

    /* SVG */
    SVG_BASE = `${GFX_BASE}/svg`,
    SVG_SINGLE_ALL = `${SVG_BASE}/*.svg`,
    SVG_SPRITE_ALL = [
        `${SVG_BASE}/**/*.svg`,
        `!${SVG_SINGLE_ALL}`
    ],
    SVG_BUILD = `${GFX_BUILD}/svg`,
    SVG_BUILD_SPRITES = `${SVG_BUILD}/sprites`,
    SVG_TPL_PATH = `${GFX_TPL_PATH}/svg`,
    SVG_SPRITES_TPL_PATH = `${SVG_TPL_PATH}/sprites`,

    IMAGES_ALL = [
        `${GFX_BASE}/**/*.{jpg,jpeg,png,gif}`,
        `${SVG_SINGLE_ALL}`
    ],

    /* Templates */
    TEMPLATE_BASE = `${DEVELOPMENT_BASE}/views`,
    TEMPLATE_ENTRY = `${TEMPLATE_BASE}/index.pug`,
    TEMPLATE_ALL = `${TEMPLATE_BASE}/**/*.pug`,

    /* HTML */
    HTML_BUILD = `${BUILD_BASE}`;

module.exports = {
    PORT,
    environment,

    NPM,
    DEVELOPMENT_BASE,
    BUILD_BASE,
    GULP_ALL,

    CSS_BASE,
    CSS_ENTRY,
    CSS_ALL,
    CSS_BUILD,

    JS_BASE,
    JS_MAIN_FILENAME,
    JS_ENTRY,
    JS_ALL,
    JS_VENDOR_ALL,
    JS_BUILD,

    GFX_BASE,
    GFX_BUILD,
    IMAGES_ALL,
    SVG_BASE,
    SVG_SINGLE_ALL,
    SVG_SPRITE_ALL,
    SVG_BUILD,
    SVG_BUILD_SPRITES,
    SVG_SPRITES_TPL_PATH,

    TEMPLATE_BASE,
    TEMPLATE_ENTRY,
    TEMPLATE_ALL,
    HTML_BUILD
};
/* eslint-enable one-var */
