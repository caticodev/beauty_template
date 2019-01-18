import { TimelineMax, Expo, Linear } from 'gsap';

export default function service(service, animationTime) {
    const imageWrap = service.querySelector('.service_img-wrapper');
    const text = service.querySelectorAll('.service_text > *');

    return new TimelineMax()
            .from(imageWrap, animationTime, {
                x: '-100',
                ease: Expo.easeOut
            })
            .from(imageWrap, animationTime, {
                alpha: 0,
                ease: Linear.easeNone
            }, 0)
            .staggerFrom(text, animationTime, {
                alpha: 0,
                ease: Linear.easeNone
            }, 0.15, 0)
            .staggerFrom(text, animationTime, {
                x: 100,
                ease: Expo.easeOut
            }, 0.15, 0)
}