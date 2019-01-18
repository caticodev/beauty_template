import { TimelineMax, Expo, Linear } from 'gsap';

export function benefitsTitle(animationTime) {
    const benefitsHeading = document.querySelector('.benefits_heading');

    return new TimelineMax()
        .from(benefitsHeading, animationTime, {
            y: '100',
            ease: Expo.easeOut
        })
        .from(benefitsHeading, animationTime, {
            alpha: 0,
            ease: Linear.easeNone
        }, 0);
}

export function benefit(benefit, animationTime) {
    return new TimelineMax()
        .from(benefit, animationTime / 2, {
            alpha: 0,
            ease: Linear.easeNone
        })
        .from(benefit, animationTime * 2, {
            strokeDashoffset: 220,
            ease: Linear.easeIn
        }, animationTime / 2);
}