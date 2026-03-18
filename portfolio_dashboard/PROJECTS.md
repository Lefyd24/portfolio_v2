# Projects

This document summarizes the projects currently featured in the portfolio, using recruiter-friendly language (no internal-only acronyms).  

## SaaS & Web Apps (internal)

> These are private, internal systems built for a multi-property hotel group. The GitHub repositories are not public.

### Mitsis Budget

- **What it is**: A group-wide budgeting and forecasting platform used across **24 hotel properties**.
- **Problem it solves**: Replaces spreadsheet-based budgeting with a single system that supports approvals, auditability, and consistent reporting.
- **What I built**
  - Budget planning for **procurement/costs**, **room revenue & occupancy**, **payroll/headcount**, and **other revenue**.
  - **Role-based workflows** (finance analysts, hotel managers, finance leadership) with **Microsoft single sign-on**.
  - **Embedded reporting** (Power BI) and automated data sync from the **central data warehouse (Azure SQL)**.
  - Background processing for heavy operations (exports/approvals) with progress surfaced in the UI.
- **Tech**: Django, Python, SQL Server, Redis, Celery, Power BI, ag-Grid, Nginx/Gunicorn.

### Cash Flow Management

- **What it is**: A cash-flow planning and approval system for payments and revenues across the group.
- **Problem it solves**: Centralizes cash planning, standardizes submission, and enables a controlled two-stage approval process.
- **What I built**
  - Payment plans generated from **ERP Excel exports** (data normalization + transformation pipeline).
  - Revenue planning (manual entry) and **inter-company transfers** support.
  - **Two-stage approvals** (accounting leadership → senior management), with notifications and reporting by period.
  - Embedded Power BI views (e.g., bank balances) and an archive area for finance references.
- **Tech**: Flask, Python, SQL Server, SQLAlchemy, Pandas/NumPy, Bootstrap, AG Grid, Power BI, Gunicorn.

### Attendance & Shift Planning

- **What it is**: One app that covers **daily attendance** and **weekly shift planning** across multiple hotels.
- **Problem it solves**: Creates a single workflow for capturing attendance, getting approvals, and preparing payroll-ready exports—plus scheduling/shift planning.
- **What I built**
  - Daily attendance submission + approvals in stages (validation → manager → accountant → payroll submission).
  - Weekly shift planning: schedules, shift assignments, departments.
  - Multi-hotel access model: users see only assigned properties; easy switching where permitted.
  - Microsoft single sign-on and Excel exports for payroll; integrations where required with Greek employment systems.
  - Modern responsive UI with dark/light mode and Greek localization.
- **Tech**: Django, Python, SQL Server, Tailwind CSS, daisyUI, Tabulator, Azure AD, Pandas, Excel exports.

### Proforma Invoice Generator

- **What it is**: Generates **Excel proforma (pre-billing) invoices** from hotel reservation data.
- **Problem it solves**: Automates a time-consuming invoice preparation workflow and standardizes the generated documents.
- **What I built**
  - Users select hotels and a time period; the system generates formatted Excel invoices and provides a download when ready.
  - Microsoft single sign-on; background job execution with concurrency limits to protect resources.
  - Performance improvements via caching for repeated queries.
  - REST API + interactive docs for integration/operations.
- **Tech**: FastAPI, Python, SQL Server, openpyxl, Pandas, Tailwind, DaisyUI, OAuth2 (Azure AD).

### Guest Review Analytics (TrustYou)

- **What it is**: Review analytics dashboard + reporting tool connected to a **third-party guest review platform (TrustYou)**.
- **Problem it solves**: Makes guest feedback actionable by aggregating scores and surfacing negative review themes by hotel and department.
- **What I built**
  - Filterable views for scores, sentiment, impact-style metrics and review text.
  - “Quality” reporting across hotels (scores, response rate, negative share, review distributions).
  - Department-focused reports that group negative feedback by category (room/food/service etc.), exportable to Excel for operational follow-up.
- **Tech**: Flask, Python, REST APIs, Pandas, openpyxl, Jinja2, Excel reporting.

## Client Websites (public)

### George Karaviotis Law Firm

- **What it is**: Modern bilingual website (English/Greek) for a law office in Heraklion, Crete.
- **What I built**
  - Bilingual structure and content.
  - Responsive UI and accessibility controls.
  - Contact form backed by serverless functions + email delivery provider.
- **Live site**: `https://karaviotislaw.gr/`
- **Repo**: `https://github.com/Lefyd24/Karaviotis`
- **Tech**: HTML/CSS/JS, Cloudflare Pages, Cloudflare Functions, TypeScript, Markdown-based content build.

## Research & Academic (public)

### HConVRP Solver (Thesis)

- **What it is**: Thesis project implementing a solver for a complex vehicle routing problem with an interactive web UI.
- **What I built**
  - Python solver with heuristics (Tabu Search + variable neighbourhood methods).
  - Web interface with live progress updates and visualizations.
  - Dataset-driven experiments and performance tracking.
- **Repo**: `https://github.com/Lefyd24/HConVRP`
- **Tech**: Python, Flask, WebSockets, Pandas, NumPy, scikit-learn.

