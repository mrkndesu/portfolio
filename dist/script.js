document.addEventListener('DOMContentLoaded', function () {
    // GSAPにプラグインを登録
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    var scroller = document.querySelector('.scroll-container');
    var preloader = document.querySelector('.preloader');
    // --- ローディングアニメーション ---
    var masterTl = gsap.timeline();
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
        onComplete: function () {
            if (preloader)
                preloader.style.display = 'none';
        }
    })
        // ステップ3: 本体表示
        .to(scroller, {
        visibility: 'visible',
        duration: 0
    }, "-=0.5")
        // ステップ4: タイピングアニメーション
        .to('.hero-title-fg', {
        text: { value: "Mu", delimiter: "" },
        duration: 0.6,
        ease: 'none',
        onComplete: function () {
            var bgTitle = document.querySelector('.hero-title-bg');
            if (bgTitle)
                bgTitle.textContent = "Muu";
        }
    })
        // ステップ5: インパクトのある発光アニメーション
        .to('.hero-title-fg', {
        clipPath: 'inset(0 0% 0 0)',
        textShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.8)',
        duration: 0.1,
        ease: 'power2.in'
    })
        .to('.hero-title-fg', {
        textShadow: '0 0 80px rgba(255, 255, 255, 0.5), 0 0 120px rgba(255, 255, 255, 0.3)',
        duration: 0.4,
        ease: 'power2.out'
    })
        .to('.hero-title-fg', {
        textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
        duration: 1.5,
        ease: 'power3.out'
    })
        // ステップ6: サブタイトルとリンクのフェードイン
        .to('.hero-subtitle, .hero-github-link', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, "<");
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
    // Skillsセクション
    var skillsTl = gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#skills',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    skillsTl.to('#skills .section-header, #skills .section-content', {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
    })
        .fromTo('.skill-level', { width: '0%' }, { width: function (i, target) { return "".concat(target.dataset.level, "%"); }, duration: 1.5, ease: 'power3.out', stagger: 0.1 }, "<" // 同時に開始
    );
    // Worksセクション
    gsap.timeline({
        scrollTrigger: {
            scroller: scroller,
            trigger: '#works',
            start: 'top 60%',
            toggleActions: 'play none none none'
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
