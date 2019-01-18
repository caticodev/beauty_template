import 'babel-polyfill';
import 'svgxuse';
import init from './utilities/init';

// components
import search from './animation/search';
import menu from './animation/menu';
import coverSlider from './animation/cover_slider';
import contact from './animation/hover/contact';
import loading from "./animation/loading";
import scroll from './animation/scroll/scroll';
import services from './animation/hover/services';
import map from './animation/map';
import screenSize from './utilities/helpers/screenSize';
import reviewsSlider from './animation/reviewsSlider';

// global
window.initMap = map;

const app = (config) => {
    window.onbeforeunload = () => window.scrollTo(0, 0);
    init(loading, document.querySelector('.js-loading'));
    window.addEventListener('load', function(){
        init(scroll, document);
        init(coverSlider, document.querySelector('.js-cover_slider'), screenSize.lg());
        init(menu, document.querySelector('.js-nav'));
        init(search, document.querySelector('.js-search'));
        if (screenSize.lg()) {
            init(contact, document.querySelector('.js-contact'));
            init(services, document.querySelectorAll('.js-service'));
        }
    });
};

app(window.config);
