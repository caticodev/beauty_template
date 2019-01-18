import { TweenMax, TimelineMax, Expo, Linear, Power4 } from 'gsap';
import Hammer from 'hammerjs';
import indexOfChild from '../utilities/helpers/indexOfChild';

export default function reviewsSlider(slider, auto = true) {
    const timePerSlide = 10000;
    const animationTime = 1.5;
    let timeout;

    const slides = slider.querySelectorAll('.c-reviews-slider_slide');
    const indicators = slider.querySelectorAll('.c-reviews-slider_indicator');
    const hammer = new Hammer(slider);

    let activeSlide;
    let newSlide;

    nextSlide(slider, auto, 0);

    [...indicators].forEach((indicator) => {
        indicator.addEventListener('click', () => {
            nextSlide(slider, auto, indexOfChild(indicator));
        })
    });

    hammer.on('swipe', (e) => {
        if (e.direction === 2) {
            nextSlide(slider, auto);
        } else if (e.direction === 4) {
            nextSlide(slider, auto, null, true);
        }
    });

    function nextSlide(slider, auto = true, index = null, previous = false) {
        activeSlide = [...slides].filter(x => x.classList.contains('is-active'))[0];
        newSlide = null;

        if (previous) {
            newSlide = activeSlide.previousElementSibling;
            if (!newSlide) {
                newSlide = [...slides][slides.length - 1];
            }
        } else if (index === null) {
            newSlide = activeSlide.nextElementSibling;
            if (!newSlide) {
                newSlide = [...slides][0];
            }
        } else {
            newSlide = [...slides][index];
        }

        switchSlides(slider, newSlide, auto, previous);
    }

    function switchSlides(slider, newSlide, auto, previous) {
        if (slider.dataset.wait) { return; }
        if (Object.is(newSlide, activeSlide)) { return; }

        if (activeSlide) {
            [...indicators][indexOfChild(activeSlide)].classList.remove('is-active');
            previous = indexOfChild(newSlide) < indexOfChild(activeSlide);
        } else {
            activeSlide = [...slides][0];
        }

        [...indicators][indexOfChild(newSlide)].classList.add('is-active');

        clearTimeout(timeout);
        slider.dataset.wait = 'true';

        const cornerLeft = newSlide.querySelector('.c-reviews-slider_corner__left');
        const cornerRight = newSlide.querySelector('.c-reviews-slider_corner__right');

        new TimelineMax()
            .to(activeSlide, animationTime, {
                x: previous ? '10%' : '-10%',
                opacity: 0,
                ease: Expo.easeInOut
            })
            .fromTo(cornerLeft, animationTime, {
                left: '4rem',
                top: '4rem',
                opacity: 0
            }, {
                left: '2rem',
                top: '2rem',
                opacity: 1,
                ease: Expo.easeOut
            }, `=-${animationTime / 2}`)
            .fromTo(cornerRight, animationTime, {
                right: '4rem',
                bottom: '4rem',
                opacity: 0
            }, {
                right: '2rem',
                bottom: '2rem',
                opacity: 1,
                ease: Expo.easeOut
            }, `=-${animationTime}`)
            .fromTo(newSlide, animationTime, {
                display: 'block',
                opacity: 0,
                x: previous ? '-10%' : '10%',
                zIndex: 2
            }, {
                x: '0%',
                opacity: 1,
                ease: Expo.easeInOut,
                clearProps: 'all',
                onComplete: () => {
                    activeSlide.classList.remove('is-active');
                    TweenMax.set(activeSlide, { clearProps: 'all' });
                    newSlide.classList.add('is-active');
                    delete slider.dataset.wait;
                }
            }, 0);
        if (auto) {
            timeout = setTimeout(() => {
                nextSlide(slider, auto);
            }, timePerSlide);
        }
    }
}
