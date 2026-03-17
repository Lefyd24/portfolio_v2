/**
 * Portfolio Data - Single source of truth for skills, projects, experience.
 *
 * HOW TO UPDATE:
 * - Skills: Add/remove/edit items in the skills array.
 * - Experience: Add/remove/edit jobs. Greek translations in js/i18n.js.
 * - Projects: Each has type ('saas' | 'websites'), optional url, optional preview (screenshot URL).
 *   Websites: add url and optionally preview (image URL). Falls back to screenshot API if no preview.
 */

const PORTFOLIO = {
  skills: [
    {
      id: 'backend',
      i18nKey: 'skills.backend',
      tags: ['Python', 'Django', 'Flask', 'FastAPI', 'Celery', 'REST APIs', 'ETL'],
    },
    {
      id: 'frontend',
      i18nKey: 'skills.frontend',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      id: 'databases',
      i18nKey: 'skills.databases',
      tags: ['SQL Server', 'MySQL', 'Redis', 'MongoDB', 'SparkSQL'],
    },
    {
      id: 'analytics',
      i18nKey: 'skills.analytics',
      tags: ['Power BI', 'Advanced Excel', 'Qlik Sense', 'SAS'],
    },
    {
      id: 'devops',
      i18nKey: 'skills.devops',
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
      repo: 'https://github.com/MitsisDevelopment/MitsisAdminApp',
      repoPublic: false,
      en: {
        title: 'Mitsis Budget',
        summary: 'Budget planning and forecasting platform for a hotel group (24 properties). Replaces spreadsheets with one system for procurement, revenue, payroll and other budgets, plus approvals and embedded reporting.',
        tags: ['Django', 'Azure AD', 'Power BI', 'Celery', 'Redis', 'ag-Grid'],
        description: 'Internal web app for group-wide budget management. Finance and hotel managers plan and approve budgets for procurement, room revenue, payroll and other income in one place. Data is synced from the company’s central data warehouse (Azure SQL); dashboards are embedded via Power BI. Includes versioning, role-based access with single sign-on (Azure AD), and background processing for heavy tasks.',
        details: [
          'Single platform for all budget types: procurement and per-guest costs, room revenue and occupancy, payroll and headcount, other revenue—across 24 hotels',
          'Role-based access (analysts, hotel managers, finance leadership) with Microsoft single sign-on; full audit trail of changes',
          'Automatic sync with central data warehouse; live Power BI reports embedded in the app; REST API for integrations',
          'Background job processing for exports and approvals; real-time progress in the UI; high-performance tables (ag-Grid)',
          'Django backend, SQL Server, Redis, Celery; Nginx and Gunicorn in production',
        ],
        tagsFull: ['Django', 'Python', 'Celery', 'Redis', 'SQL Server', 'Azure AD', 'Power BI', 'ag-Grid', 'Bootstrap', 'Nginx', 'Gunicorn', 'REST API'],
      },
      el: {
        title: 'Mitsis Budget',
        summary: 'Πλατφόρμα σχεδιασμού και πρόβλεψης προϋπολογισμών για ξενοδοχειακό όμιλο (24 μονάδες). Αντικαθιστά τα spreadsheets με ένα σύστημα για προμήθειες, έσοδα, μισθοδοσία και άλλους προϋπολογισμούς, με εγκρίσεις και ενσωματωμένες αναφορές.',
        tags: ['Django', 'Azure AD', 'Power BI', 'Celery', 'Redis', 'ag-Grid'],
        description: 'Εσωτερική εφαρμογή για κεντρική διαχείριση προϋπολογισμών. Οι οικονομικοί και οι διευθυντές ξενοδοχείων σχεδιάζουν και εγκρίνουν προϋπολογισμούς προμηθειών, εσόδων δωματίων, μισθοδοσίας και άλλων εσόδων σε ένα σημείο. Τα δεδομένα συγχρονίζονται από την κεντρική αποθήκη δεδομένων (Azure SQL)· οι πίνακες ελέγχου ενσωματώνονται μέσω Power BI. Versioning, δικαιώματα ανά ρόλο με single sign-on (Azure AD), επεξεργασία βαριών εργασιών στο παρασκήνιο.',
        details: [
          'Μία πλατφόρμα για όλους τους τύπους προϋπολογισμού: προμήθειες και κόστη ανά επισκέπτη, έσοδα δωματίων και πληρότητα, μισθοδοσία και προσωπικό, άλλα έσοδα—σε 24 ξενοδοχεία',
          'Πρόσβαση ανά ρόλο (αναλυτές, διευθυντές ξενοδοχείων, οικονομική ηγεσία) με Microsoft single sign-on· πλήρες ιστορικό αλλαγών',
          'Αυτόματος συγχρονισμός με την κεντρική αποθήκη δεδομένων· ζωντανές αναφορές Power BI μέσα στην εφαρμογή· REST API για ενσωματώσεις',
          'Επεξεργασία εργασιών στο παρασκήνιο για εξαγωγές και εγκρίσεις· ζωντανή πρόοδος στο UI· πίνακες υψηλής απόδοσης (ag-Grid)',
          'Backend Django, SQL Server, Redis, Celery· Nginx και Gunicorn σε production',
        ],
        tagsFull: ['Django', 'Python', 'Celery', 'Redis', 'SQL Server', 'Azure AD', 'Power BI', 'ag-Grid', 'Bootstrap', 'Nginx', 'Gunicorn', 'REST API'],
      },
    },
    cashflow: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/CashflowApp',
      repoPublic: false,
      en: {
        title: 'Cash Flow Management',
        summary: 'Group-wide cash flow planning for a hotel group. Accountants submit payment and revenue plans; finance and executive leadership approve in two stages. Integrates with ERP data and Power BI for reporting.',
        tags: ['Flask', 'SQL Server', 'Pandas', 'Bootstrap', 'AG Grid', 'Power BI'],
        description: 'Web app for planning and approving company cash flows. Accountants build payment plans by uploading Excel exports from the group’s ERP; the system normalizes the data and produces structured payment and revenue schedules. Revenues can be entered manually. Two-stage approval (accounting leadership first, then senior management) with optional edits between stages. Includes inter-company transfers, reporting by period, and embedded Power BI views for bank balances. Role-based access and an archive for contracts, tax and payroll references.',
        details: [
          'Central database for all cash flow plans; accountants upload ERP Excel files—the app processes them (Pandas/NumPy) into standardized payment and revenue schedules',
          'Two-stage approval workflow: first by accounting leadership, then by senior management; automated notifications when plans are approved',
          'Reporting by period, summary views, inter-company transaction reports; bank balance dashboards via embedded Power BI',
          'Archive area for supplier agreements, tax and payroll references, and a portal for departments to flag updates',
          'Flask, SQL Server, Bootstrap, AG Grid, Chart.js; Gunicorn in production',
        ],
        tagsFull: ['Flask', 'SQLAlchemy', 'SQL Server', 'Pandas', 'NumPy', 'openpyxl', 'Bootstrap', 'AG Grid', 'Chart.js', 'Power BI', 'Gunicorn'],
      },
      el: {
        title: 'Διαχείριση Ταμειακών Ροών',
        summary: 'Ομαδικός σχεδιασμός ταμειακών ροών για ξενοδοχειακό όμιλο. Οι λογιστές υποβάλλουν πλάνα πληρωμών και εσόδων· η οικονομική και η ανώτατη διοίκηση εγκρίνουν σε δύο στάδια. Ενσωμάτωση με δεδομένα ERP και Power BI για αναφορές.',
        tags: ['Flask', 'SQL Server', 'Pandas', 'Bootstrap', 'AG Grid', 'Power BI'],
        description: 'Εφαρμογή web για σχεδιασμό και έγκριση ταμειακών ροών. Οι λογιστές φτιάχνουν πλάνα πληρωμών ανεβάζοντας Excel από το ERP του ομίλου· η εφαρμογή κανονικοποιεί τα δεδομένα και παράγει πίνακες πληρωμών και εσόδων. Τα έσοδα μπορούν να εισαχθούν χειροκίνητα. Δίσταδια έγκριση (πρώτα η λογιστική ηγεσία, μετά η ανώτατη διοίκηση) με προαιρετικές διορθώσεις. Διαταιρικές κινήσεις, αναφορές ανά περίοδο, ενσωματωμένα Power BI για τραπεζικά υπόλοιπα. Δικαιώματα ανά ρόλο και αρχείο συμβάσεων, φορολογίας και μισθοδοσίας.',
        details: [
          'Κεντρική βάση για όλα τα πλάνα ταμειακών ροών· οι λογιστές ανεβάζουν Excel από το ERP—η εφαρμογή τα επεξεργάζεται (Pandas/NumPy) σε τυποποιημένους πίνακες πληρωμών και εσόδων',
          'Δίσταδια ροή έγκρισης: πρώτα από τη λογιστική ηγεσία, μετά από την ανώτατη διοίκηση· αυτόματες ειδοποιήσεις upon έγκριση',
          'Αναφορές ανά περίοδο, σύνοψη, αναφορές διαταιρικών συναλλαγών· πίνακες τραπεζικών υπολοίπων μέσω ενσωματωμένου Power BI',
          'Αρχείο συμβάσεων προμηθευτών, φορολογίας και μισθοδοσίας· portal για τμήματα να ενημερώνουν αλλαγές',
          'Flask, SQL Server, Bootstrap, AG Grid, Chart.js· Gunicorn σε production',
        ],
        tagsFull: ['Flask', 'SQLAlchemy', 'SQL Server', 'Pandas', 'NumPy', 'openpyxl', 'Bootstrap', 'AG Grid', 'Chart.js', 'Power BI', 'Gunicorn'],
      },
    },
    attendance: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/MitsisAttendance_v2',
      repoPublic: false,
      en: {
        title: 'Attendance & Shift Planning',
        summary: 'One app for daily attendance and weekly shift planning across multiple hotels. Staff submit attendance; managers and accountants approve in stages, then submit to payroll. Shift plans and Excel export included.',
        tags: ['Django', 'Azure AD', 'Tailwind', 'daisyUI', 'SQL Server', 'Excel'],
        description: 'Internal web app for a hotel group: daily employee attendance and weekly work schedules in a single place. Staff record and submit attendance; the approval chain runs from validation through manager to accountant, then to payroll. Managers create and edit weekly shift plans and assign employees to shifts and departments. Supports multiple hotels; each user sees only their assigned properties. Login is via Microsoft (Azure AD). The app integrates with the Greek national employment system (Ergani) where required, and exports data to Excel for payroll. Modern responsive UI with dark/light theme and full Greek localization.',
        details: [
          'Daily attendance: staff submit; managers and accountants approve in sequence; corrections allowed within set rules; view of recent submission history; export to Excel for payroll',
          'Shift planning: create and edit weekly work schedules; assign employees to shifts and departments',
          'Microsoft single sign-on; role-based access (staff, managers, accountants, admins); users switch between hotels they have access to',
          'Multi-hotel setup; integration with central data warehouse for time data; connection to Greek employment authority API (Ergani) where needed',
          'Django, SQL Server, Tailwind CSS, daisyUI, Tabulator for data tables; responsive UI with dark/light mode and full Greek interface',
        ],
        tagsFull: ['Django', 'Python', 'Tailwind CSS', 'daisyUI', 'Tabulator', 'Azure AD', 'SQL Server', 'Pandas', 'Excel', 'REST'],
      },
      el: {
        title: 'Προσέλευση & Σχεδιασμός Βαρδιών',
        summary: 'Μία εφαρμογή για ημερήσια προσέλευση και εβδομαδιαίο σχεδιασμό βαρδιών σε πολλά ξενοδοχεία. Το προσωπικό υποβάλλει· οι διευθυντές και οι λογιστές εγκρίνουν σε στάδια και υποβάλλουν στη μισθοδοσία. Πλάνα βαρδιών και εξαγωγή Excel.',
        tags: ['Django', 'Azure AD', 'Tailwind', 'daisyUI', 'SQL Server', 'Excel'],
        description: 'Εσωτερική εφαρμογή web για ξενοδοχειακό όμιλο: ημερήσια προσέλευση και εβδομαδιαία ωράρια σε ένα σημείο. Το προσωπικό καταγράφει και υποβάλλει την προσέλευση· η αλυσίδα έγκρισης περνά από validation σε διευθυντή και λογιστή, μετά στη μισθοδοσία. Οι διευθυντές δημιουργούν και επεξεργάζονται εβδομαδιαία πλάνα βαρδιών και αναθέτουν προσωπικό σε βάρδιες και τμήματα. Υποστηρίζει πολλά ξενοδοχεία· κάθε χρήστης βλέπει μόνο τις ανατεθειμένες μονάδες. Σύνδεση με Microsoft (Azure AD). Ενσωμάτωση με το εθνικό σύστημα απασχόλησης (Εργάνη) όπου απαιτείται και εξαγωγή δεδομένων σε Excel για μισθοδοσία. Σύγχρονο responsive UI με θέμα dark/light και πλήρη ελληνική γλώσσα.',
        details: [
          'Ημερήσια προσέλευση: το προσωπικό υποβάλλει· διευθυντές και λογιστές εγκρίνουν διαδοχικά· διορθώσεις εντός κανόνων· ιστορικό υποβολών· εξαγωγή Excel για μισθοδοσία',
          'Σχεδιασμός βαρδιών: δημιουργία και επεξεργασία εβδομαδιαίων ωραρίων· ανάθεση εργαζομένων σε βάρδιες και τμήματα',
          'Microsoft single sign-on· δικαιώματα ανά ρόλο (προσωπικό, διευθυντές, λογιστές, admins)· εναλλαγή ξενοδοχείου ανά χρήστη',
          'Πολυ-ξενοδοχειακή ρύθμιση· ενσωμάτωση με κεντρική αποθήκη δεδομένων για χρόνο· σύνδεση με API Εργάνη όπου χρειάζεται',
          'Django, SQL Server, Tailwind CSS, daisyUI, Tabulator για πίνακες· responsive UI με dark/light και πλήρη ελληνική γλώσσα',
        ],
        tagsFull: ['Django', 'Python', 'Tailwind CSS', 'daisyUI', 'Tabulator', 'Azure AD', 'SQL Server', 'Pandas', 'Excel', 'REST'],
      },
    },
    proforma: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/Proforma_v2',
      repoPublic: false,
      en: {
        title: 'Proforma Invoice Generator',
        summary: 'Generates Excel proforma invoices from hotel reservation data. Users pick hotels and date ranges; the app builds the documents in the background and notifies when ready. Single sign-on and rate limiting to avoid overload.',
        tags: ['FastAPI', 'Azure AD', 'SQL Server', 'Excel', 'Tailwind', 'Async'],
        description: 'Internal tool for a hotel group: staff request proforma (pre-billing) invoices for upcoming reservations. The app pulls reservation data from the group’s SQL Server, produces formatted Excel invoices, and lets users download them when ready. Login is via Microsoft (Azure AD). Heavy work runs in the background with a limit on how many invoices are generated at once; the UI shows progress. Database queries are cached to speed up repeated requests. REST API and interactive docs available for integration.',
        details: [
          'Microsoft single sign-on (Azure AD, OAuth2); session handled via cookies',
          'User selects hotels and period; app queues the job and generates Excel in the background with a concurrency limit to protect server resources',
          'Real-time status in the UI; download link when the file is ready; database query caching to improve performance',
          'REST API for authentication, hotel/agent lists, generating invoices, checking status and queue; Swagger docs at /docs',
          'FastAPI, SQL Server, openpyxl and Pandas for Excel; Tailwind and DaisyUI for the front end',
        ],
        tagsFull: ['FastAPI', 'Python', 'Azure AD', 'OAuth2', 'SQL Server', 'Excel', 'openpyxl', 'Pandas', 'Tailwind', 'DaisyUI', 'REST API', 'Async'],
      },
      el: {
        title: 'Γεννήτρια Προτιμολογίων',
        summary: 'Δημιουργεί Excel προτιμολόγια από δεδομένα κρατήσεων ξενοδοχείων. Οι χρήστες επιλέγουν ξενοδοχεία και περίοδο· η εφαρμογή φτιάχνει τα έγγραφα στο παρασκήνιο και ειδοποιεί όταν είναι έτοιμα. Single sign-on και περιορισμός φόρτου.',
        tags: ['FastAPI', 'Azure AD', 'SQL Server', 'Excel', 'Tailwind', 'Async'],
        description: 'Εσωτερικό εργαλείο για ξενοδοχειακό όμιλο: το προσωπικό ζητά προτιμολόγια (προ-τιμολόγηση) για επερχόμενες κρατήσεις. Η εφαρμογή τραβά δεδομένα κρατήσεων από το SQL Server του ομίλου, παράγει μορφοποιημένα Excel προτιμολόγια και επιτρέπει λήψη όταν είναι έτοιμα. Η σύνδεση γίνεται με Microsoft (Azure AD). Οι βαριές εργασίες τρέχουν στο παρασκήνιο με όριο ταυτόχρονων δημιουργιών· το UI δείχνει την πρόοδο. Οι ερωτήσεις στη βάση cache-άρονται. REST API και διαδραστική τεκμηρίωση για ενσωμάτωση.',
        details: [
          'Microsoft single sign-on (Azure AD, OAuth2)· session μέσω cookies',
          'Ο χρήστης επιλέγει ξενοδοχεία και περίοδο· η εφαρμογή βάζει την εργασία σε ουρά και παράγει Excel στο παρασκήνιο με όριο ταυτόχρονων για προστασία του server',
          'Κατάσταση σε πραγματικό χρόνο στο UI· σύνδεσμος λήψης όταν το αρχείο είναι έτοιμο· caching ερωτήσεων ΒΔ για ταχύτητα',
          'REST API για auth, λίστες ξενοδοχείων/πρακτόρων, δημιουργία προτιμολογίων, κατάσταση και ουρά· Swagger στο /docs',
          'FastAPI, SQL Server, openpyxl και Pandas για Excel· Tailwind και DaisyUI για το front end',
        ],
        tagsFull: ['FastAPI', 'Python', 'Azure AD', 'OAuth2', 'SQL Server', 'Excel', 'openpyxl', 'Pandas', 'Tailwind', 'DaisyUI', 'REST API', 'Async'],
      },
    },
    trustyou: {
      type: 'saas',
      repo: 'https://github.com/MitsisDevelopment/TrustYouAPI',
      repoPublic: false,
      en: {
        title: 'Guest Review Analytics',
        summary: 'Internal dashboard and reporting tool that connects to a third-party guest review API (TrustYou). View scores, sentiment and review text by hotel and period; export quality and department reports to Excel.',
        tags: ['Flask', 'REST API', 'Pandas', 'Excel', 'Jinja2'],
        description: 'Web app that fetches guest review and satisfaction data from the TrustYou analytics API for the group’s hotels. Users can filter by hotel, date range and category to explore overall scores, impact metrics and review text. The app also provides pre-built quality reports (scores, response rates, share of negative reviews) and department-level reports that highlight negative feedback by category for operational follow-up. Excel export is available for use in meetings and reporting.',
        details: [
          'Web interface to query review metrics: overall scores, performance and impact metrics, and full review text; filters for hotel, dates, sentiment and category',
          'Quality report: aggregate scores, response rate, review count by star rating, and share of negative reviews across hotels',
          'Department reports: negative reviews grouped by category (e.g. room, food, service) with summarized takeaways, exported to Excel for operations and management',
          'Hotel list and API mapping stored in config; Flask backend, Pandas for data handling, openpyxl for Excel; Jupyter notebook used for ad-hoc analysis',
        ],
        tagsFull: ['Flask', 'Python', 'REST API', 'Pandas', 'openpyxl', 'Jinja2', 'Jupyter', 'Excel', 'Data Analytics'],
      },
      el: {
        title: 'Αναλυτικά Στοιχεία Κριτικών Επισκεπτών',
        summary: 'Εσωτερικό dashboard και εργαλείο αναφορών που συνδέεται με τρίτο API κριτικών επισκεπτών (TrustYou). Προβολή scores, συναισθήματος και κειμένου κριτικών ανά ξενοδοχείο και περίοδο· εξαγωγή αναφορών ποιότητας και τμημάτων σε Excel.',
        tags: ['Flask', 'REST API', 'Pandas', 'Excel', 'Jinja2'],
        description: 'Εφαρμογή web που φέρνει δεδομένα κριτικών και ικανοποίησης επισκεπτών από το TrustYou analytics API για τα ξενοδοχεία του ομίλου. Οι χρήστες φιλτράρουν ανά ξενοδοχείο, περίοδο και κατηγορία για να δουν συνολικά scores, μετρήσεις επίδρασης και κείμενο κριτικών. Υπάρχουν έτοιμες αναφορές ποιότητας (scores, ποσοστό απάντησης, μερίδιο αρνητικών κριτικών) και αναφορές ανά τμήμα που επισημαίνουν αρνητικά σχόλια ανά κατηγορία για λειτουργική παρακολούθηση. Εξαγωγή Excel για συναντήσεις και αναφορές.',
        details: [
          'Διεπαφή web για ερώτηση μετρήσεων: συνολικά scores, μετρήσεις απόδοσης και επίδρασης, πλήρες κείμενο κριτικών· φίλτρα ξενοδοχείου, ημερομηνιών, συναισθήματος και κατηγορίας',
          'Αναφορά ποιότητας: συγκεντρωτικά scores, ποσοστό απάντησης, αριθμός κριτικών ανά αστέρι, μερίδιο αρνητικών κριτικών ανά ξενοδοχείο',
          'Αναφορές τμημάτων: αρνητικές κριτικές ομαδοποιημένες ανά κατηγορία (π.χ. δωμάτιο, φαγητό, υπηρεσία) με συνοπτικά takeaways· εξαγωγή Excel για λειτουργία και διοίκηση',
          'Λίστα ξενοδοχείων και αντιστοίχιση API σε config· backend Flask, Pandas για δεδομένα, openpyxl για Excel· Jupyter για ad-hoc ανάλυση',
        ],
        tagsFull: ['Flask', 'Python', 'REST API', 'Pandas', 'openpyxl', 'Jinja2', 'Jupyter', 'Excel', 'Data Analytics'],
      },
    },
    hconvrp: {
      type: 'research',
      repo: 'https://github.com/Lefyd24/HConVRP',
      repoPublic: true,
      en: {
        title: 'HConVRP Solver',
        summary: 'Thesis project: Heterogeneous Consistent Vehicle Routing Problem solver with Flask UI, WebSockets, Tabu Search & VND heuristics.',
        tags: ['Flask', 'WebSockets', 'NumPy', 'scikit-learn'],
        description: 'A Heterogeneous Consistent Vehicle Routing Problem (HConVRP) solver and interactive web application developed as part of my thesis.',
        details: [
          'Flask-based web interface with live step-by-step logs via WebSockets',
          'Python solver leveraging Pandas, NumPy, scikit-learn, and YAML datasets',
          'Constraints on vehicle capacities, time windows, frequent customer consistency, depot return',
          'Constructive heuristics, Hierarchical Tabu Search (HTS), and Variable Neighbourhood Descent (VND)',
          'Visualization of routes, solver progress, and performance metrics',
          'Fleet and customer management with heterogeneous vehicles and multi-period planning',
        ],
        tagsFull: ['Flask', 'WebSockets', 'Pandas', 'NumPy', 'scikit-learn', 'HTML/CSS', 'JavaScript'],
      },
      el: {
        title: 'HConVRP Solver',
        summary: 'Διπλωματική: Επιλύτης Heterogeneous Consistent Vehicle Routing Problem με Flask UI, WebSockets, Tabu Search & VND heuristics.',
        tags: ['Flask', 'WebSockets', 'NumPy', 'scikit-learn'],
        description: 'Επιλύτης Heterogeneous Consistent Vehicle Routing Problem (HConVRP) και διαδραστική εφαρμογή web που αναπτύχθηκε ως μέρος της διπλωματικής μου.',
        details: [
          'Διεπαφή web με Flask και ζωντανά logs βήμα-βήμα μέσω WebSockets',
          'Επιλύτης Python με Pandas, NumPy, scikit-learn και datasets YAML',
          'Περιορισμοί σε χωρητικότητες οχημάτων, χρονικά παράθυρα, συνέπεια πελατών, επιστροφή στην αποθήκη',
          'Κατασκευαστικά heuristics, Hierarchical Tabu Search (HTS) και Variable Neighbourhood Descent (VND)',
          'Οπτικοποίηση διαδρομών, προόδου επιλύτη και μετρικών απόδοσης',
          'Διαχείριση στόλου και πελατών με ετερογενή οχήματα και πολυπεριόδο σχεδιασμό',
        ],
        tagsFull: ['Flask', 'WebSockets', 'Pandas', 'NumPy', 'scikit-learn', 'HTML/CSS', 'JavaScript'],
      },
    },
    karaviotis: {
      type: 'websites',
      url: 'https://karaviotislaw.gr/',
      repo: 'https://github.com/Lefyd24/Karaviotis',
      repoPublic: true,
      preview: 'https://s0.wp.com/mshots/v1/https://karaviotislaw.gr?w=600',
      en: {
        title: 'George Karaviotis Law Firm',
        summary: 'Bilingual (EN/EL) law firm website for EU-qualified lawyer Georgios Karaviotis, Heraklion Crete. Corporate, M&A, real estate, immigration, environmental & labour law. Contact form via Cloudflare Functions.',
        tags: ['HTML/CSS', 'JavaScript', 'Cloudflare Pages', 'Bilingual', 'Responsive'],
        description: 'Professional law firm website for George Karaviotis Law Office (Γραφείο Δικηγόρου Γεωργίου Καραβιώτη) in Heraklion, Crete. EU-qualified lawyer offering services in English, Greek, and French. The site presents practice areas, international client services (Golden Visa, residence permits, property in Crete), and contact information with a working contact form backed by Cloudflare Pages Functions and Resend.',
        details: [
          'Bilingual content (English / Greek) with language switcher; key pages: karaviotislaw.gr and karaviotislaw.gr/en',
          'Practice areas: Corporate Law, M&A, Contract Law, Real Estate, Immigration (Golden Visa, residence permits), Arbitration & Disputes, Environmental Law & Sustainability, Labour Law, Debts & Social Security, Legal Research & Policy Analysis',
          'Services for international clients: Golden Visa Greece, property purchase in Crete, residence permits, English-speaking legal support',
          'Contact form submitted via POST /api/contact (Cloudflare Pages Functions, TypeScript) with Resend for email delivery',
          'Content built from Markdown (gray-matter, marked); static site with responsive design, accessibility (A+ / A− / Contrast), deployed on Cloudflare Pages',
        ],
        tagsFull: ['HTML5', 'CSS3', 'JavaScript', 'Cloudflare Pages', 'Cloudflare Functions', 'TypeScript', 'Resend', 'Markdown', 'Mobile', 'Responsive', 'A11y'],
      },
      el: {
        title: 'Γραφείο Δικηγόρου Γεωργίου Καραβιώτη',
        summary: 'Δίγλωσσος (EN/EL) ιστότοπος δικηγορικού γραφείου για ΕΕ-qualified δικηγόρο Γεώργιο Καραβιώτη, Ηράκλειο Κρήτης. Εταιρικό δίκαιο, ακίνητα, μεταναστευτικό, περιβαλλοντικό & εργατικό δίκαιο.',
        tags: ['HTML/CSS', 'JavaScript', 'Cloudflare Pages', 'Δίγλωσσο', 'Responsive'],
        description: 'Επαγγελματικός ιστότοπος για το Γραφείο Δικηγόρου Γεωργίου Καραβιώτη στο Ηράκλειο Κρήτης. Υπηρεσίες στα Αγγλικά, Ελληνικά και Γαλλικά. Παρουσίαση τομέων δικαιικής ενασχόλησης, υπηρεσιών για διεθνείς πελάτες (Golden Visa, άδειες διαμονής, ακίνητα στην Κρήτη) και φόρμας επικοινωνίας με backend Cloudflare Pages Functions και Resend.',
        details: [
          'Δίγλωσσο περιεχόμενο (Αγγλικά / Ελληνικά) με εναλλαγή γλώσσας· σελίδες: karaviotislaw.gr και karaviotislaw.gr/en',
          'Τομείς: Εταιρικό Δίκαιο, Συγχωνεύσεις & Εξαγορές, Δίκαιο Συμβάσεων, Ακίνητη Περιουσία, Μεταναστευτικό Δίκαιο (Golden Visa, άδειες διαμονής), Διαιτησία, Περιβαλλοντικό Δίκαιο & Βιωσιμότητα, Εργατικό Δίκαιο, Χρεώες & Κοινωνική Ασφάλιση, Νομική Έρευνα',
          'Υπηρεσίες για διεθνείς πελάτες: Golden Visa Ελλάδα, αγορά ακινήτου στην Κρήτη, άδειες διαμονής, νομική υποστήριξη στα Αγγλικά',
          'Φόρμα επικοινωνίας μέσω POST /api/contact (Cloudflare Pages Functions, TypeScript) και Resend για αποστολή email',
          'Περιεχόμενο από Markdown (gray-matter, marked)· στατικός ιστότοπος responsive με προσβασιμότητα (A+ / A− / Contrast), ανάπτυξη σε Cloudflare Pages',
        ],
        tagsFull: ['HTML5', 'CSS3', 'JavaScript', 'Cloudflare Pages', 'Cloudflare Functions', 'TypeScript', 'Resend', 'Markdown', 'Mobile', 'Responsive', 'A11y'],
      },
    },
  },
};
