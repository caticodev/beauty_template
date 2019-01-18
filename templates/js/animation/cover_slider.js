import { TweenMax, Expo, Linear } from 'gsap';
import Hammer from 'hammerjs';
import indexOfChild from '../utilities/helpers/indexOfChild';

export default function coverSlider(slider, auto = true) {
    const timePerSlide = 10000;
    const animationTime = 1.5;
    let timeout;

    const slides = slider.querySelectorAll('.cover-slider_slide');
    const indicators = slider.querySelectorAll('.cover-slider_indicator');
    const hammer = new Hammer(slider);

    let activeSlide;
    let activeSlideImage;
    let activeIndicator;
    let newSlide;
    let newSlideImage;
    let newIndicator;
    let newSlideElements;

    nextSlide(slider, auto, 0);

    [...indicators].forEach((indicator) => {
        indicator.style.opacity = 1;
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
        if (activeSlide) {
            activeSlideImage = activeSlide.querySelector('.cover-slider_bg-container');
            activeIndicator = [...indicators][indexOfChild(activeSlide)].querySelector('span');
        }
        newIndicator = [...indicators][indexOfChild(newSlide)].querySelector('span');
        newSlideImage = newSlide.querySelector('.cover-slider_bg-container');
        newSlideElements = newSlide.querySelectorAll('.cover-slider_text > *');
        if (Object.is(newSlide, activeSlide)) { return; }

        clearTimeout(timeout);
        slider.dataset.wait = 'true';

        if (activeSlide) {
            TweenMax.killTweensOf(activeIndicator);
            TweenMax.set(activeIndicator, { clearProps: 'all' });
            TweenMax.fromTo(activeSlideImage, animationTime, {
                left: previous ? 'auto' : 0,
                right: previous ? 0 : 'auto'
            }, {
                left: previous ? 'auto' : `${-slider.offsetWidth / 2}px`,
                right: previous ? `${-slider.offsetWidth / 2}px` : 'auto',
                clearProps: 'all',
                ease: Expo.easeInOut
            });
        }
        TweenMax.fromTo(newIndicator, animationTime, {
            width: 0,
            right: 'auto',
            left: 0
        }, {
            width: '100%',
            ease: Expo.easeInOut
        });
        if (auto) {
            TweenMax.to(newIndicator, ((timePerSlide / 1000) - animationTime), {
                width: '0',
                right: 0,
                left: 'auto',
                ease: Linear.easeNone,
                delay: animationTime
            });
            TweenMax.to(newSlideImage, (timePerSlide / 1000) + 1, {
                scale: 1.05,
                ease: Linear.easeNone,
                clearProps: 'all'
            }, animationTime);
        }
        TweenMax.fromTo(newSlide, animationTime, {
            display: 'block',
            left: previous ? '0' : 'auto',
            right: previous ? 'auto' : 0,
            width: 0,
            zIndex: 2
        }, {
            width: slider.offsetWidth,
            clearProps: 'all',
            ease: Expo.easeInOut
        });
        TweenMax.fromTo(newSlideImage, animationTime, {
            left: previous ? `${-slider.offsetWidth / 2}px` : 'auto',
            right: previous ? 'auto' : `${-slider.offsetWidth / 2}px`,
            width: `${slider.offsetWidth}px`
        }, {
            right: previous ? 'auto': 0,
            left: previous ? 0 : 'auto',
            clearProps: 'all',
            ease: Expo.easeInOut,
            onComplete: () => {
                if (activeSlide) { activeSlide.classList.remove('is-active'); }
                newSlide.classList.add('is-active');
            }
        });
        TweenMax.staggerFromTo(newSlideElements, animationTime, {
            alpha: 0,
            x: 100
        }, {
            alpha: 1,
            x: 0,
            ease: Expo.easeOut,
            delay: 0.75
        }, 0.15, () => {
            delete slider.dataset.wait;
        });
        if (auto) {
            timeout = setTimeout(() => {
                nextSlide(slider, auto);
            }, timePerSlide);
        }
    }
}
