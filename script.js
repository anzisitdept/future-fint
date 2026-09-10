/* =============================================
   FUTURE FINT — 2026 Interactive Motion System
   GSAP + ScrollTrigger + Micro-Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  } else {
    initFallbackAnimations();
  }

  // General UI Features
  initScrollProgress();
  initNavbarBehavior();
  initFaqAccordion();
  initTerminalInteractions();
  initMagneticButtons();
  initMobileNav();
});

/* ===================================================
   1. HERO ENTRANCE SEQUENCE & 3D PARALLAX (GSAP)
   =================================================== */
function initGSAPAnimations() {
  const isDesktop = window.innerWidth > 991;

  // Hero Entrance Sequence Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 0.0s: Navbar softly fades down
  heroTl.fromTo('.navbar', 
    { y: -25, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 
    0.0
  );

  // 0.15s: Eyebrow pill fades in
  heroTl.fromTo('.hero__pill-tag', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6 }, 
    0.15
  );

  // 0.3s: "Be Financially" reveals upward via mask
  heroTl.fromTo('.hero-text-1', 
    { y: '110%' }, 
    { y: '0%', duration: 0.85, ease: 'power4.out' }, 
    0.3
  );

  // 0.45s: "Free." reveals in Future Fint purple gradient
  heroTl.fromTo('.hero-text-2', 
    { y: '110%' }, 
    { y: '0%', duration: 0.85, ease: 'power4.out' }, 
    0.45
  );

  // 0.6s: Paragraph fades upward
  heroTl.fromTo('.hero__body', 
    { y: 25, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.75 }, 
    0.6
  );

  // 0.75s: CTA buttons appear
  heroTl.fromTo('.hero__ctas', 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.7 }, 
    0.75
  );

  // 0.85s: Social proof strip
  heroTl.fromTo('.hero__social-proof', 
    { y: 15, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6 }, 
    0.85
  );

  // 0.3s – 1.1s: Pedestal, Arc, Phone, and 4 Floating Cards Entrance
  if (document.querySelector('.hero__phone-frame')) {
    // Pedestal rises
    heroTl.fromTo('.hero-pedestal-platform',
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
      0.3
    );

    // Candlestick Arc atmosphere
    heroTl.fromTo('.hero__candlestick-arc',
      { opacity: 0, scale: 0.9 },
      { opacity: 0.85, scale: 1, duration: 1.1, ease: 'power2.out' },
      0.35
    );

    // Phone Frame enters with subtle 3D perspective
    heroTl.fromTo('.hero__phone-frame', 
      { y: 50, rotateX: 6, opacity: 0 }, 
      { y: 0, rotateX: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
      0.4
    );

    // 4 Floating cards entrance sequence
    heroTl.fromTo('#heroFloat1', 
      { scale: 0.8, opacity: 0, x: -25 }, 
      { scale: 1, opacity: 1, x: 0, duration: 0.75, ease: 'back.out(1.6)' }, 
      0.65
    );
    heroTl.fromTo('#heroFloat2', 
      { scale: 0.8, opacity: 0, x: 25 }, 
      { scale: 1, opacity: 1, x: 0, duration: 0.75, ease: 'back.out(1.6)' }, 
      0.75
    );
    heroTl.fromTo('#heroFloat3', 
      { scale: 0.8, opacity: 0, x: 25 }, 
      { scale: 1, opacity: 1, x: 0, duration: 0.75, ease: 'back.out(1.6)' }, 
      0.85
    );
    heroTl.fromTo('#heroFloat4', 
      { scale: 0.8, opacity: 0, x: 25 }, 
      { scale: 1, opacity: 1, x: 0, duration: 0.75, ease: 'back.out(1.6)' }, 
      0.95
    );
  }

  // Subtle continuous breathing motion for phone
  gsap.to('.hero__phone-frame', {
    y: 6,
    duration: 3.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.2
  });

  // Desktop Mouse 3D Depth Parallax
  if (isDesktop) {
    const heroVisual = document.getElementById('heroVisual');
    const heroPhone = document.getElementById('heroPhoneFrame');
    const heroPedestal = document.getElementById('heroPedestal');
    const float1 = document.getElementById('heroFloat1');
    const float2 = document.getElementById('heroFloat2');
    const float3 = document.getElementById('heroFloat3');
    const float4 = document.getElementById('heroFloat4');

    if (heroVisual && heroPhone) {
      document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) - 0.5;
        const yPos = (clientY / window.innerHeight) - 0.5;

        // Subtle phone tilt in 3D
        gsap.to(heroPhone, {
          rotateY: xPos * 6,
          rotateX: -yPos * 5,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        // Subtle pedestal shift
        if (heroPedestal) {
          gsap.to(heroPedestal, {
            x: -xPos * 8,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        // Multi-layered card parallax
        if (float1) {
          gsap.to(float1, {
            x: -xPos * 18,
            y: -yPos * 14,
            duration: 1.0,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (float2) {
          gsap.to(float2, {
            x: -xPos * 22,
            y: -yPos * 16,
            duration: 1.0,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (float3) {
          gsap.to(float3, {
            x: -xPos * 15,
            y: -yPos * 12,
            duration: 1.0,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        if (float4) {
          gsap.to(float4, {
            x: -xPos * 24,
            y: -yPos * 18,
            duration: 1.0,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    }
  }

  /* ===================================================
     2. GLOBAL SCROLL REVEALS & HEADINGS
     =================================================== */
  // Masked Section Headings
  gsap.utils.toArray('.section-heading').forEach((heading) => {
    const maskInners = heading.querySelectorAll('.mask-inner');
    if (maskInners.length > 0) {
      gsap.fromTo(maskInners, 
        { y: '110%' }, 
        {
          y: '0%',
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Trust Strip Stagger
  gsap.fromTo('.trust-strip__item', 
    { opacity: 0, y: 15, scale: 0.95 }, 
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.trust-strip',
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* ===================================================
     3. WE DON'T SELL COURSES (SCROLL STORYTELLING)
     =================================================== */
  const coursesTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#coursesComparison',
      start: 'top 78%',
      toggleActions: 'play none none none'
    }
  });

  coursesTl.fromTo('#coursesOldSide', 
    { opacity: 0.8, x: 0 }, 
    { opacity: 0.55, x: -15, duration: 0.8, ease: 'power2.out' }
  )
  .fromTo('#coursesBridge', 
    { opacity: 0, scale: 0.8 }, 
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 
    '-=0.4'
  )
  .fromTo('#coursesNewSide', 
    { opacity: 0, x: 30, scale: 0.95 }, 
    { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, 
    '-=0.3'
  );

  /* ===================================================
     4. TELEGRAM STICKY SHOWCASE (4 SEQUENTIAL STAGES)
     =================================================== */
  const stage1 = document.getElementById('tgStage1');
  const stage2 = document.getElementById('tgStage2');
  const stage3 = document.getElementById('tgStage3');
  const stage4 = document.getElementById('tgStage4');

  const msg1 = document.getElementById('tgMsg1');
  const msg2 = document.getElementById('tgMsg2');
  const msg3 = document.getElementById('tgMsg3');
  const typing = document.getElementById('tgTypingIndicator');

  if (document.getElementById('tgStickyStage')) {
    const stages = [stage1, stage2, stage3, stage4];
    const msgs = [msg1, msg2, msg3, typing];

    stages.forEach((stage, idx) => {
      if (!stage) return;
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 70%',
        onEnter: () => activateStage(idx),
        onEnterBack: () => activateStage(idx)
      });
    });

    function activateStage(index) {
      stages.forEach((s, i) => {
        if (s) {
          if (i === index) s.classList.add('active');
          else s.classList.remove('active');
        }
      });

      msgs.forEach((m, i) => {
        if (m) {
          if (i === index) {
            m.classList.add('active-highlight');
            gsap.fromTo(m, { scale: 0.97 }, { scale: 1.02, duration: 0.35, ease: 'power2.out' });
          } else {
            m.classList.remove('active-highlight');
            gsap.to(m, { scale: 1, duration: 0.3 });
          }
        }
      });
    }
  }

  /* ===================================================
     5. "A REAL TRADING ENVIRONMENT..." SECTION
     =================================================== */
  gsap.fromTo('#purpleImmersiveCard', 
    { scale: 0.95, opacity: 0.9 }, 
    {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#trading-environment',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* ==================== 6. REVIEWS STAGGER ENTRANCE ==================== */
  gsap.fromTo('.review-card', 
    { y: 25, opacity: 0 }, 
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reviews-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* ==================== 7. HOW IT WORKS LINE ANIMATION ==================== */
  const lineFill = document.querySelector('.connecting-line-fill');
  if (lineFill) {
    ScrollTrigger.create({
      trigger: '.steps-flow-container',
      start: 'top 75%',
      onEnter: () => { lineFill.style.width = '100%'; }
    });
  }

  gsap.fromTo('.step-card', 
    { y: 25, opacity: 0 }, 
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.steps-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* ==================== 8. FINAL CTA SCALE ENTRANCE ==================== */
  gsap.fromTo('#finalCtaBox', 
    { scale: 0.96, opacity: 0.9 }, 
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#finalCta',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ===================================================
   FALLBACK ANIMATIONS
   =================================================== */
function initFallbackAnimations() {
  document.querySelectorAll('.mask-inner').forEach(el => {
    el.style.transform = 'translateY(0)';
  });
  document.querySelectorAll('.hero__body, .hero__ctas, .hero__social-proof, .trust-strip__item, .review-card').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

/* ===================================================
   SCROLL PROGRESS BAR
   =================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

/* ===================================================
   NAVBAR GLASSMORPHISM & ACTIVE LINKS
   =================================================== */
function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Detection
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Sticky Mobile CTA Visibility
  const mobileCta = document.getElementById('mobileStickyCta');
  const hero = document.getElementById('home');

  if (mobileCta && hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          mobileCta.classList.add('visible');
        } else {
          mobileCta.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(hero);
  }
}

/* ===================================================
   TRADING TERMINAL TIMEFRAME INTERACTION
   =================================================== */
function initTerminalInteractions() {
  const tfButtons = document.querySelectorAll('.tf-btn');
  tfButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tfButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ===================================================
   MOBILE NAVIGATION MENU
   =================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ===================================================
   FAQ ACCORDION
   =================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===================================================
   MAGNETIC BUTTON EFFECT (DESKTOP)
   =================================================== */
function initMagneticButtons() {
  if (window.innerWidth < 992) return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}
