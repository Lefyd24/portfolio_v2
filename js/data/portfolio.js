export const PORTFOLIO = {
  skills: [
    {
      id: 'backend',
      tags: ['Python', 'Django', 'Flask', 'FastAPI', 'Celery', 'REST APIs', 'ETL'],
    },
    {
      id: 'frontend',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      id: 'databases',
      tags: ['SQL Server', 'MySQL', 'Redis', 'MongoDB', 'SparkSQL'],
    },
    {
      id: 'analytics',
      tags: ['Power BI', 'Advanced Excel', 'Qlik Sense', 'SAS'],
    },
    {
      id: 'devops',
      tags: ['Azure', 'Git', 'Docker', 'Power Automate'],
    },
  ],

  experience: [
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
      bullets: [
        "Lead digital transformation project for group's construction company",
        'Conduct in-depth process analysis and workflow optimization',
      ],
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
      bullets: [
        'Negotiated with global suppliers achieving 15% cost reduction',
        'Conducted competitive analysis using Price2Spy & Google Analytics',
        'Led market expansion strategies and standardized operational procedures',
      ],
    },
  ],

  projects: {
    budget: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/MitsisBudget',
      repoPublic: false,
      en: {
        title: 'Mitsis Budget',
        summary:
          'Budget planning and forecasting platform for a hotel group (24 properties). Replaces spreadsheets with one system for procurement, revenue, payroll and other budgets, plus approvals and embedded reporting.',
        tags: ['Django', 'Azure AD', 'Azure SQL (EDW)', 'Celery', 'Redis', 'Power BI'],
        description:
          'Group-wide budget management platform for Mitsis Hotels. Centralizes budget domains (Material, Turnover, Payroll, Other Clients, OPEX, Quality Analytics) and integrates with the Enterprise Data Warehouse (Azure SQL). Uses Microsoft SSO and asynchronous tasks for heavy operations.',
        details: [
          'Budget domains: Material, Turnover, Payroll, Other Clients, OPEX, Quality Analytics',
          'EDW integration with read-only models + multi-database routing (default/edw/attendance)',
          'Microsoft OAuth2 via django-allauth with role-based access',
          'Celery + Redis for async initialization, backups, and email notifications',
          'Optional Power BI Embedded dashboards',
        ],
      },
    },
    cashflow: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/CashflowApp',
      repoPublic: false,
      en: {
        title: 'Cash Flow Management',
        summary:
          'Group-wide cash flow planning for a hotel group. Accountants submit payment and revenue plans; finance and executive leadership approve in two stages. Integrates with ERP data and Power BI for reporting.',
        tags: ['Flask', 'SQL Server', 'Pandas/NumPy', 'Bootstrap', 'Power BI'],
        description:
          'Cash-flow planning and approval system that creates a single source of truth for group cash programs. Accountants upload ERP exports; the app validates and transforms them into standardized schedules. Includes controlled approvals, auditability, supplemental payments, and reporting views.',
        details: [
          'Guided submission for payments/revenues + inter-company transactions',
          'ERP Excel uploads processed with Pandas/NumPy (vectorized transformations)',
          'Two-stage approval flow (accounting leadership → executive approval) with notifications',
          'Supplemental amounts workflow after finalization',
          'Reporting, summary statements, intragroup views, and bank balances via embedded Power BI',
        ],
      },
    },
    attendance: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/MitsisAttendance_v2',
      repoPublic: false,
      en: {
        title: 'Attendance & Shift Planning',
        summary:
          'One app for daily attendance and weekly shift planning across multiple hotels. Staff submit attendance; managers and accountants approve in stages, then submit to payroll. Shift plans and Excel export included.',
        tags: ['Django', 'Microsoft Entra ID', 'Tailwind', 'daisyUI', 'Django Channels', 'Excel export'],
        description:
          'Mitsis Attendance System v2: successor to the original Daily Attendance app. Adds a redesigned UI and a Work Schedules module, plus real-time collaboration for attendance editing via WebSockets. Supports multi-hotel switching and a multi-stage approval workflow up to payroll submission.',
        details: [
          'Workflow: PRL Extract → Validation → Manager Stage → Accountant Stage → Submission',
          'Multi-hotel/company access with session-based switching',
          'Real-time collaboration (Django Channels + WebSockets): autosave, live sync, presence',
          'Excel export using SheetJS (xlsx)',
          'Work Schedules module: weekly schedules, shift + department assignments',
          'Modern responsive UI with dark/light mode and full Greek localization',
          'Built on Django 5.2 with Microsoft Entra ID SSO via django-allauth',
          'Predecessor: internal repo `MitsisDevelopment/attendance` (v1)',
        ],
      },
    },
    proforma: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/Proforma_v2',
      repoPublic: false,
      en: {
        title: 'Proforma Invoice Generator',
        summary:
          'Generates Excel proforma invoices from hotel reservation data. Users pick hotels and date ranges; the app builds the documents in the background and notifies when ready. Single sign-on and rate limiting to avoid overload.',
        tags: ['FastAPI', 'Azure AD', 'Async', 'Task queue', 'Caching', 'Excel'],
        description:
          'High-performance FastAPI app for generating detailed Excel proforma invoices by querying reservation data across hotels. Uses Microsoft Azure AD authentication (cookie-based OAuth2) and asynchronous processing with a concurrency-limited task queue.',
        details: [
          'Cookie-based Azure AD OAuth2 authentication + session management',
          'Async processing with real-time task status updates and downloads',
          'Semaphore + thread-pool task queue to control concurrency and resource usage',
          'Database query caching with TTL + cache management endpoints',
          'Swagger docs available at `/docs`',
        ],
      },
    },
    trustyou: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/TrustYouAPI',
      repoPublic: false,
      en: {
        title: 'Guest Review Analytics',
        summary:
          'Internal dashboard and reporting tool that connects to a third-party guest review API (TrustYou). View scores, sentiment and review text by hotel and period; export quality and department reports to Excel.',
        tags: ['Flask', 'TrustYou API', 'Pandas', 'openpyxl', 'Excel reporting'],
        description:
          'Internal analytics + reporting tool built on the TrustYou Analytics API. Produces quality reports across hotels and department/category-level negative review reports, exported to Excel with structured formatting.',
        details: [
          'Fetches hotel KPIs (score, performance, response rate) and review distributions by star rating',
          'Computes negative review counts and percentages and outputs a “quality” Excel report',
          'Generates department/category negative review reports with key takeaways (matches) and styled Excel output',
          'Uses environment-based API key configuration and a maintained mapping of hotel TrustYou IDs',
        ],
      },
    },
    hconvrp: {
      type: 'research',
      repo: 'https://github.com/Lefyd24/HConVRP',
      repoPublic: true,
      publicationUrl: 'https://doi.org/10.26219/heal.aueb.360',
      publicationPreviewText:
        'A Variable Neighborhood Descent (VND) heuristic is proposed to solve HConVRP with heterogeneous fleet and service-consistency constraints, exploring neighborhoods like ChangeVehicleChain, SwapVehicle, Relocation, and 2-Opt.',
      en: {
        title: 'HConVRP Solver',
        summary:
          'Thesis project: solver + web app for the Consistent Vehicle Routing Problem with heterogeneous fleet (HConVRP). Implements a Tabu Search framework with a Variable Neighbourhood Descent component and includes datasets + result visualization.',
        tags: ['Python', 'Flask', 'Optimization', 'Tabu Search', 'VND'],
        description:
          'Research project implementing a solution framework for the Consistent VRP with heterogeneous fleet, inspired by the referenced paper. Ships as both a plain Python solver (CLI-driven) and a Flask web app for dataset management, solver runs, and inspecting solutions.',
        details: [
          'CLI solver for running experiments on benchmark instances',
          'Web application for managing datasets, running the solver, and visualizing results',
          'Hierarchical Tabu Search with an underlying Variable Neighbourhood Descent algorithm',
          'Datasets included in original `.txt` and project `.yaml` formats',
          'Publication + thesis citation available in the repository',
        ],
      },
    },
    forest_fire_smoke_detection: {
      type: 'research',
      repo: 'https://github.com/Lefyd24/Forest-Fire-Smoke-Detection',
      repoPublic: true,
      url: 'https://forestfiresmokedetection.streamlit.app/',
      image: 'https://media.githubusercontent.com/media/Lefyd24/Forest-Fire-Smoke-Detection/main/preview_predictions/processed_video.gif',
      en: {
        title: 'Forest Fire & Smoke Detection',
        summary:
          'MSc project demonstrating YOLOv8 vs YOLOv7 for forest fire and smoke detection, trained with identical parameters. Includes a Streamlit app, model weights, and inference-time comparisons on a 2,750-image test set.',
        tags: ['Python', 'YOLOv8', 'YOLOv7', 'Streamlit', 'Computer Vision'],
        description:
          'Demonstration of two trained models (YOLOv8 and YOLOv7) for image/video inference with the same training setup (dataset, epochs, compute). Packaged as a Streamlit app for interactive inference and includes report + preview assets.',
        details: [
          'Trained on Fire Image Dataset V2 (Roboflow) on Google Colab (T4 GPU)',
          'Model weights included for YOLOv8 and YOLOv7',
          'Streamlit app for interactive image/video inference',
          'Inference-time benchmarking scripts and plots (2,750 test images)',
          'Detailed report PDF + notebooks for training/inference',
        ],
      },
    },
    karaviotis: {
      type: 'websites',
      url: 'https://karaviotislaw.gr/',
      repo: 'https://github.com/Lefyd24/Karaviotis',
      repoPublic: false,
      image: 'https://s0.wp.com/mshots/v1/https://www.karaviotislaw.gr?w=1200',
      en: {
        title: 'George Karaviotis Law Firm',
        summary:
          'Bilingual (EN/EL) law firm website for EU-qualified lawyer Georgios Karaviotis, Heraklion Crete. Corporate, M&A, real estate, immigration, environmental & labour law. Contact form via Cloudflare Functions.',
        tags: ['HTML/CSS', 'JavaScript', 'Cloudflare Pages', 'Bilingual', 'Responsive'],
        description:
          'Client website built for a law firm: bilingual structure (EN/EL), clean UX, and a dependable contact flow backed by serverless functions. Designed to communicate practice areas clearly for international and local clients.',
        details: [
          'Bilingual content structure (English / Greek)',
          'Responsive UI and accessibility-first choices',
          'Serverless contact form flow',
          'Deployed as a static site (fast, reliable, low-maintenance)',
        ],
      },
    },
  },
}

