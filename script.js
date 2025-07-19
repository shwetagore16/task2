document.addEventListener('DOMContentLoaded', () => {

    // 1. Lenis Smooth Scroll
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('.link');

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // 3. Advanced Text Reveal for Main Heading
    const heading = document.querySelector('.main-heading');
    const text = heading.textContent;
    heading.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        heading.appendChild(span);
    });

    // 4. Intro Animation Timeline
    const tl = gsap.timeline();
    tl.from('.navbar', { y: -100, duration: 1, ease: 'power3.out' })
      .from('.nav-links a', { y: -30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.5")
      .to('.char', {
          y: 0,
          stagger: { amount: 0.5 },
          delay: 0.5,
          ease: 'power4.out'
      }, "-=0.8")
      .from('.sub-heading, .hero-content .btn', { opacity: 0, y: 20, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=.8");

    // 5. Scroll-Triggered Animations
    const sections = document.querySelectorAll('.content-section');

    sections.forEach(section => {
        const image = section.querySelector('.section-image img');
        const textContent = section.querySelector('.section-text');
        const serviceCards = section.querySelectorAll('.service-card');

        // Image zoom-in effect
        if (image) {
            gsap.fromTo(image, 
                { scale: 1.2 }, 
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }

        // Text fade-in effect
        if (textContent) {
            gsap.from(textContent.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
        
        // Service cards fade-in effect
        if(serviceCards.length > 0) {
            gsap.from(serviceCards, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-container',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });
});
