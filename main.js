document.addEventListener('DOMContentLoaded', () => {
    initHeightFix();
    initCursor();
    initLoader();
    initSmoothScroll();
});

// 1. Mobile Height Fix
function initHeightFix() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// 2. Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    gsap.to({}, 0.016, {
        repeat: -1,
        onUpdate: () => {
            posX += (mouseX - posX) / 8;
            posY += (mouseY - posY) / 8;
            gsap.set(follower, { css: { left: posX - 15, top: posY - 15 } });
            gsap.set(cursor, { css: { left: mouseX, top: mouseY } });
        }
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent', duration: 0.3 }));
        link.addEventListener('mouseleave', () => gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.4)', duration: 0.3 }));
    });
}

// 3. Curtain Loader – runs first, then fires hero animations
function initLoader() {
    gsap.registerPlugin(ScrollTrigger);

    const loaderLogo    = document.querySelector('.loader-logo');
    const loaderLine    = document.querySelector('.loader-line');
    const loaderContent = document.querySelector('.loader-content');
    const curtainLeft   = document.querySelector('.curtain-left');
    const curtainRight  = document.querySelector('.curtain-right');
    const loader        = document.querySelector('#loader');

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(loader, { display: 'none' });
            initHeroAnimations();
        }
    });

    // Step 1: Logo fades in
    tl.to(loaderLogo, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        // Step 2: Line expands from center
        .to(loaderLine, { width: 180, duration: 1, ease: 'power3.inOut' }, '-=0.2')
        // Step 3: Brief hold
        .to({}, { duration: 0.35 })
        // Step 4: Logo & line fade out upward
        .to([loaderLogo, loaderLine], { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' })
        // Step 4b: Immediately hide loader-content so NO residual line appears during curtain split
        .set(loaderContent, { display: 'none' })
        // Step 5: Curtains open left & right
        .to(curtainLeft,  { xPercent: -100, duration: 1.2, ease: 'expo.inOut' })
        .to(curtainRight, { xPercent:  100, duration: 1.2, ease: 'expo.inOut' }, '<');
}

// 4. Hero Animations (fired after curtain completes)
function initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from('.header-logo', { y: -50, opacity: 0, duration: 1.2, ease: 'power4.out' })
        .from('.nav-item', { y: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.8')
        .from('.reveal', { y: '100%', opacity: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out' }, '-=1')
        .from('.hero-marquee', { opacity: 0, y: 80, duration: 1.2, ease: 'power3.out' }, '-=1.2');
}

// 5. Smooth Scroll for Anchors
function initSmoothScroll() {
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: targetElement, offsetY: 80 },
                    ease: 'power4.inOut'
                });
            }
        });
    });
}
