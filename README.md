# Lefteris Fthenos - Developer Portfolio

A modern, petrol-themed portfolio with 3D effects, glassmorphism, and a rich UI. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Language switcher** - Toggle between English (EN) and Greek (ΕΛ)
- **Brightness control** - Adjust page brightness (dim, normal, bright)
- **Subtle animated background** - Soft moving clouds/shadows (CSS, non-distracting)
- **Glassmorphism** - Frosted glass cards, panels, and timeline
- **Petrol + amber palette** - Dark teal primary with warm amber accents
- **Bento grid** - Modern project layout with varied card sizes
- **Project modals** - Click any project for detailed view (bilingual)
- **GSAP ScrollTrigger** - Smooth scroll animations
- **Dual CV downloads** - Developer and Business Analyst versions
- **Responsive design** - Mobile-first, works on all devices

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- GSAP 3 + ScrollTrigger
- Google Fonts (Plus Jakarta Sans, Outfit)

## Running Locally

1. Open `index.html` in a browser, or
2. Use a local server (e.g. `npx serve .` or `python -m http.server`)

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deployment

Static site - deploy to GitHub Pages, Netlify, Vercel, or any static host. Ensure CV PDFs are included.

## Structure

```
├── index.html
├── css/styles.css
├── js/
│   ├── main.js
│   ├── i18n.js
│   └── data/
│       └── portfolio.js    ← Edit this to update skills, projects, experience
├── English CV - 2025 - DEV.pdf
├── English CV - 2025 - BA.pdf
└── README.md
```

## Updating Content

Edit `js/data/portfolio.js` to update your portfolio:

- **Skills** – Add/remove/edit items in the `skills` array. Each has `id`, `i18nKey` (matches `js/i18n.js`), and `tags`.
- **Experience** – Add/remove/edit jobs. Greek translations live in `js/i18n.js` under `experience.job1`, `job2`, etc.
- **Projects** – Add a new key with `en` and `el` objects. Each needs: `title`, `summary`, `tags`, `description`, `details`, `tagsFull`.
