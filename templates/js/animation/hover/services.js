import { TimelineMax, Power4 } from 'gsap';

export default function services(service) {
    const img = service.querySelector('.service_img');
    const title = service.querySelector('.service_title');
    const arrow = service.querySelector('.service_arrow');
    const tl = new TimelineMax({ paused: true });
    const animationTime = 1.25;

    tl
        .to(img, animationTime, {
            scale: 1.1,
            ease: Power4.easeInOut
        })
        .to(title, animationTime, {
            x: -50,
            ease: Power4.easeInOut
        }, 0)
        .to(arrow, animationTime, {
            width: '4rem',
            ease: Power4.easeInOut
        }, 0);

    service.addEventListener('mouseenter', () => { tl.play(); });
    service.addEventListener('mouseleave', () => { tl.reverse(); });
}
