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

const initSpeedDial = () => {
  const trigger = document.getElementById('speed-dial-trigger')
  const menu = document.getElementById('speed-dial-menu')
  const iconMenu = document.getElementById('speed-dial-icon-menu')
  const iconClose = document.getElementById('speed-dial-icon-close')
  const items = menu?.querySelectorAll('[role="menuitem"]') ?? []

  if (!trigger || !menu) return

  const open = () => {
    menu.classList.add('opacity-100', 'pointer-events-auto', 'visible')
    menu.classList.remove('opacity-0', 'pointer-events-none', 'invisible')
    menu.setAttribute('data-open', '')
    iconMenu?.classList.add('hidden')
    iconClose?.classList.remove('hidden')
    trigger.setAttribute('aria-expanded', 'true')
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

const initShareCopyLink = () => {
  const buttons = document.querySelectorAll('.share-copy-link')
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-copy-share-url')
      const done = btn.getAttribute('data-copy-done') || 'Copied'
      if (!url) return
      const prevLabel = btn.getAttribute('aria-label') || ''
      const prevTitle = btn.getAttribute('title') || ''
      try {
        await navigator.clipboard.writeText(url)
        btn.setAttribute('aria-label', done)
        if (prevTitle) btn.setAttribute('title', done)
        setTimeout(() => {
          if (prevLabel) btn.setAttribute('aria-label', prevLabel)
          if (prevTitle) btn.setAttribute('title', prevTitle)
        }, 2000)
      } catch {
        // ignore
      }
    })
  })
}

const initArticleMotion = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduced) return

  const nodes = document.querySelectorAll('.article-reveal')
  nodes.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 18,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    })
  })
}

const boot = () => {
  initTheme()
  initSpeedDial()
  initLangDropdown()
  initShareCopyLink()
  initArticleMotion()

  const y = document.getElementById('footer-year')
  if (y) y.textContent = String(new Date().getFullYear())
}

document.addEventListener('DOMContentLoaded', boot)
