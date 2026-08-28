/* =============================================
   FAZCODE — Main Script
   No i18n, No Dark Mode Toggle
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ============ TYPING ANIMATION ============
  const typedEl = document.getElementById('typedText');
  const cursorEl = document.getElementById('typedCursor');
  const words = ['Website yang Menjual', 'Bisnis yang Dikenal', 'Pelanggan Tetap'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 3500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ============ NAVBAR SCROLL ============
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ============ BACK TO TOP ============
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============ HAMBURGER MENU ============
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ============ FLOATING WA CHAT BUBBLE ============
  const floatingWA = document.getElementById('floatingWA');
  const waChatBubble = document.getElementById('waChatBubble');

  if (floatingWA && waChatBubble) {
    floatingWA.addEventListener('click', (e) => {
      e.preventDefault();
      waChatBubble.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!floatingWA.contains(e.target) && !waChatBubble.contains(e.target)) {
        waChatBubble.classList.remove('active');
      }
    });

    // Icon morph cycling
    const morphIcons = floatingWA.querySelectorAll('.wa-morph-icon');
    const shapes = ['shape-circle', 'shape-square'];
    let currentIcon = 0;

    if (morphIcons.length > 0) {
      morphIcons[0].classList.add('active');
      floatingWA.classList.add(shapes[0]);

      setInterval(() => {
        morphIcons[currentIcon].classList.remove('active');
        floatingWA.classList.remove(shapes[currentIcon]);

        currentIcon = (currentIcon + 1) % morphIcons.length;

        morphIcons[currentIcon].classList.add('active');
        floatingWA.classList.add(shapes[currentIcon]);
      }, 4500);
    }
  }

  // ============ PORTFOLIO FILTERS ============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      portfolioCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hidden');
        }
      });

      // Reset show more when filter changes
      resetShowMore();
    });
  });

  // ============ SHOW MORE / LESS ============
  const showMoreBtn = document.getElementById('showMoreBtn');
  const VISIBLE_COUNT = 4;
  let isExpanded = false;

  function applyShowMore() {
    const visibleCards = Array.from(portfolioCards).filter(c => !c.classList.contains('hidden'));
    visibleCards.forEach((card, i) => {
      if (!isExpanded && i >= VISIBLE_COUNT) {
        card.classList.add('hidden-by-more');
      } else {
        card.classList.remove('hidden-by-more');
      }
    });

    if (isExpanded) {
      showMoreBtn.innerHTML = 'Tampilkan Lebih Sedikit <i class="fa-solid fa-chevron-up"></i>';
    } else {
      showMoreBtn.innerHTML = 'Tampilkan Semua <i class="fa-solid fa-chevron-down"></i>';
    }

    // Hide button if not enough cards
    if (visibleCards.length <= VISIBLE_COUNT) {
      showMoreBtn.style.display = 'none';
    } else {
      showMoreBtn.style.display = '';
    }
  }

  function resetShowMore() {
    isExpanded = false;
    applyShowMore();
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      applyShowMore();
    });
  }

  // Initial apply
  applyShowMore();

  // ============ TESTIMONIAL CAROUSEL ============
  const testimonials = [
    {
      text: '"Website-nya keren banget, cocok sama konsep barbershop. Pelanggan sekarang bisa booking lewat online."',
      name: 'The Mafia Barbershop',
      role: 'Barbershop, Surabaya',
      avatar: 'images/themafia-logo.jpg',
      rating: '5.0'
    },
    {
      text: '"Prosesnya cepat dan hasilnya sesuai permintaan. Sangat recommended untuk UMKM!"',
      name: 'MLB Supply',
      role: 'Fashion Retail',
      avatar: 'images/mlb-logo.jpg',
      rating: '5.0'
    }
  ];

  let currentTestimonial = 0;
  const testimonialText = document.getElementById('testimonialText');
  const testimonialName = document.getElementById('testimonialName');
  const testimonialRole = document.getElementById('testimonialRole');
  const testimonialAvatar = document.getElementById('testimonialAvatar');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  function updateTestimonial(index) {
    const t = testimonials[index];
    testimonialText.textContent = t.text;
    testimonialName.textContent = t.name;
    testimonialRole.textContent = t.role;
    if (t.avatar) {
      testimonialAvatar.src = t.avatar;
      testimonialAvatar.alt = t.name;
      testimonialAvatar.style.display = '';
    } else {
      testimonialAvatar.style.display = 'none';
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });
  }

  // ============ PORTFOLIO TOGGLE DESC ============
  window.toggleDesc = function(btn) {
    const wrap = btn.parentElement;
    const desc = wrap.querySelector('.portfolio-desc');
    desc.classList.toggle('expanded');
    if (desc.classList.contains('expanded')) {
      btn.textContent = 'Tutup';
    } else {
      btn.textContent = 'Selengkapnya';
    }
  };

  // ============ FAQ ACCORDION ============
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============ SCROLL REVEAL ============
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============ SMOOTH SCROLL FOR NAV LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============ ACTIVE NAV LINK ON SCROLL ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--accent-container)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

});