// GSAPの型をTypeScriptに認識させる
declare const gsap: any;
declare const ScrollTrigger: any;

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    const scroller = document.querySelector('.scroll-container');

    // --- ヒーローセクションのアニメーション ---
    gsap.timeline({ delay: 0.5 })
        .to('.hero-title .char', {
            y: 0,
            rotate: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'back.out(1.7)'
        })
        .to('.hero-subtitle', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, "-=0.8") // タイトルのアニメーションと重なるように開始
        .to('.hero-github-link', {
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, "-=0.8"); // サブタイトルのアニメーションと重なるように開始

    // --- 背景のパララックス効果 ---
    gsap.to('.background-stars', {
        y: '20vh',
        scrollTrigger: {
            scroller: scroller,
            trigger: 'main',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });
    
    // --- 各セクションのアニメーション ---
    // Aboutセクション
    gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    }).to('#about .section-header, #about .section-content', { 
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2, 
        ease: 'power4.out',
        stagger: 0.1
    });

    // Skillsセクション
    const skillsTl = gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#skills',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });
    skillsTl.to('#skills .section-header, #skills .section-content', { 
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      })
      .fromTo('.skill-level', 
          { width: '0%' }, 
          { width: (i, target) => `${(target as HTMLElement).dataset.level}%`, duration: 1.5, ease: 'power3.out', stagger: 0.1 }
      );

    // Worksセクション
    gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#works',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    }).to('#works .section-header, #works .section-content, #works .work-card', { 
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
    });

    // --- ハンバーガーメニュー ---
    const hamburger = document.querySelector('.hamburger-menu') as HTMLButtonElement;
    const nav = document.querySelector('.nav-links') as HTMLElement;
    const navLinks = document.querySelectorAll('.nav-links a');

    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    };

    hamburger.addEventListener('click', toggleNav);
    navLinks.forEach(link => {
        link.addEventListener('click', () => { if (nav.classList.contains('nav-active')) { toggleNav(); } });
    });
});