import { TimelineMax, Elastic, Power1, SlowMo } from "gsap";

export default function contact(container) {
    const markerPinWrap = document.querySelector('.c-marker_pin-wrap');
    const markerPin = document.querySelector('.c-marker_pin');
    const markerShadow = document.querySelector('.c-marker_shadow');

    const tl = new TimelineMax({ paused: true })
        .to(markerPin, 0.1, {
            scaleY: 0.87,
            ease: Power1.easeOut
        })
        .to(markerPin, 0.55, {
            scaleY: 1,
            ease: Elastic.easeOut.config(1.2, 0.5)
        })
        .to(markerPin, 0.1, {
            scaleY: 0.87,
            ease: Power1.easeOut
        })
        .to(markerPin, 0.8, {
            scaleY: 1,
            ease: Elastic.easeOut.config(1.2, 0.5)
        })
        .to(markerPinWrap, 0.5, {
            y: -30,
            ease: SlowMo.ease.config(0.1, 0.1, true)
        }, 0.15)
        .to(markerShadow, 0.5, {
            scale: 0.6,
            ease: SlowMo.ease.config(0.1, 0.1, true)
        }, 0.15);

    container.addEventListener('mouseenter', () => {
        tl.play(0);
    });
}
