// GSAPの型をTypeScriptに認識させる
declare const gsap: any;
declare const ScrollTrigger: any;

document.addEventListener('DOMContentLoaded', () => {
    // GSAPにプラグインを登録
    gsap.registerPlugin(ScrollTrigger);
    
    const scroller = document.querySelector('.scroll-container');
    const preloader = document.querySelector('.preloader') as HTMLElement;

    // --- 1. ローディングとイントロのマスタータイムライン ---
    const masterTl = gsap.timeline();

    masterTl
        // ステップ1: ローディングバー
        .to('.loading-bar-progress', {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        // ステップ2: ローディング画面フェードアウト
        .to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                if(preloader) preloader.style.display = 'none';
            }
        })
        // ステップ3: 本体表示
        .to(scroller, {
            visibility: 'visible',
            duration: 0
        }, "-=0.5")
        // ステップ4: ヒーロー要素のフェードインアニメーション
        .fromTo('.hero-title-container, .hero-subtitle, .hero-github-link', 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: 'power4.out', 
                stagger: 0.1
            }
        );

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
            toggleActions: 'play none none none'
        }
    }).to('#about .section-header, #about .section-content', { 
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2, 
        ease: 'power4.out',
        stagger: 0.1
    });

    // Skillセクション
    const skillsTl = gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#skill',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    skillsTl.to('#skill .section-header, #skill .section-content', { 
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      })
      .fromTo('.skill-level', 
          { width: '0%' }, 
          { width: (i, target) => `${(target as HTMLElement).dataset.level}%`, duration: 1.5, ease: 'power3.out', stagger: 0.1 },
          "<"
      );

    // Workセクション
    gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#work',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    }).to('#work .section-header, #work .section-content, #work .work-card', { 
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