import { initHeroThreeBackground } from './three-bg.js'
import { PORTFOLIO } from './data/portfolio.js'

const getPageLang = () => {
  if (typeof document === 'undefined') return 'en'
  const lang = document.documentElement.getAttribute('lang') || document.documentElement.lang || ''
  return lang.toLowerCase().startsWith('el') ? 'el' : 'en'
}

const I18N = {
  en: {
    projectType: { saas: 'SaaS / Internal', websites: 'Client website', research: 'Research' },
    publication: 'Publication',
    live: 'Live',
    repo: 'Repo',
    highlights: 'Highlights',
    tech: 'Tech',
    close: 'Close',
    items: (n) => `${n} items`,
    skillGroup: { backend: 'Backend', frontend: 'Frontend', databases: 'Databases', analytics: 'Analytics', devops: 'DevOps' },
  },
  el: {
    projectType: { saas: 'SaaS / Εσωτερικό', websites: 'Ιστοσελίδα πελάτη', research: 'Έρευνα' },
    publication: 'Δημοσίευση',
    live: 'Online',
    repo: 'Repo',
    highlights: 'Σημαντικά',
    tech: 'Τεχνολογίες',
    close: 'Κλείσιμο',
    items: (n) => `${n} στοιχεία`,
    skillGroup: { backend: 'Backend', frontend: 'Frontend', databases: 'Βάσεις δεδομένων', analytics: 'Αναλυτικά', devops: 'DevOps' },
  },
}

const t = (key, subkey) => {
  const lang = getPageLang()
  const map = I18N[lang] || I18N.en
  const val = subkey ? map[key]?.[subkey] : map[key]
  return typeof val === 'function' ? val : val != null ? String(val) : ''
}

const getProjectLocale = (project) => {
  const lang = getPageLang()
  if (lang === 'el') return project.el || project.en
  return project.en || project.el
}

const PROFILE = {
  links: {
    github: 'https://github.com/Lefyd24',
    linkedin: 'https://www.linkedin.com/in/eleftherios-fthenos',
    email: 'mailto:fthenosyd@gmail.com',
  },

}

const byType = (projects, type) => projects.filter((p) => p.type === type)

const safe = (s) => (typeof s === 'string' ? s : '')

const prefersDarkTheme = () => {
  if (typeof window === 'undefined') return false
  return Boolean(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches)
}

const setTheme = (theme) => {
  if (typeof document === 'undefined') return
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  try {
    window.localStorage?.setItem('theme', isDark ? 'dark' : 'light')
  } catch {
    // ignore
  }
}

const initTheme = () => {
  let saved = ''
  try {
    saved = safe(window.localStorage?.getItem('theme'))
  } catch {
    saved = ''
  }

  const theme = saved === 'dark' || saved === 'light' ? saved : prefersDarkTheme() ? 'dark' : 'light'
  setTheme(theme)

  const toggle = document.getElementById('theme-toggle')
  const speedDialTheme = document.getElementById('speed-dial-theme')

  const handleThemeToggle = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    setTheme(next)
  }

  if (toggle) toggle.addEventListener('click', handleThemeToggle)
  if (speedDialTheme) speedDialTheme.addEventListener('click', handleThemeToggle)
}

const getSkillIconId = (tag) => {
  const key = safe(tag).toLowerCase().replace(/\s+/g, ' ').trim()
  const map = {
    python: 'python',
    django: 'django',
    flask: 'flask',
    fastapi: 'fastapi',
    celery: 'celery',
    javascript: 'javascript',
    html5: 'html',
    'html/css': 'html',
    css3: 'css',
    bootstrap: 'bootstrap',
    mysql: 'mysql',
    redis: 'redis',
    mongodb: 'mongodb',
    sql: 'postgres',
    'sql server': 'postgres',
    sparksql: 'apache',
    azure: 'azure',
    docker: 'docker',
    git: 'git',
    'power bi': 'powerbi',
    streamlit: 'streamlit',
    jupyter: 'jupyter',
    numpy: 'numpy',
  }

  if (map[key]) return map[key]
  if (key.includes('rest')) return 'postman'
  if (key.includes('etl')) return 'apache'
  if (key.includes('yolov')) return 'python'
  if (key.includes('cloudflare')) return 'cloudflare'
  if (key.includes('typescript')) return 'ts'
  return 'vscode'
}

const skillIconUrl = (tag) => {
  const theme = document?.documentElement?.classList?.contains('dark') ? 'dark' : 'light'
  return `https://skillicons.dev/icons?i=${getSkillIconId(tag)}&theme=${theme}`
}

const SVG_NS = 'http://www.w3.org/2000/svg'

const elSvg = (tag, attrs = {}, children = []) => {
  const node = document.createElementNS(SVG_NS, tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.setAttribute('class', v)
    else if (k === 'style') node.setAttribute('style', v)
    else if (v !== undefined && v !== null) node.setAttribute(k, String(v))
  }
  for (const child of children) {
    if (child === null || child === undefined) continue
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
  }
  return node
}

const iconSvg = (id) => {
  const common = 'h-4 w-4 shrink-0'

  if (id === 'external') {
    return elSvg(
      'svg',
      { class: common, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true', style: 'color: inherit' },
      [
        elSvg('path', {
          d: 'M14 5h5v5m0-5L10 14',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
        elSvg('path', {
          d: 'M5 10v9a1 1 0 0 0 1 1h9',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ],
    )
  }

  if (id === 'github') {
    return elSvg(
      'svg',
      { class: common, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true', style: 'color: inherit' },
      [
        elSvg('path', {
          d: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.35-1.18-3.35-1.18a2.64 2.64 0 0 0-1.1-1.46c-.9-.62.07-.6.07-.6a2.09 2.09 0 0 1 1.52 1.03 2.12 2.12 0 0 0 2.9.83c.05-.53.27-1.02.62-1.42-2.21-.25-4.54-1.1-4.54-4.9 0-1.08.39-1.97 1.03-2.66-.1-.26-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02a9.47 9.47 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.41.1 2.67.64.69 1.03 1.58 1.03 2.66 0 3.8-2.34 4.65-4.57 4.9.36.31.68.92.68 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z',
          fill: 'currentColor',
        }),
      ],
    )
  }

  if (id === 'doc') {
    return elSvg(
      'svg',
      { class: common, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true', style: 'color: inherit' },
      [
        elSvg('path', {
          d: 'M7 3h7l3 3v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
        elSvg('path', {
          d: 'M14 3v4h4',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
        elSvg('path', {
          d: 'M9 13h6M9 17h6',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ],
    )
  }

  return iconSvg('external')
}

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag)

  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v
    else if (k === 'text') node.textContent = String(v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (v !== undefined && v !== null) node.setAttribute(k, String(v))
  }

  for (const child of children) {
    if (child === null || child === undefined) continue
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
  }

  return node
}

const getProjectTypeLabel = (type) => {
  const label = t('projectType', type)
  return label || safe(type)
}

const getProjectLinks = (project) => {
  const links = []
  if (project.url) links.push({ label: t('live'), href: project.url })
  if (project.repo && project.repoPublic) links.push({ label: t('repo'), href: project.repo })
  if (project.publicationUrl) links.push({ label: t('publication'), href: project.publicationUrl })
  return links
}

const projectLinkFrom = (project) => {
  //if (project.type === 'websites' && project.url) return { label: 'Live', href: project.url }
  if (project.repo && project.repoPublic) return { label: 'Repo', href: project.repo }
  if (project.type === 'research' && project.repo && project.repoPublic) return { label: 'Repo', href: project.repo }
  return null
}

const linkIconFor = (label) => {
  const key = safe(label).toLowerCase()
  if (key === 'repo') return 'github'
  if (key === 'publication') return 'doc'
  return 'external'
}

const getLiveLink = (project) => {
  if (!project?.url) return null
  return { label: t('live'), href: project.url }
}

const renderLiveButton = (link, title) => {
  const base =
    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500/25'
  const styles =
    'bg-navy-500/10 text-navy-600 ring-1 ring-navy-400/30 hover:bg-navy-500/20 hover:text-navy-700 dark:bg-navy-500/20 dark:text-navy-400 dark:ring-navy-400/25 dark:hover:bg-navy-500/30'

  return el(
    'a',
    {
      class: `${base} ${styles}`,
      href: link.href,
      target: '_blank',
      rel: 'noreferrer',
      onClick: (e) => e.stopPropagation(),
      onKeyDown: (e) => e.stopPropagation(),
      'aria-label': `${link.label} link for ${title}`,
    },
    [iconSvg('external'), el('span', { text: link.label })],
  )
}

const renderLinkButton = (link, title, variant = 'solid') => {
  const base =
    'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-navy-500/25'
  const styles =
    variant === 'ghost'
      ? 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-white hover:text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700'
      : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'

  return el(
    'a',
    {
      class: `${base} ${styles}`,
      href: link.href,
      target: '_blank',
      rel: 'noreferrer',
      onClick: (e) => e.stopPropagation(),
      onKeyDown: (e) => e.stopPropagation(),
      'aria-label': `${link.label} link for ${title}`,
    },
    [iconSvg(linkIconFor(link.label)), el('span', { text: link.label })],
  )
}

const openProjectModal = (project) => {
  const modal = document.getElementById('project-modal')
  if (!modal) return

  const p = getProjectLocale(project) || {}
  const title = safe(p.title)
  const summary = safe(p.summary)
  const description = safe(p.description)
  const details = Array.isArray(p.details) ? p.details : []
  const tags = Array.isArray(p.tagsFull) ? p.tagsFull : Array.isArray(p.tags) ? p.tags : []
  const links = getProjectLinks(project)

  const setText = (id, value) => {
    const node = document.getElementById(id)
    if (!node) return
    node.textContent = value
  }

  const setHtmlVisibility = (id, isVisible) => {
    const node = document.getElementById(id)
    if (!node) return
    node.classList.toggle('hidden', !isVisible)
  }

  setText('modal-eyebrow', getProjectTypeLabel(project.type))
  setText('modal-title', title || 'Project')
  setText('modal-summary', summary)

  const headerLinks = document.getElementById('modal-header-links')
  if (headerLinks) {
    headerLinks.innerHTML = ''
    const liveLink = getLiveLink(project)
    links.slice(0, 3).forEach((l) => {
      const btn = l.href === project?.url && liveLink
        ? renderLiveButton(liveLink, title)
        : renderLinkButton(l, title, 'ghost')
      headerLinks.appendChild(btn)
    })
  }

  const descNode = document.getElementById('modal-description')
  if (descNode) descNode.textContent = description
  setHtmlVisibility('modal-description', Boolean(description))

  const mediaRoot = document.getElementById('modal-media')
  if (mediaRoot) {
    mediaRoot.innerHTML = ''
    if (project.image) {
      const img = el('img', {
        src: project.image,
        alt: `${title} preview`,
        class: 'h-full w-full object-cover object-top',
        loading: 'lazy',
      })
      img.onerror = () => img.remove()
      mediaRoot.appendChild(el('div', { class: 'aspect-[16/9] bg-slate-50' }, [img]))
      mediaRoot.classList.remove('hidden')
    } else {
      mediaRoot.classList.add('hidden')
    }
  }

  setHtmlVisibility('modal-details', details.length > 0)
  const detailsList = document.getElementById('modal-details-list')
  if (detailsList) {
    detailsList.innerHTML = ''
    details.slice(0, 8).forEach((d) => {
      detailsList.appendChild(
        el('li', { class: 'flex items-start gap-2' }, [
          el('span', { class: 'mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500' }),
          el('span', { text: d }),
        ]),
      )
    })
  }

  setHtmlVisibility('modal-tags', tags.length > 0)
  const tagsList = document.getElementById('modal-tags-list')
  if (tagsList) {
    tagsList.innerHTML = ''
    tags.slice(0, 16).forEach((t) => {
      tagsList.appendChild(
        el('span', {
          class:
            'rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700',
          text: t,
        }),
      )
    })
  }

  if (typeof modal.showModal === 'function') modal.showModal()
}

const renderProjectCard = (project) => {
  const p = getProjectLocale(project) || {}
  const title = safe(p.title)
  const summary = safe(p.summary)
  const tags = Array.isArray(p.tags) ? p.tags.slice(0, 6) : []
  const link = projectLinkFrom(project)
  const links = getProjectLinks(project)
  const liveLink = getLiveLink(project)
  const publicationUrl = safe(project.publicationUrl)
  const publicationPreviewText = safe(project.publicationPreviewText)
  const otherLinks = links.filter((l) => l.href !== project.url)

  return el(
    'article',
    {
      class:
        'reveal group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-navy-500/25 dark:bg-slate-900 dark:ring-slate-700',
      role: 'button',
      tabIndex: 0,
      onClick: () => openProjectModal(project),
      onKeyDown: (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        openProjectModal(project)
      },
      'aria-label': `Open details for ${title || 'project'}`,
    },
    [
      project.image
        ? (() => {
            const img = el('img', {
              src: project.image,
              alt: `${title} preview`,
              class: 'h-full w-full object-cover object-top',
              loading: 'lazy',
            })
            img.onerror = () => img.remove()
            return el('div', { class: 'aspect-[2/1] max-h-42 overflow-hidden bg-slate-50 dark:bg-slate-800' }, [img])
          })()
        : null,
      el('div', { class: 'flex flex-1 flex-col p-5' }, [
        el('div', { class: 'flex items-center justify-between gap-3' }, [
          el('h4', { class: 'min-w-0 flex-1 text-base font-semibold tracking-tight text-slate-900 dark:text-white', text: title || 'Project' }),
          el('div', { class: 'flex shrink-0 items-center gap-2' }, [
            liveLink ? el('div', { class: 'pointer-events-auto' }, [renderLiveButton(liveLink, title)]) : null,
            link ? renderLinkButton(link, title, 'ghost') : null,
          ]),
        ]),
        publicationUrl
          ? el(
              'a',
              {
                class:
                  'mt-4 block rounded-2xl bg-slate-50 p-3 ring-1 ring-navy-400/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/25 dark:bg-slate-800 dark:ring-navy-400/30 dark:hover:bg-slate-700',
                href: publicationUrl,
                target: '_blank',
                rel: 'noreferrer',
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => e.stopPropagation(),
                'aria-label': `Open publication for ${title}`,
              },
              [
                el('div', { class: 'flex items-start justify-between gap-3' }, [
                  el('div', { class: 'flex items-center gap-2' }, [
                    el('div', { class: 'text-slate-700 dark:text-slate-100' }, [iconSvg('doc')]),
                    el('div', { class: 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400', text: t('publication') }),
                  ]),
                  el('div', { class: 'text-slate-500 dark:text-slate-400' }, [iconSvg('external')]),
                ]),
                el('div', {
                  class: 'mt-1 text-sm font-semibold text-slate-900 dark:text-white',
                  text: 'Optimization techniques for HConVRP',
                }),
                el('div', { class: 'mt-0.5 text-xs text-slate-600 dark:text-slate-300', text: 'doi.org/10.26219/heal.aueb.360' }),
                publicationPreviewText
                  ? el('div', { class: 'mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300', text: publicationPreviewText })
                  : null,
              ],
            )
          : null,
        el('p', { class: 'mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-200', text: summary }),
        otherLinks.length
          ? el(
              'div',
              { class: 'mt-4 flex flex-wrap gap-2' },
              otherLinks
                .slice(0, 3)
                .map((l) => el('div', { class: 'pointer-events-auto' }, [renderLinkButton(l, title, 'ghost')])),
            )
          : null,
        tags.length
          ? el(
              'div',
              { class: 'mt-auto flex flex-wrap gap-2 pt-4' },
              tags.map((t) =>
                el('span', {
                  class:
                    'rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700',
                  text: t,
                }),
              ),
            )
          : null,
      ]),
    ],
  )
}

const renderExperienceItem = (job) => {
  const bullets = Array.isArray(job.bullets) ? job.bullets : []

  return el(
    'li',
    { class: 'reveal rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700' },
    [
      el('div', { class: 'flex flex-wrap items-center justify-between gap-2' }, [
        el('div', { class: 'text-sm font-semibold text-slate-900 dark:text-white', text: safe(job.title) }),
        el('div', { class: 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400', text: safe(job.date) }),
      ]),
      el('div', { class: 'mt-1 text-sm font-medium text-slate-700 dark:text-slate-200', text: safe(job.company) }),
      bullets.length
        ? el(
            'ul',
            { class: 'mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300' },
            bullets.slice(0, 4).map((b) =>
              el('li', { class: 'flex items-start gap-2' }, [
                el('span', { class: 'mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500' }),
                el('span', { text: b }),
              ]),
            ),
          )
        : null,
    ],
  )
}

const renderSkillGroup = (group) => {
  const tags = Array.isArray(group.tags) ? group.tags : []
  const label = group.id ? group.id : 'Skills'
  const labelText = t('skillGroup', label) || String(label)
  const itemsText = typeof t('items') === 'function' ? t('items')(tags.length) : `${tags.length} items`

  return el('div', { class: 'reveal rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700' }, [
    el('div', { class: 'flex items-center justify-between gap-3' }, [
      el('h3', { class: 'text-sm font-semibold text-slate-900 dark:text-white', text: labelText }),
      el('span', { class: 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400', text: itemsText }),
    ]),
    el(
      'div',
      { class: 'mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2' },
      tags.map((t) =>
        el(
          'div',
          {
            class:
              'flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700',
          },
          [
            el('img', {
              src: skillIconUrl(t),
              alt: '',
              class: 'h-5 w-5 shrink-0',
              loading: 'lazy',
              width: 20,
              height: 20,
            }),
            el('span', { class: 'text-xs font-semibold text-slate-700 dark:text-slate-100', text: t }),
          ],
        ),
      ),
    ),
  ])
}

const normalizeProjects = (portfolio) => {
  if (!portfolio?.projects) return []
  return Object.values(portfolio.projects)
}

const applyLinks = () => {
  const setHref = (id, href) => {
    const a = document.getElementById(id)
    if (!a) return
    a.setAttribute('href', href)
  }

  setHref('contact-email', PROFILE.links.email)
  setHref('contact-linkedin', PROFILE.links.linkedin)
  setHref('contact-github', PROFILE.links.github)


}

const renderAll = () => {
  const projects = normalizeProjects(PORTFOLIO)

  const saas = byType(projects, 'saas')
  const websites = byType(projects, 'websites')
  const research = byType(projects, 'research')

  const saasRoot = document.getElementById('work-saas')
  const websitesRoot = document.getElementById('work-websites')
  const researchRoot = document.getElementById('work-research')

  if (saasRoot) saas.forEach((p) => saasRoot.appendChild(renderProjectCard(p)))
  if (websitesRoot) websites.forEach((p) => websitesRoot.appendChild(renderProjectCard(p)))
  if (researchRoot) research.forEach((p) => researchRoot.appendChild(renderProjectCard(p)))

  const experienceRoot = document.getElementById('experience-list')
  if (experienceRoot) PORTFOLIO.experience.forEach((j) => experienceRoot.appendChild(renderExperienceItem(j)))

  const skillsRoot = document.getElementById('skills-grid')
  if (skillsRoot) PORTFOLIO.skills.forEach((g) => skillsRoot.appendChild(renderSkillGroup(g)))

  const year = document.getElementById('year')
  if (year) year.textContent = String(new Date().getFullYear())
}

const initScrollAnimations = () => {
  if (!window.gsap || !window.ScrollTrigger) return

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  window.gsap.registerPlugin(window.ScrollTrigger)

  const rootScroller = document.getElementById('scroll-root')

  const revealTargets = Array.from(document.querySelectorAll('.reveal'))
  if (!revealTargets.length) return

  revealTargets.forEach((target) => {
    window.gsap.fromTo(
      target,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.9,
        scrollTrigger: {
          trigger: target,
          start: 'top 86%',
          end: 'top 60%',
          scrub: 1,
          scroller: rootScroller || undefined,
        },
      },
    )
  })
}

const initModalDismiss = () => {
  const modal = document.getElementById('project-modal')
  if (!modal) return

  modal.addEventListener('click', (e) => {
    if (e.target !== modal) return
    try {
      modal.close()
    } catch {
      // ignore
    }
  })
}

const initSpeedDial = () => {
  const trigger = document.getElementById('speed-dial-trigger')
  const menu = document.getElementById('speed-dial-menu')
  const iconMenu = document.getElementById('speed-dial-icon-menu')
  const iconClose = document.getElementById('speed-dial-icon-close')
  const items = document.querySelectorAll('.speed-dial-item')

  if (!trigger || !menu) return

  const open = () => {
    menu.classList.remove('opacity-0', 'pointer-events-none', 'invisible')
    menu.classList.add('opacity-100', 'pointer-events-auto', 'visible')
    menu.setAttribute('data-open', '')
    iconMenu?.classList.add('hidden')
    iconClose?.classList.remove('hidden')
    trigger?.setAttribute('aria-expanded', 'true')
  }

  const close = () => {
    menu.classList.add('opacity-0', 'pointer-events-none', 'invisible')
    menu.classList.remove('opacity-100', 'pointer-events-auto', 'visible')
    menu.removeAttribute('data-open')
    iconMenu?.classList.remove('hidden')
    iconClose?.classList.add('hidden')
    trigger?.setAttribute('aria-expanded', 'false')
  }

  const toggle = () => {
    const isOpen = trigger?.getAttribute('aria-expanded') === 'true'
    if (isOpen) close()
    else open()
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    toggle()
  })

  items.forEach((item) => {
    item.addEventListener('click', () => close())
  })

  const themeBtn = document.getElementById('speed-dial-theme')
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      close()
    })
  }

  document.addEventListener('click', (e) => {
    const dial = document.getElementById('speed-dial')
    if (!dial?.contains(e.target)) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

const initLangDropdown = () => {
  const trigger = document.getElementById('lang-dropdown-trigger')
  const menu = document.getElementById('lang-dropdown-menu')
  const chevron = document.getElementById('lang-dropdown-chevron')
  const container = document.getElementById('lang-dropdown')

  if (!trigger || !menu || !container) return

  const open = () => {
    menu.setAttribute('data-open', '')
    trigger.setAttribute('aria-expanded', 'true')
    chevron?.classList.add('rotate-180')
  }

  const close = () => {
    menu.removeAttribute('data-open')
    trigger.setAttribute('aria-expanded', 'false')
    chevron?.classList.remove('rotate-180')
  }

  const toggle = () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true'
    if (isOpen) close()
    else open()
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    toggle()
  })

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

const boot = () => {
  initTheme()
  applyLinks()
  renderAll()
  initScrollAnimations()
  initModalDismiss()
  initSpeedDial()
  initLangDropdown()

  initHeroThreeBackground('hero-canvas')
}

document.addEventListener('DOMContentLoaded', boot)

