document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initAnimations();
    initExpertiseHovers();
    initSmoothScroll();
});

// 1. Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onUpdate: () => {
            posX += (mouseX - posX) / 6;
            posY += (mouseY - posY) / 6;

            gsap.set(follower, {
                css: {
                    left: posX - 20,
                    top: posY - 20
                }
            });

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Expand follower on links
    const links = document.querySelectorAll('a, button, .expertise-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                scale: 2,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderColor: 'transparent',
                duration: 0.3
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,0,0,0.2)',
                duration: 0.3
            });
        });
    });
}

// 2. GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal
    const tl = gsap.timeline();

    tl.from('.header-logo', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
        .from('.nav-item', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-heading', {
            y: 200,
            skewY: 10,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.hero-desc', {
            opacity: 0,
            x: -50,
            duration: 1
        }, '-=1')
        .from('.hero-marquee', {
            opacity: 0,
            y: 50,
            duration: 1
        }, '-=1');

    // Split Text Animation for Sections
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // Pillar Item Revels
    const pillars = document.querySelectorAll('.expertise-item');
    pillars.forEach((pillar, i) => {
        gsap.from(pillar, {
            scrollTrigger: {
                trigger: pillar,
                start: 'top 90%'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

// 3. Expertise Hover Visuals
function initExpertiseHovers() {
    const items = document.querySelectorAll('.expertise-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => { });
    });
}

// 4. Smooth Scroll for Anchors
function initSmoothScroll() {
    gsap.registerPlugin(ScrollToPlugin);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power4.inOut'
                });
            }
        });
    });
}
