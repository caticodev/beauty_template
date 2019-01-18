import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import contact from './contact';
import { benefit, benefitsTitle } from './benefits';
import service from './service';
import init from "../../utilities/init";
import reviewsSlider from "../reviewsSlider";
import screenSize from "../../utilities/helpers/screenSize";

export default function scroll(container) {
    const controller = new ScrollMagic.Controller();
    const services = [...container.querySelectorAll('.service')];
    const benefits = [...container.querySelectorAll('.benefits_item')];
    const animationTime = 1;

    new ScrollMagic.Scene({
        triggerElement: '.contact',
        triggerHook: 0.7,
        reverse: false
    })
        .setTween(contact(animationTime))
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '.benefits',
        triggerHook: 0.8,
        reverse: false
    })
        .setTween(benefitsTitle(animationTime))
        .addTo(controller);

    benefits.forEach((benefitEl) => {
        new ScrollMagic.Scene({
            triggerElement: benefitEl,
            triggerHook: 0.7,
            reverse: false
        })
          .setTween(benefit(benefitEl, animationTime))
          .addTo(controller);
    });

    services.forEach((serviceEl) => {
        new ScrollMagic.Scene({
            triggerElement: serviceEl,
            triggerHook: 0.7,
            reverse: false
        })
            .setTween(service(serviceEl, animationTime))
            .addTo(controller);
    });

    new ScrollMagic.Scene({
        triggerElement: '.c-reviews-slider',
        triggerHook: 0.8,
        reverse: false
    })
            .on('start', () => {
                init(reviewsSlider, document.querySelector('.js-reviews-slider'), screenSize.lg());
            })
            .addTo(controller);
}
