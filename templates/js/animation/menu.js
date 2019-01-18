import { TimelineMax, TweenMax, Expo } from 'gsap';
import screenSize from '../utilities/helpers/screenSize';

export default function search(menu) {
    const animationTime = 1;
    const menuList = menu.querySelector('.c-menu_list');
    const menuItems = menuList.querySelectorAll('.c-menu_item');
    const tl = new TimelineMax({ paused: true, reversed: true });

    TweenMax.fromTo(menu, animationTime, {
        alpha: 0
    }, {
        alpha: 1,
        ease: Expo.easeInOut,
        delay: 0.5
    });

    tl
        .fromTo(menuList, animationTime, {
            left: '100%'
        }, {
            left: '0%',
            ease: Expo.easeInOut
        })
        .staggerFromTo(menuItems, animationTime, {
            alpha: 0,
            x: 100
        }, {
            alpha: 1,
            x: 0,
            ease: Expo.easeInOut
        }, 0.1, 0.1);

    function toggleTl() {
        tl.reversed() ? tl.play() : tl.reverse();
    }

    menu.querySelector('.c-menu_icon').addEventListener('click', () => {
        menu.classList.toggle('is-open');
        toggleTl();
    });

    window.addEventListener('resize', () => {
        if (screenSize.changed() && screenSize.lg()) {
            TweenMax.fromTo(menuItems, animationTime, {
                alpha: 0,
                x: 0
            }, {
                alpha: 1,
                ease: Expo.easeInOut
            });
        }
    });

    window.dispatchEvent(new Event('resize'));
}
