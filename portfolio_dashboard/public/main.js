const PROFILE = {
  links: {
    github: 'https://github.com/Lefyd24',
    linkedin: 'https://www.linkedin.com/in/eleftherios-fthenos',
    email: 'mailto:fthenosyd@gmail.com',
  },
};

const PROJECTS = [
  {
    id: 'mitsis_budget',
    category: 'internal_saas',
    featured: true,
    title: 'Mitsis Budget',
    whatItIs: 'A group-wide budgeting and forecasting platform used across 24 hotel properties.',
    problem: 'Replaces spreadsheet budgeting with approvals, auditability, and consistent reporting in one system.',
    built: [
      'Budget planning for procurement/costs, room revenue & occupancy, payroll/headcount, and other revenue',
      'Role-based workflows with Microsoft single sign-on',
      'Embedded reporting (Power BI) and automated data sync from the central data warehouse (Azure SQL)',
      'Background processing for heavy operations (exports/approvals) with progress surfaced in the UI',
    ],
    tech: ['Django', 'Python', 'SQL Server', 'Redis', 'Celery', 'Power BI', 'ag-Grid', 'Nginx/Gunicorn'],
    links: [],
  },
  {
    id: 'cash_flow_management',
    category: 'internal_saas',
    title: 'Cash Flow Management',
    whatItIs: 'A cash-flow planning and approval system for payments and revenues across the group.',
    problem: 'Centralizes cash planning, standardizes submissions, and enables a controlled two-stage approval process.',
    built: [
      'Payment plans generated from ERP Excel exports (normalization + transformation pipeline)',
      'Revenue planning (manual entry) and inter-company transfers support',
      'Two-stage approvals with notifications and reporting by period',
      'Embedded Power BI views and an archive area for finance references',
    ],
    tech: ['Flask', 'Python', 'SQL Server', 'SQLAlchemy', 'Pandas/NumPy', 'Bootstrap', 'AG Grid', 'Power BI', 'Gunicorn'],
    links: [],
  },
  {
    id: 'attendance_shift_planning',
    category: 'internal_saas',
    title: 'Attendance & Shift Planning',
    whatItIs: 'One app for daily attendance and weekly shift planning across multiple hotels.',
    problem: 'Unifies attendance capture, approvals, and payroll-ready exports with scheduling in a single workflow.',
    built: [
      'Daily attendance submission + staged approvals (validation → manager → accountant → payroll submission)',
      'Weekly shift planning: schedules, shift assignments, departments',
      'Multi-hotel access model with permissioned switching',
      'Microsoft SSO, Excel exports, integrations where required; Greek localization + dark/light mode',
    ],
    tech: ['Django', 'Python', 'SQL Server', 'Tailwind CSS', 'daisyUI', 'Tabulator', 'Azure AD', 'Pandas', 'Excel exports'],
    links: [],
  },
  {
    id: 'proforma_invoice_generator',
    category: 'internal_saas',
    title: 'Proforma Invoice Generator',
    whatItIs: 'Generates Excel proforma (pre-billing) invoices from hotel reservation data.',
    problem: 'Automates a time-consuming invoice preparation workflow and standardizes the output documents.',
    built: [
      'Generate formatted Excel invoices for selected hotels and time periods; provide download when ready',
      'Microsoft SSO; background job execution with concurrency limits',
      'Performance improvements via caching for repeated queries',
      'REST API + interactive docs for integration/operations',
    ],
    tech: ['FastAPI', 'Python', 'SQL Server', 'openpyxl', 'Pandas', 'Tailwind', 'daisyUI', 'OAuth2 (Azure AD)'],
    links: [],
  },
  {
    id: 'guest_review_analytics',
    category: 'internal_saas',
    title: 'Guest Review Analytics (TrustYou)',
    whatItIs: 'Review analytics dashboard + reporting tool connected to a third-party guest review platform.',
    problem: 'Makes guest feedback actionable by aggregating scores and surfacing negative themes by hotel and department.',
    built: [
      'Filterable views for scores, sentiment, and review text',
      'Quality reporting across hotels (scores, response rate, distributions)',
      'Department-focused reports that group negative feedback by category; Excel exports for operational follow-up',
    ],
    tech: ['Flask', 'Python', 'REST APIs', 'Pandas', 'openpyxl', 'Jinja2', 'Excel reporting'],
    links: [],
  },
  {
    id: 'karaviotis_law',
    category: 'public_website',
    featured: true,
    title: 'George Karaviotis Law Firm',
    whatItIs: 'Modern bilingual website (English/Greek) for a law office in Heraklion, Crete.',
    problem: 'Presents practice areas professionally with a responsive, accessible UX and working contact flow.',
    built: ['Bilingual structure and content', 'Responsive UI and accessibility controls', 'Contact form via serverless functions + email provider'],
    tech: ['HTML/CSS/JS', 'Cloudflare Pages', 'Cloudflare Functions', 'TypeScript', 'Markdown-based content build'],
    links: [
      { label: 'Live site', href: 'https://karaviotislaw.gr/' },
      { label: 'Repo', href: 'https://github.com/Lefyd24/Karaviotis' },
    ],
  },
  {
    id: 'hconvrp_solver',
    category: 'public_research',
    featured: true,
    title: 'HConVRP Solver (Thesis)',
    whatItIs: 'Thesis project implementing a solver for a complex vehicle routing problem with an interactive web UI.',
    problem: 'Provides an interactive environment for experiments, progress tracking, and visualization of routing heuristics.',
    built: [
      'Python solver with heuristics (Tabu Search + variable neighbourhood methods)',
      'Web UI with live progress updates and visualizations',
      'Dataset-driven experiments and performance tracking',
    ],
    tech: ['Python', 'Flask', 'WebSockets', 'Pandas', 'NumPy', 'scikit-learn'],
    links: [{ label: 'Repo', href: 'https://github.com/Lefyd24/HConVRP' }],
  },
];

const EXPERIENCE = [
  {
    date: 'Jan 2025 – Present',
    title: 'Business Analytics Assistant Manager',
    company: 'Mitsis Group',
    bullets: [
      'Lead development of Python-based enterprise applications for financial process automation',
      'Design and deploy Django/Flask web applications for cross-departmental workflow optimization',
      'Architect SQL databases and data pipelines supporting business intelligence initiatives',
    ],
  },
  {
    date: 'Mar 2024 – Present',
    title: 'Project Manager (Parallel Role)',
    company: 'Mitsis Group',
    bullets: ["Lead digital transformation project for group's construction company", 'Conduct in-depth process analysis and workflow optimization'],
  },
  {
    date: 'Aug 2023 – Jan 2025',
    title: 'Senior Business Analyst',
    company: 'Mitsis Group',
    bullets: [
      'Built custom enterprise web apps using Python, Django, Flask, JavaScript for finance automation',
      'Developed APIs and backend services reducing manual workload by 40%',
      'Co-led Azure Data Warehouse implementation with SQL optimization',
    ],
  },
  {
    date: 'Oct 2022 – Aug 2023',
    title: 'Business Analyst',
    company: 'Mitsis Group',
    bullets: [
      'Developed Power BI dashboards & templates, reducing report generation time by 80%',
      'Automated payroll and accounting systems using Python and Power Automate',
    ],
  },
  {
    date: 'Mar 2019 – Mar 2021',
    title: 'Project Coordinator',
    company: 'DayTrip4U / TripGiant Ltd.',
    bullets: ['Negotiated with global suppliers achieving 15% cost reduction', 'Conducted competitive analysis using Price2Spy & Google Analytics', 'Led market expansion strategies and standardized operational procedures'],
  },
];

const SKILLS = [
  { id: 'backend', label: 'Backend', tags: ['Python', 'Django', 'Flask', 'FastAPI', 'Celery', 'REST APIs', 'ETL'] },
  { id: 'frontend', label: 'Frontend', tags: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'] },
  { id: 'databases', label: 'Databases', tags: ['SQL Server', 'MySQL', 'Redis', 'MongoDB', 'SparkSQL'] },
  { id: 'analytics', label: 'Analytics', tags: ['Power BI', 'Advanced Excel', 'Qlik Sense', 'SAS'] },
  { id: 'devops', label: 'DevOps', tags: ['Azure', 'Git', 'Docker', 'Power Automate'] },
];

const SKILL_ICONS = {
  python: 'python',
  django: 'django',
  flask: 'flask',
  fastapi: 'fastapi',
  celery: 'celery',
  'rest apis': 'postman',
  etl: 'vscode',
  javascript: 'javascript',
  html5: 'html',
  css3: 'css',
  bootstrap: 'bootstrap',
  'sql server': 'postgres',
  mysql: 'mysql',
  redis: 'redis',
  mongodb: 'mongodb',
  sparksql: 'apache',
  'power bi': 'powerbi',
  'advanced excel': 'vscode',
  'qlik sense': 'vscode',
  sas: 'vscode',
  azure: 'azure',
  git: 'git',
  docker: 'docker',
  'power automate': 'azure',
};

function categoryLabel(c) {
  if (c === 'internal_saas') return 'Internal SaaS';
  if (c === 'public_website') return 'Websites';
  if (c === 'public_research') return 'Research';
  return c;
}

function compactTech(tech) {
  const max = 4;
  if (tech.length <= max) return { visible: tech, hiddenCount: 0 };
  return { visible: tech.slice(0, max), hiddenCount: tech.length - max };
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, String(v));
  }
  for (const c of children) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  return node;
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio_dashboard_theme', theme);
  const isDark = theme === 'petrolDark';
  document.getElementById('theme-dark')?.classList.toggle('btn-primary', isDark);
  document.getElementById('theme-dark')?.classList.toggle('btn-ghost', !isDark);
  document.getElementById('theme-light')?.classList.toggle('btn-primary', !isDark);
  document.getElementById('theme-light')?.classList.toggle('btn-ghost', isDark);
  document.getElementById('theme-dark')?.setAttribute('aria-pressed', String(isDark));
  document.getElementById('theme-light')?.setAttribute('aria-pressed', String(!isDark));
}

const ROUTES = {
  overview: { file: 'overview.html', title: 'Home', init: null },
  projects: { file: 'projects.html', title: 'Projects', init: initProjectsPage },
  experience: { file: 'experience.html', title: 'Experience', init: () => { renderExperience(); } },
  skills: { file: 'skills.html', title: 'Skills', init: () => { renderSkills(); } },
  about: { file: 'about.html', title: 'About', init: null },
  contact: { file: 'contact.html', title: 'Contact', init: null },
};

const VALID_ROUTES = Object.keys(ROUTES);
const DEFAULT_ROUTE = 'overview';

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '').trim();
  return VALID_ROUTES.includes(hash) ? hash : DEFAULT_ROUTE;
}

function showLoader() {
  const el = document.getElementById('page-loader');
  if (el) {
    el.classList.remove('hidden');
    el.setAttribute('aria-busy', 'true');
  }
}

function hideLoader() {
  const el = document.getElementById('page-loader');
  if (el) {
    el.classList.add('hidden');
    el.setAttribute('aria-busy', 'false');
  }
}

async function loadPage(routeId) {
  const content = document.getElementById('page-content');
  const config = ROUTES[routeId];
  if (!content || !config) return;

  showLoader();
  try {
    const res = await fetch(`./sections/${config.file}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load: ${config.file}`);
    content.innerHTML = await res.text();
    if (typeof config.init === 'function') config.init();
  } catch (err) {
    content.innerHTML = '<div class="alert alert-error"><span>This page could not be loaded. Serve the site from a local server (e.g. <code>npx serve public</code>) and try again.</span></div>';
    console.error(err);
  } finally {
    hideLoader();
  }

  updateBreadcrumb(config.title);
  updateNavActive(routeId);
}

function updateBreadcrumb(title) {
  const crumb = document.getElementById('breadcrumb');
  if (crumb) crumb.textContent = title;
}

function updateNavActive(routeId) {
  document.querySelectorAll('a[data-nav]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const isActive = href === `#${routeId}`;
    a.classList.toggle('active', isActive);
  });
}

function getSkillIconId(tag) {
  const key = (tag || '').toLowerCase().replace(/\s+/g, ' ').trim();
  if (SKILL_ICONS[key]) return SKILL_ICONS[key];
  const normalized = key.replace(/\s+/g, '_');
  return SKILL_ICONS[normalized] || 'vscode';
}

function skillIconUrl(iconId) {
  const theme = document.documentElement.getAttribute('data-theme') === 'petrolDark' ? 'dark' : 'light';
  return `https://skillicons.dev/icons?i=${iconId}&theme=${theme}`;
}

function renderSkills() {
  const root = document.getElementById('skills-grid');
  if (!root) return;
  root.innerHTML = '';

  const categoryIcons = { backend: 'python', frontend: 'css', databases: 'postgres', analytics: 'vscode', devops: 'docker' };

  for (const group of SKILLS) {
    const catIcon = categoryIcons[group.id] || 'vscode';
    const header = el('div', { class: 'flex items-center gap-3 pb-3 border-b border-base-300' }, [
      el('img', {
        src: skillIconUrl(catIcon),
        alt: '',
        class: 'h-8 w-8 rounded-lg bg-base-200 p-1',
        width: 32,
        height: 32,
      }),
      el('h3', { class: 'text-lg font-semibold', text: group.label }),
    ]);

    const skillChips = group.tags.map((tag) => {
      const iconId = getSkillIconId(tag);
      const chip = el(
        'div',
        {
          class:
            'flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-primary/40 cursor-default',
        },
        [
          el('img', {
            src: skillIconUrl(iconId),
            alt: '',
            class: 'h-5 w-5 shrink-0',
            width: 20,
            height: 20,
          }),
          el('span', { class: 'text-sm font-medium', text: tag }),
        ],
      );
      return chip;
    });

    const card = el(
      'div',
      {
        class:
          'card bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-base-content/10 transition-all duration-300',
      },
      [el('div', { class: 'card-body p-4 sm:p-5' }, [header, el('div', { class: 'mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2' }, skillChips)])],
    );
    root.appendChild(card);
  }
}

function renderExperience() {
  const root = document.getElementById('experience-timeline');
  if (!root) return;
  root.innerHTML = '';

  for (const job of EXPERIENCE) {
    const li = el('li', {}, [
      el('div', { class: 'timeline-middle' }, [el('div', { class: 'h-3 w-3 rounded-full bg-primary' })]),
      el('div', { class: 'timeline-end mb-8' }, [
        el('div', { class: 'flex flex-col gap-1' }, [
          el('div', { class: 'text-sm opacity-70', text: job.date }),
          el('div', { class: 'text-lg font-semibold', text: job.title }),
          el('div', { class: 'font-medium opacity-90', text: job.company }),
        ]),
        el(
          'ul',
          { class: 'mt-3 space-y-2' },
          job.bullets.map((b) =>
            el('li', { class: 'flex items-start gap-2' }, [el('span', { class: 'mt-2 inline-block h-1.5 w-1.5 rounded-full bg-base-content/50' }), el('span', { class: 'opacity-90', text: b })]),
          ),
        ),
      ]),
      el('hr'),
    ]);
    root.appendChild(li);
  }
}

function openProjectModal(project) {
  const dlg = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const links = document.getElementById('modal-links');
  const body = document.getElementById('modal-body');
  if (!dlg || !title || !links || !body) return;

  title.textContent = project.title;
  links.innerHTML = '';
  body.innerHTML = '';

  const chip = el('span', { class: 'badge badge-outline', text: categoryLabel(project.category) });
  links.appendChild(chip);
  for (const l of project.links || []) {
    links.appendChild(el('a', { class: 'badge badge-primary badge-outline', href: l.href, target: '_blank', rel: 'noreferrer', text: l.label }));
  }

  body.appendChild(el('div', {}, [el('div', { class: 'text-xs uppercase tracking-wide opacity-70', text: 'What it is' }), el('div', { class: 'mt-1 font-medium', text: project.whatItIs })]));
  body.appendChild(el('div', {}, [el('div', { class: 'text-xs uppercase tracking-wide opacity-70', text: 'Problem' }), el('div', { class: 'mt-1 opacity-90', text: project.problem })]));
  body.appendChild(
    el('div', {}, [
      el('div', { class: 'text-xs uppercase tracking-wide opacity-70', text: 'What I built' }),
      el('ul', { class: 'mt-2 space-y-2' }, project.built.map((b) => el('li', { class: 'flex items-start gap-2' }, [el('span', { class: 'mt-2 inline-block h-1.5 w-1.5 rounded-full bg-base-content/50' }), el('span', { class: 'opacity-90', text: b })]))),
    ]),
  );
  body.appendChild(
    el('div', {}, [
      el('div', { class: 'text-xs uppercase tracking-wide opacity-70', text: 'Tech' }),
      el('div', { class: 'mt-2 flex flex-wrap gap-2' }, project.tech.map((t) => el('span', { class: 'badge badge-ghost', text: t }))),
    ]),
  );

  dlg.showModal();
}

function categoryStyles(category) {
  if (category === 'internal_saas') return { media: 'from-primary/20 to-primary/5', badge: 'badge-primary', btn: 'btn-primary' };
  if (category === 'public_website') return { media: 'from-secondary/20 to-secondary/5', badge: 'badge-secondary', btn: 'btn-secondary' };
  if (category === 'public_research') return { media: 'from-accent/20 to-accent/5', badge: 'badge-accent', btn: 'btn-accent' };
  return { media: 'from-base-300 to-base-200', badge: 'badge-ghost', btn: 'btn-ghost' };
}

function buildProjectCard(p) {
  const styles = categoryStyles(p.category);
  const isFeatured = !!p.featured;
  const tech = compactTech(p.tech || []);

  const mediaClass = 'aspect-[4/3] w-full bg-gradient-to-br ' + styles.media + ' flex items-center justify-center relative';
  const cardClass =
    'card bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col';

  const productMedia = el('div', { class: mediaClass }, [
    el('div', { class: 'text-5xl sm:text-6xl font-bold text-base-content/10 select-none', text: p.title.charAt(0) }),
    ...(isFeatured
      ? [
          el('div', {
            class: 'absolute top-3 right-3 badge badge-warning badge-sm shadow',
            text: 'Featured',
          }),
        ]
      : []),
  ]);

  const categoryBadge = el('span', { class: 'badge badge-sm ' + styles.badge, text: categoryLabel(p.category) });
  const titleEl = el('h3', { class: 'text-lg font-semibold leading-tight group-hover:text-primary transition-colors', text: p.title });
  const descEl = el('p', { class: 'line-clamp-2 text-sm text-base-content/70', text: p.whatItIs || p.problem || '' });
  const techWrap = el(
    'div',
    { class: 'flex flex-wrap gap-1.5' },
    tech.visible
      .map((t) => el('span', { class: 'badge badge-ghost badge-xs', text: t }))
      .concat(tech.hiddenCount > 0 ? [el('span', { class: 'badge badge-ghost badge-xs', text: `+${tech.hiddenCount}` })] : []),
  );
  const ctaBtn = el(
    'button',
    {
      type: 'button',
      class: 'btn btn-sm ' + styles.btn + ' w-full mt-auto',
      onClick: (e) => {
        e.stopPropagation();
        openProjectModal(p);
      },
    },
    ['View project'],
  );

  const body = el('div', { class: 'card-body p-4 sm:p-5 flex flex-col flex-1' }, [
    categoryBadge,
    titleEl,
    descEl,
    el('div', { class: 'mt-3 flex flex-wrap gap-1.5' }, [techWrap]),
    el('div', { class: 'mt-4 pt-3 border-t border-base-300' }, [ctaBtn]),
  ]);

  const card = el(
    'div',
    {
      class: cardClass,
      role: 'button',
      tabIndex: 0,
      onClick: () => openProjectModal(p),
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(p);
        }
      },
    },
    [productMedia, body],
  );

  return card;
}

function renderProjects({ filter, query }) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();
  const items = PROJECTS.filter((p) => {
    if (filter && filter !== 'all' && p.category !== filter) return false;
    if (!q) return true;
    const hay = [p.title, p.whatItIs, p.problem, (p.tech || []).join(' '), (p.built || []).join(' ')].join(' ').toLowerCase();
    return hay.includes(q);
  });

  if (items.length === 0) {
    grid.appendChild(
      el('div', { class: 'col-span-full rounded-2xl border border-dashed border-base-300 bg-base-200/50 p-8 text-center opacity-70' }, [
        el('p', { class: 'text-sm', text: 'No projects match. Try a different search or filter.' }),
      ]),
    );
    return;
  }

  // Featured first, then rest
  const featured = items.filter((p) => p.featured);
  const rest = items.filter((p) => !p.featured);
  const ordered = [...featured, ...rest];

  for (const p of ordered) {
    grid.appendChild(buildProjectCard(p));
  }
}

function setupNavigation() {
  window.addEventListener('hashchange', () => loadPage(getRouteFromHash()));

  document.querySelector('.drawer-side')?.addEventListener('click', (e) => {
    if (e.target.closest('a[data-nav]')) {
      const drawer = document.getElementById('nav-drawer');
      if (drawer?.checked) drawer.checked = false;
    }
  });
}

function initProjectsPage() {
  const search = document.getElementById('project-search');
  let filter = 'all';

  document.querySelectorAll('button[data-filter]').forEach((b) => {
    const active = (b.getAttribute('data-filter') || '') === 'all';
    b.classList.toggle('btn-primary', active);
    b.classList.toggle('btn-ghost', !active);
  });

  const render = () => renderProjects({ filter, query: search?.value || '' });

  document.querySelectorAll('button[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      filter = btn.getAttribute('data-filter') || 'all';
      document.querySelectorAll('button[data-filter]').forEach((b) => {
        const active = (b.getAttribute('data-filter') || 'all') === filter;
        b.classList.toggle('btn-primary', active);
        b.classList.toggle('btn-ghost', !active);
      });
      render();
    });
  });

  search?.addEventListener('input', render);
  render();
}

function setupGlobalSearchShortcut() {
  window.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target;
    const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (isTyping) return;
    if (getRouteFromHash() !== 'projects') return;
    e.preventDefault();
    document.getElementById('project-search')?.focus();
  });
}

function boot() {
  const savedTheme = localStorage.getItem('portfolio_dashboard_theme');
  if (savedTheme === 'petrolDark' || savedTheme === 'petrolLight') setTheme(savedTheme);
  else setTheme('petrolDark');

  document.getElementById('theme-dark')?.addEventListener('click', () => setTheme('petrolDark'));
  document.getElementById('theme-light')?.addEventListener('click', () => setTheme('petrolLight'));

  setupNavigation();
  setupGlobalSearchShortcut();

  const initialRoute = getRouteFromHash();
  if (window.location.hash !== '#' + initialRoute) window.location.hash = initialRoute;
  else loadPage(initialRoute);
}

document.addEventListener('DOMContentLoaded', boot);

