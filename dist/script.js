document.addEventListener('DOMContentLoaded', function () {
    // GSAPにScrollTriggerプラグインを登録
    gsap.registerPlugin(ScrollTrigger);
    var scroller = document.querySelector('.scroll-container');
    // --- ▼ ヒーローセクションのアニメーション (GitHubリンクを追加) ▼ ---
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
    }, "-=0.8") // subtitleを少し早く開始
        .to('.hero-github-link', {
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, "-=0.8"); // subtitleと同時に開始
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
    var skillsTl = gsap.timeline({
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
        .fromTo('.skill-level', { width: '0%' }, { width: function (i, target) { return "".concat(target.dataset.level, "%"); }, duration: 1.5, ease: 'power3.out', stagger: 0.1 });
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
    var hamburger = document.querySelector('.hamburger-menu');
    var nav = document.querySelector('.nav-links');
    var navLinks = document.querySelectorAll('.nav-links a');
    var toggleNav = function () {
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    };
    hamburger.addEventListener('click', toggleNav);
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () { if (nav.classList.contains('nav-active')) {
            toggleNav();
        } });
    });
});
