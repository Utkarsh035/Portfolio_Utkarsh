/* ==========================================
   UTKARSH TRIPATHI - PORTFOLIO
   JavaScript Interactions & Animations
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ========== Preloader ==========
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Start animations after preloader
      initAnimations();
    }, 2000);
  });

  // ========== Custom Cursor ==========
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    // Main cursor - instant
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower - smooth delay
    followerX += (cursorX - followerX) * 0.1;
    followerY += (cursorY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-group');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // ========== Navigation ==========
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll effect
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // ========== Smooth Scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== GSAP Animations ==========
  function initAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out'
      });
    });

    // Skill groups
    gsap.utils.toArray('.skill-group').forEach((group, i) => {
      gsap.from(group, {
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });

    // About section
    const aboutVisual = document.querySelector('.about-visual');
    const aboutContent = document.querySelector('.about-content');

    if (aboutVisual) {
      gsap.from(aboutVisual, {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (aboutContent) {
      gsap.from(aboutContent, {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }

    // Stats counter animation
    gsap.utils.toArray('.stat-value').forEach(stat => {
      const value = stat.textContent;

      if (value.includes('+') || !isNaN(parseInt(value))) {
        const num = parseInt(value);
        const suffix = value.replace(num, '');

        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            stat.textContent = Math.round(this.targets()[0].textContent) + suffix;
          }
        });
      }
    });

    // Contact section
    const contactWrapper = document.querySelector('.contact-wrapper');

    if (contactWrapper) {
      gsap.from(contactWrapper, {
        scrollTrigger: {
          trigger: contactWrapper,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // Parallax effect on hero grid
    const heroGrid = document.querySelector('.hero-grid');

    if (heroGrid) {
      gsap.to(heroGrid, {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 150,
        opacity: 0.3,
        ease: 'none'
      });
    }
  }

  // ========== Magnetic Buttons ==========
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .social-link, .nav-cta');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // ========== Project Card Tilt ==========
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // ========== Skill Group Hover ==========
  const skillGroups = document.querySelectorAll('.skill-group');

  skillGroups.forEach(group => {
    group.addEventListener('mouseenter', () => {
      gsap.to(group.querySelector('.skill-icon'), {
        scale: 1.1,
        rotate: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    group.addEventListener('mouseleave', () => {
      gsap.to(group.querySelector('.skill-icon'), {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // ========== Text Scramble Effect on Nav Links ==========
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // ========== Intersection Observer for Reveal ==========
  const revealElements = document.querySelectorAll('.skill-list li');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 50);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'all 0.4s ease';
    revealObserver.observe(el);
  });

  // ========== Contact Form Submission ==========
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      formStatus.innerHTML = "Sending...";
      formStatus.className = "form-status";
      formStatus.style.display = "block";

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          formStatus.innerHTML = "Message sent successfully! I'll get back to you soon.";
          formStatus.className = "form-status success";
          contactForm.reset();
        } else {
          console.log(response);
          formStatus.innerHTML = json.message;
          formStatus.className = "form-status error";
        }
      })
      .catch(error => {
        console.log(error);
        formStatus.innerHTML = "Something went wrong!";
        formStatus.className = "form-status error";
      })
      .then(function() {
        setTimeout(() => {
          formStatus.style.display = "none";
          formStatus.className = "form-status";
        }, 5000);
      });
    });
  }

  // ========== Footer Year ==========
  const yearEl = document.querySelector('.footer-copy');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2025', new Date().getFullYear());
  }
});
