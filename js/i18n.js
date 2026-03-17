/**
 * i18n - Language and brightness controls
 */
const translations = {
  en: {
    language: 'Language',
    theme: 'Theme',
    themePetrolAmber: 'Amber',
    themePetrolTeal: 'Teal',
    brightness: 'Brightness',
    hero: {
      title: 'Software Developer & Business Analyst',
      subtitle: 'MSc in Business Analytics | Python • Django • Full-Stack • Data Analytics',
      viewWork: 'View My Work',
      getInTouch: 'Get In Touch',
      cvDev: 'CV (Dev)',
      cvBa: 'CV (BA)',
      scrollHint: 'Scroll to explore',
    },
    about: {
      title: 'About Me',
      lead: "I hold a Bachelor's in Accounting & Finance and a Master's in Business Analytics from the Athens University of Economics & Business, where I graduated <strong>second in class</strong> with a GPA of 9.01/10.",
      p1: "What drives me is the intersection of <strong>data</strong>, <strong>technology</strong>, and <strong>business performance</strong>. I'm genuinely curious about how things work and restless when it comes to learning new technologies.",
      p2: "That curiosity pushed me beyond accounting into business intelligence and web development. I dive into new challenges—whether building data solutions in Python and SQL, creating dashboards in Power BI, or developing full-stack applications with Django, Flask, and JavaScript.",
      expertise1: { title: 'Backend Development', desc: 'Building scalable web applications with Python, Django, Flask, and FastAPI' },
      expertise2: { title: 'Business Analytics', desc: 'Transforming data into actionable insights that drive business decisions' },
      languages: '<strong>Languages:</strong> Greek (Native) | English (Full Professional, CEF C2)',
    },
    skills: {
      title: 'Technical Skills',
      backend: 'Backend',
      frontend: 'Frontend',
      databases: 'Databases',
      analytics: 'Analytics & BI',
      devops: 'DevOps & Tools',
    },
    experience: {
      title: 'Experience',
      job1: { date: 'Jan 2025 – Present', title: 'Business Analytics Assistant Manager', company: 'Mitsis Group', li: ['Lead development of Python-based enterprise applications for financial process automation', 'Design and deploy Django/Flask web applications for cross-departmental workflow optimization', 'Architect SQL databases and data pipelines supporting business intelligence initiatives'] },
      job2: { date: 'Mar 2024 – Present', title: 'Project Manager (Parallel Role)', company: 'Mitsis Group', li: ['Lead digital transformation project for group\'s construction company', 'Conduct in-depth process analysis and workflow optimization'] },
      job3: { date: 'Aug 2023 – Jan 2025', title: 'Senior Business Analyst', company: 'Mitsis Group', li: ['Built custom enterprise web apps using Python, Django, Flask, JavaScript for finance automation', 'Developed APIs and backend services reducing manual workload by 40%', 'Co-led Azure Data Warehouse implementation with SQL optimization'] },
      job4: { date: 'Oct 2022 – Aug 2023', title: 'Business Analyst', company: 'Mitsis Group', li: ['Developed Power BI dashboards & templates, reducing report generation time by 80%', 'Automated payroll and accounting systems using Python and Power Automate'] },
      job5: { date: 'Mar 2019 – Mar 2021', title: 'Project Coordinator', company: 'DayTrip4U / TripGiant Ltd.', li: ['Negotiated with global suppliers achieving 15% cost reduction', 'Conducted competitive analysis using Price2Spy & Google Analytics', 'Led market expansion strategies and standardized operational procedures'] },
    },
    projects: {
      title: 'Featured Projects',
      saasTitle: 'SaaS & Web Apps',
      saasDesc: 'Internal tools and applications where users perform tasks',
      websitesTitle: 'Client Websites',
      websitesDesc: 'Professional websites built for clients',
      researchTitle: 'Research & Academic',
      researchDesc: 'Thesis and research projects',
      researchBadge: 'Research',
      saasBadge: 'Web App',
      clickHint: 'Click for details',
      visitHint: 'Visit site',
      websiteBadge: 'Website',
      cashflow: { title: 'Cashflow Management System', desc: 'Flask + Bootstrap web app for financial and operational management. Role-based workflows, Power BI integrations, Pandas/Numpy data processing.' },
      attendance: { title: 'Daily Employee Attendance', desc: 'Django attendance system with Azure AD auth, role-based workflows, Azure Data Warehouse integration. Deployed on NGINX/Gunicorn.' },
      proforma: { title: 'Proforma Invoice Application', desc: 'Flask app automating proforma invoice generation from SQL Server reservation data. ETL, caching, Apache/WSGI deployment.' },
      trustyou: { title: 'TrustYou Analytics Dashboard', desc: 'Flask app integrating TrustYou API for real-time hotel review insights. Interactive dashboards, sentiment analysis, Excel reporting.' },
      hconvrp: { title: 'HConVRP Solver', desc: 'Thesis project: Heterogeneous Consistent Vehicle Routing Problem solver with Flask UI, WebSockets, Tabu Search & VND heuristics.' },
    },
    contact: {
      title: 'Get In Touch',
      lead: "I'm always open to new opportunities and collaborations.",
      emailLabel: 'Email',
      connectLabel: 'Connect',
      cvLabel: 'Resume',
      copy: 'Copy',
      copied: 'Copied!',
      cvDev: 'Developer',
      cvBa: 'Business Analyst',
    },
  },
  el: {
    language: 'Γλώσσα',
    theme: 'Θέμα',
    themePetrolAmber: 'Κεχριμπάρι',
    themePetrolTeal: 'Τιρκουάζ',
    brightness: 'Φωτεινότητα',
    hero: {
      title: 'Προγραμματιστής Λογισμικού & Επιχειρησιακός Αναλυτής',
      subtitle: 'MSc σε Επιχειρησιακή Αναλυτική | Python • Django • Full-Stack • Ανάλυση Δεδομένων',
      viewWork: 'Δείτε το Έργο μου',
      getInTouch: 'Επικοινωνήστε',
      cvDev: 'Λήψη Βιογραφικού (Dev)',
      cvBa: 'Λήψη Βιογραφικού (BA)',
      scrollHint: 'Κάντε κύλιση για να εξερευνήσετε',
    },
    about: {
      title: 'Σχετικά με εμένα',
      lead: "Κατέχω πτυχίο Λογιστικής & Χρηματοοικονομικών και Μεταπτυχιακό στην Επιχειρησιακή Αναλυτική από το Οικονομικό Πανεπιστήμιο Αθηνών, από όπου αποφοίτησα <strong>δεύτερος στην τάξη</strong> με μέσο όρο 9.01/10.",
      p1: "Αυτό που με οδηγεί είναι η διασταύρωση των <strong>δεδομένων</strong>, της <strong>τεχνολογίας</strong> και της <strong>επιχειρησιακής απόδοσης</strong>. Είμαι γνήσια περίεργος για το πώς λειτουργούν τα πράγματα και ανήσυχος όσον αφορά την εκμάθηση νέων τεχνολογιών.",
      p2: "Αυτή η περιέργεια με ώθησε πέρα από τη λογιστική στην επιχειρησιακή ευφυΐα και την ανάπτυξη web. Βουτώ σε νέες προκλήσεις—είτε δημιουργώντας λύσεις δεδομένων σε Python και SQL, είτε δημιουργώντας πίνακες ελέγχου στο Power BI, είτε αναπτύσσοντας εφαρμογές full-stack με Django, Flask και JavaScript.",
      expertise1: { title: 'Ανάπτυξη Backend', desc: 'Δημιουργία κλιμακωτών web εφαρμογών με Python, Django, Flask και FastAPI' },
      expertise2: { title: 'Επιχειρησιακή Αναλυτική', desc: 'Μετατροπή δεδομένων σε εφαρμόσιμες πληροφορίες που καθοδηγούν επιχειρησιακές αποφάσεις' },
      languages: '<strong>Γλώσσες:</strong> Ελληνικά (Μητρική) | Αγγλικά (Πλήρης επαγγελματική, CEF C2)',
    },
    skills: {
      title: 'Τεχνικές Ικανότητες',
      backend: 'Backend',
      frontend: 'Frontend',
      databases: 'Βάσεις Δεδομένων',
      analytics: 'Αναλυτική & BI',
      devops: 'DevOps & Εργαλεία',
    },
    experience: {
      title: 'Επαγγελματική Εμπειρία',
      job1: { date: 'Ιαν 2025 – Σήμερα', title: 'Βοηθός Διευθυντής Επιχειρησιακής Αναλυτικής', company: 'Mitsis Group', li: ['Ηγεσία ανάπτυξης εφαρμογών Python για επιχειρησιακή αυτοματοποίηση χρηματοοικονομικών διαδικασιών', 'Σχεδιασμός και ανάπτυξη εφαρμογών Django/Flask για βελτιστοποίηση διατμηματικών ροών εργασίας', 'Αρχιτεκτονική βάσεων δεδομένων SQL και αγωγών δεδομένων για επιχειρησιακή ευφυΐα'] },
      job2: { date: 'Μαρ 2024 – Σήμερα', title: 'Διευθυντής Έργου (Παράλληλος Ρόλος)', company: 'Mitsis Group', li: ['Ηγεσία έργου ψηφιακού μετασχηματισμού για την εταιρεία κατασκευών της ομάδας', 'Διεξαγωγή εις βάθος ανάλυσης διαδικασιών και βελτιστοποίησης ροών εργασίας'] },
      job3: { date: 'Αυγ 2023 – Ιαν 2025', title: 'Ανώτερος Επιχειρησιακός Αναλυτής', company: 'Mitsis Group', li: ['Ανάπτυξη προσαρμοσμένων επιχειρησιακών εφαρμογών με Python, Django, Flask, JavaScript για χρηματοοικονομική αυτοματοποίηση', 'Ανάπτυξη APIs και υπηρεσιών backend που μείωσαν το χειροκίνητο φόρτο εργασίας κατά 40%', 'Συν-ηγεσία υλοποίησης Azure Data Warehouse με βελτιστοποίηση SQL'] },
      job4: { date: 'Οκτ 2022 – Αυγ 2023', title: 'Επιχειρησιακός Αναλυτής', company: 'Mitsis Group', li: ['Ανάπτυξη πινάκων ελέγχου Power BI & προτύπων, μείωση χρόνου δημιουργίας αναφορών κατά 80%', 'Αυτοματοποίηση συστημάτων μισθοδοσίας και λογιστικής με Python και Power Automate'] },
      job5: { date: 'Μαρ 2019 – Μαρ 2021', title: 'Συντονιστής Έργων', company: 'DayTrip4U / TripGiant Ltd.', li: ['Διαπραγμάτευση με παγκόσμιους προμηθευτές με 15% μείωση κόστους', 'Διεξαγωγή ανάλυσης ανταγωνισμού με Price2Spy & Google Analytics', 'Ηγεσία στρατηγικών επέκτασης αγοράς και τυποποίηση λειτουργικών διαδικασιών'] },
    },
    projects: {
      title: 'Επιλεγμένα Έργα',
      saasTitle: 'SaaS & Εφαρμογές Web',
      saasDesc: 'Εσωτερικά εργαλεία και εφαρμογές όπου οι χρήστες εκτελούν εργασίες',
      websitesTitle: 'Ιστοσελίδες Πελατών',
      websitesDesc: 'Επαγγελματικές ιστοσελίδες για πελάτες',
      researchTitle: 'Έρευνα & Ακαδημαϊκά',
      researchDesc: 'Έργα διπλωματικής και έρευνας',
      researchBadge: 'Έρευνα',
      saasBadge: 'Web App',
      clickHint: 'Κλικ για λεπτομέρειες',
      visitHint: 'Επίσκεψη ιστοσελίδας',
      websiteBadge: 'Ιστοσελίδα',
      cashflow: { title: 'Σύστημα Διαχείρισης Ταμειακών Ροών', desc: 'Εφαρμογή Flask + Bootstrap για χρηματοοικονομική και λειτουργική διαχείριση. Ροές εργασίας με βάση τους ρόλους, ενσωματώσεις Power BI, επεξεργασία δεδομένων Pandas/Numpy.' },
      attendance: { title: 'Σύστημα Ημερήσιας Προσέλευσης', desc: 'Σύστημα προσέλευσης Django με Azure AD auth, ροές εργασίας με βάση τους ρόλους, ενσωμάτωση Azure Data Warehouse. Ανάπτυξη σε NGINX/Gunicorn.' },
      proforma: { title: 'Εφαρμογή Προτιμολογίων', desc: 'Εφαρμογή Flask για αυτοματοποίηση δημιουργίας προτιμολογίων από δεδομένα κρατήσεων SQL Server. ETL, caching, ανάπτυξη Apache/WSGI.' },
      trustyou: { title: 'TrustYou Analytics Dashboard', desc: 'Εφαρμογή Flask που ενσωματώνει το TrustYou API για πληροφορίες κριτικών πελατών σε πραγματικό χρόνο. Διαδραστικοί πίνακες ελέγχου, ανάλυση συναισθήματος, αναφορές Excel.' },
      hconvrp: { title: 'HConVRP Solver', desc: 'Έργο διπλωματικής: Επιλύτης Heterogeneous Consistent Vehicle Routing Problem με Flask UI, WebSockets, Tabu Search & VND heuristics.' },
    },
    contact: {
      title: 'Επικοινωνία',
      lead: 'Είμαι πάντα ανοιχτός σε νέες ευκαιρίες και συνεργασίες.',
      emailLabel: 'Email',
      connectLabel: 'Σύνδεση',
      cvLabel: 'Βιογραφικό',
      copy: 'Αντιγραφή',
      copied: 'Αντιγράφηκε!',
      cvDev: 'Προγραμματιστής',
      cvBa: 'Επιχειρησιακός Αναλυτής',
    },
  },
};

function getNested(obj, path) {
  return path.split('.').reduce((o, k) => (o?.[k]), obj);
}

function applyTranslations(lang) {
  const t = translations[lang] || translations.en;
  document.documentElement.lang = lang === 'el' ? 'el' : 'en';
  document.title = lang === 'el'
    ? 'Λεφτέρης Φθενός | Προγραμματιστής & Επιχειρησιακός Αναλυτής'
    : 'Lefteris Fthenos | Software Developer & Business Analyst';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = getNested(t, key);
    if (val !== undefined) {
      if (typeof val === 'string' && val.includes('<')) {
        el.innerHTML = val;
      } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        // For nested objects like experience.job1
        if (val.li) {
          el.querySelectorAll('li').forEach((li, i) => {
            li.textContent = val.li[i] || '';
          });
        }
      } else {
        el.textContent = val;
      }
    }
  });

  // Timeline items - special handling (experience rendered from portfolio, translated here)
  const timelineItems = document.querySelectorAll('.timeline-item');
  const jobKeys = ['job1', 'job2', 'job3', 'job4', 'job5'];
  jobKeys.forEach((jobKey, idx) => {
    const item = timelineItems[idx];
    if (!item) return;
    const job = t.experience?.[jobKey];
    if (!job) return;
    const dateEl = item.querySelector('.timeline-date');
    const titleEl = item.querySelector('.timeline-content h3');
    const companyEl = item.querySelector('.timeline-content h4');
    const listEl = item.querySelector('.timeline-content ul');
    if (dateEl) dateEl.textContent = job.date;
    if (titleEl) titleEl.textContent = job.title;
    if (companyEl) companyEl.textContent = job.company;
    if (listEl && job.li) {
      listEl.innerHTML = job.li.map((li) => `<li>${li}</li>`).join('');
    }
  });

  // Project cards: content comes from js/data/portfolio.js (bilingual), not i18n

  // Control labels
  document.querySelectorAll('.control-label[data-i18n="language"]').forEach((el) => {
    el.textContent = t.language;
  });
  document.querySelectorAll('.control-label[data-i18n="brightness"]').forEach((el) => {
    el.textContent = t.brightness;
  });
}
