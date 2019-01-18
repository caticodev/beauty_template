import {TimelineMax, Expo, Linear, Bounce } from 'gsap';

export default function contact(animationTime) {
    const contact = document.querySelector('.contact');
    const contactOverlay = contact.querySelector('.contact_overlay');
    const contactElements = contact.querySelectorAll('.contact_block');
    const mapContainer = contact.querySelector('.contact_map');
    const markerPinWrap = contact.querySelector('.c-marker_pin-wrap');
    const markerPin = contact.querySelector('.c-marker_pin');
    const markerShadow = contact.querySelector('.c-marker_shadow');

    return new TimelineMax()
        .from(contactOverlay, animationTime, {
            x: '-100%',
            ease: Expo.easeInOut
        })
        .staggerFrom(contactElements, animationTime, {
            x: 100,
            ease: Expo.easeOut
        }, 0.15, 0.75)
        .staggerFrom(contactElements, animationTime, {
            alpha: 0,
            ease: Linear.easeNone
        }, 0.15, 0.75)
        .from(markerPinWrap, 1.8, {
            y: `-${mapContainer.offsetHeight}px`,
            ease: Bounce.easeOut
        }, 0)
        .from(markerShadow, 1.8, {
            scale: 0,
            ease: Bounce.easeOut
        }, 0);
}