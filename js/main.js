/**
 * Extreme Developer Portfolio - Main JavaScript
 * GSAP ScrollTrigger for section animations (native scroll)
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  // ========== Language, Theme & Brightness (load saved prefs first) ==========
  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  let savedTheme = localStorage.getItem('portfolio-theme') || 'petrol-amber';
  if (savedTheme === 'petrol-coral') {
    savedTheme = 'petrol-amber';
    localStorage.setItem('portfolio-theme', savedTheme);
  }
  const savedBrightness = parseFloat(localStorage.getItem('portfolio-brightness') || '1');

  document.documentElement.setAttribute('data-theme', savedTheme);

  const brightnessWrapper = document.getElementById('brightness-wrapper');
  if (brightnessWrapper) brightnessWrapper.style.filter = `brightness(${savedBrightness})`;

  function initProjectCardHover() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // ========== Render portfolio content from data ==========
  function renderPortfolio(lang) {
    const data = typeof PORTFOLIO !== 'undefined' ? PORTFOLIO : {};
    const t = typeof translations !== 'undefined' && translations[lang] ? translations[lang] : {};

    // Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && data.skills) {
      skillsGrid.innerHTML = data.skills.map((cat) => `
        <div class="skill-category" data-animate>
          <h3 data-i18n="${cat.i18nKey}">${cat.id}</h3>
          <div class="skill-tags">${cat.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join('')}</div>
        </div>
      `).join('');
    }

    // Experience
    const timeline = document.getElementById('timeline');
    if (timeline && data.experience) {
      timeline.innerHTML = data.experience.map((job) => `
        <div class="timeline-item" data-animate>
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-date">${job.date}</span>
            <h3>${job.title}</h3>
            <h4>${job.company}</h4>
            <ul>${job.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          </div>
        </div>
      `).join('');
    }

    // Projects - SaaS, Client Websites, Research & Academic
    const saasGrid = document.getElementById('projects-saas');
    const websitesGrid = document.getElementById('projects-websites');
    const researchGrid = document.getElementById('projects-research');
    if (data.projects) {
      const renderProjectCard = (id, proj, projectMeta) => {
        const hintI18n = projectMeta.url ? 'projects.visitHint' : 'projects.clickHint';
        const previewUrl = projectMeta.preview || (projectMeta.url ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(projectMeta.url)}?w=600` : null);
        const previewHtml = projectMeta.type === 'websites' && previewUrl
          ? `<div class="project-preview-wrap"><img class="project-preview" src="${previewUrl}" alt="${proj.title}" loading="lazy" onerror="this.style.display='none'"></div>`
          : '';
        const badge = projectMeta.type === 'websites' ? '<span class="project-badge" data-i18n="projects.websiteBadge">Website</span>' : (projectMeta.type === 'research' ? '<span class="project-badge" data-i18n="projects.researchBadge">Research</span>' : (projectMeta.type === 'saas' ? '<span class="project-badge" data-i18n="projects.saasBadge">Web App</span>' : ''));
        return `
          <article class="project-card ${projectMeta.type === 'websites' ? 'project-card-website' : ''} ${projectMeta.type === 'research' ? 'project-card-research' : ''} ${projectMeta.type === 'saas' ? 'project-card-saas' : ''}" data-animate data-project="${id}">
            <div class="project-card-inner">
              ${previewHtml}
              ${badge}
              <h3>${proj.title}</h3>
              <p>${proj.summary}</p>
              <div class="project-tags">${proj.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
              <span class="project-card-hint" data-i18n="${hintI18n}">${projectMeta.url ? 'Visit site' : 'Click for details'}</span>
            </div>
          </article>
        `;
      };

      const saasIds = Object.keys(data.projects).filter((id) => data.projects[id].type === 'saas');
      const websiteIds = Object.keys(data.projects).filter((id) => data.projects[id].type === 'websites');
      const researchIds = Object.keys(data.projects).filter((id) => data.projects[id].type === 'research');

      if (saasGrid) {
        saasGrid.innerHTML = saasIds.map((id) => {
          const proj = data.projects[id][lang] || data.projects[id].en;
          return renderProjectCard(id, proj, data.projects[id]);
        }).join('');
      }
      if (websitesGrid) {
        websitesGrid.innerHTML = websiteIds.map((id) => {
          const proj = data.projects[id][lang] || data.projects[id].en;
          return renderProjectCard(id, proj, data.projects[id]);
        }).join('');
      }
      if (researchGrid) {
        researchGrid.innerHTML = researchIds.map((id) => {
          const proj = data.projects[id][lang] || data.projects[id].en;
          return renderProjectCard(id, proj, data.projects[id]);
        }).join('');
      }
    }

    if (typeof applyTranslations === 'function') applyTranslations(lang);
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    initProjectCardHover();
  }

  renderPortfolio(savedLang);
  initProjectCardHover();

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === savedLang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === savedLang);
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('portfolio-lang', lang);
      document.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.lang === lang);
        b.setAttribute('aria-pressed', b.dataset.lang === lang);
      });
      renderPortfolio(lang);
    });
  });

  document.querySelectorAll('.brightness-btn').forEach((btn) => {
    const level = parseFloat(btn.dataset.level);
    btn.classList.toggle('active', level === savedBrightness);
    btn.addEventListener('click', () => {
      localStorage.setItem('portfolio-brightness', String(level));
      const wrapper = document.getElementById('brightness-wrapper');
      if (wrapper) wrapper.style.filter = `brightness(${level})`;
      document.querySelectorAll('.brightness-btn').forEach((b) => {
        b.classList.toggle('active', parseFloat(b.dataset.level) === level);
      });
    });
  });

  document.querySelectorAll('.theme-btn').forEach((btn) => {
    const theme = btn.dataset.theme;
    btn.classList.toggle('active', theme === savedTheme);
    btn.setAttribute('aria-pressed', theme === savedTheme);
    btn.addEventListener('click', () => {
      localStorage.setItem('portfolio-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      document.querySelectorAll('.theme-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.theme === theme);
        b.setAttribute('aria-pressed', b.dataset.theme === theme);
      });
    });
  });

  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.nav-dot');

  const updateNavDots = () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let activeSection = 'hero';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection = section.id;
      }
    });
    navDots.forEach((dot) => {
      dot.classList.toggle('active', dot.dataset.section === activeSection);
    });
  };

  window.addEventListener('scroll', () => requestAnimationFrame(updateNavDots));
  updateNavDots();

  // ========== Hero entrance animation ==========
  // Elements start hidden in CSS to avoid flash before GSAP runs; animate to visible.
  if (prefersReducedMotion) {
    gsap.set('.hero-name, .hero-title, .hero-subtitle, .hero-cta .btn, .scroll-hint', { opacity: 1, y: 0 });
  } else {
    gsap.to('.hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      startAt: { opacity: 0, y: 30 },
    });
    gsap.to('.hero-title, .hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
      startAt: { opacity: 0, y: 24 },
    });
    gsap.to('.hero-cta .btn', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.9,
      stagger: 0.08,
      ease: 'power2.out',
      startAt: { opacity: 0, y: 20 },
    });
    gsap.to('.scroll-hint', {
      opacity: 1,
      duration: 0.5,
      delay: 1.3,
      ease: 'power2.out',
    });
  }

  // ========== Section entrance animations (ScrollTrigger) ==========
  if (!prefersReducedMotion) {
    gsap.utils.toArray('[data-animate]').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        y: 28,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    gsap.utils.toArray('.skill-category').forEach((category) => {
      const tags = category.querySelectorAll('.skill-tag');
      if (tags.length) {
        gsap.from(tags, {
          scrollTrigger: {
            trigger: category,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
          y: 12,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out',
        });
      }
    });
  }

  // ========== Scroll progress bar ==========
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.style.width = `${self.progress * 100}%`;
      },
    });
  }

  // ========== Smooth scroll for anchor links ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== Project Modal (uses PORTFOLIO.projects from js/data/portfolio.js) ==========
  const projectData = typeof PORTFOLIO !== 'undefined' ? PORTFOLIO.projects : {};

  const modal = document.getElementById('project-modal');
  const modalTitle = modal?.querySelector('.modal-title');
  const modalHeaderActions = document.getElementById('modal-header-actions');
  const modalBody = modal?.querySelector('.modal-body');
  const modalFooter = modal?.querySelector('.modal-footer');

  function openModal(projectId) {
    const proj = projectData[projectId];
    if (!proj || !modal) return;
    const lang = localStorage.getItem('portfolio-lang') || 'en';
    const data = proj[lang] || proj.en;
    const tags = data.tagsFull || data.tags || [];
    const visitText = lang === 'el' ? 'Επίσκεψη ιστοσελίδας' : 'Visit website';
    const isWebsite = !!proj.url;

    const previewUrl = proj.preview || (proj.url ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(proj.url)}?w=800` : null);
    const previewHtml = previewUrl
      ? `<div class="modal-preview-wrap"><img class="modal-preview" src="${previewUrl}" alt="${data.title}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
      : '';

    modal.classList.toggle('modal-website', isWebsite);
    modalTitle.textContent = data.title;

    const externalLinkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
    const codeText = lang === 'el' ? 'Κώδικας (GitHub)' : 'View code';
    const githubSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
    if (modalHeaderActions) {
      const links = [];
      if (isWebsite) links.push(`<a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="modal-external-link" aria-label="${visitText}" title="${visitText}">${externalLinkSvg}</a>`);
      if (proj.repo && proj.repoPublic) links.push(`<a href="${proj.repo}" target="_blank" rel="noopener noreferrer" class="modal-external-link" aria-label="${codeText}" title="${codeText}">${githubSvg}</a>`);
      modalHeaderActions.innerHTML = links.join('');
    }

    if (isWebsite) {
      modalBody.innerHTML = `
        ${previewHtml}
        <div class="modal-website-content">
          <p>${data.description}</p>
          <ul>${(data.details || []).map((d) => `<li>${d}</li>`).join('')}</ul>
          <div class="modal-tags">${tags.map((t) => `<span>${t}</span>`).join('')}</div>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <p>${data.description}</p>
        <ul>${(data.details || []).map((d) => `<li>${d}</li>`).join('')}</ul>
        <div class="modal-tags">${tags.map((t) => `<span>${t}</span>`).join('')}</div>
      `;
    }
    modalFooter.innerHTML = '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('projects')?.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card || e.target.closest('a')) return;
    const id = card.dataset.project;
    if (id) openModal(id);
  });

  modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  // ========== Copy email ==========
  document.querySelectorAll('.contact-copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      const textEl = btn.querySelector('.contact-copy-text');
      const copiedText = typeof translations !== 'undefined'
        ? (translations[localStorage.getItem('portfolio-lang') || 'en']?.contact?.copied || 'Copied!')
        : 'Copied!';
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const orig = textEl?.textContent;
        if (textEl) textEl.textContent = copiedText;
        btn.classList.add('copied');
        setTimeout(() => {
          if (textEl) textEl.textContent = orig || 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (_) {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
});
