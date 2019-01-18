import { TimelineMax, Linear } from 'gsap';
const Segment = require('segment-js');

export default function loading(loadingScreen) {
    const loader = loadingScreen.querySelector('.c-loading_logo path');
    const segment = new Segment(loader);

    new TimelineMax({ repeat: -1 })
        .set(loader, {
            strokeDasharray: segment.strokeDasharray('0%', '0%')
        })
        .to(loader, 0.2, {
            strokeDasharray: segment.strokeDasharray('11%', '25%'),
            ease: Linear.easeNone
        })
        .to(loader, 0.5, {
            strokeDasharray: segment.strokeDasharray('35%', '70%'),
            ease: Linear.easeNone
        })
        .to(loader, 0.9, {
            strokeDasharray: segment.strokeDasharray('99%', '100%'),
            ease: Linear.easeNone
        });
}
