import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { SITE } from './site-config.js'
import { slugifyTag } from './markdown-parser.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatesDir = path.join(__dirname, '../../templates')

/**
 * @param {string} name
 */
const loadTemplate = async (name) => {
  const p = path.join(templatesDir, name)
  return fs.readFile(p, 'utf8')
}

/**
 * @param {string} tpl
 * @param {Record<string, string>} map
 */
const apply = (tpl, map) => {
  let out = tpl
  for (const [k, v] of Object.entries(map)) {
    out = out.split(`{{${k}}}`).join(v)
  }
  return out
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const jsonLdString = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

/** Inline SVG for share row; uses currentColor for theme sync. */
const shareIcon = (child, opts = {}) => {
  const { fill = true } = opts
  if (fill) {
    return `<svg class="h-[18px] w-[18px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${child}</svg>`
  }
  return `<svg class="h-[18px] w-[18px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${child}</svg>`
}

const SHARE_ICON = {
  x: shareIcon(
    '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  ),
  linkedin: shareIcon(
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  ),
  facebook: shareIcon(
    '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  ),
  reddit: shareIcon(
    '<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.493l.885-4.182a.272.272 0 0 1 .274-.222h2.415c.14 0 .245.119.238.256l-.857 4.023c.791.03 1.548.137 2.257.302.247-.398.687-.66 1.184-.66z"/>',
  ),
  hackerNews: shareIcon(
    '<path d="M0 24V0h24v24H0zM6.9 19.2h3.3v-7.35L7.5 5.4h3.15l2.1 4.2 2.1-4.2h3.15l-2.7 6.45V19.2h3.3V4.8H14.1l-2.1 4.2-2.1-4.2H6.9v14.4z"/>',
  ),
  bluesky: shareIcon(
    '<path d="M4 7h16v2.25H4V7zm2 4.875h12v2.25H6v-2.25zm-2 4.875h16V19H4v-2.25z"/>',
  ),
  telegram: shareIcon(
    '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
  ),
  whatsapp: shareIcon(
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
  ),
  mail: shareIcon(
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />',
    { fill: false },
  ),
  copy: shareIcon(
    '<path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    { fill: false },
  ),
}

/**
 * @param {'en'|'el'} locale
 */
const homePrefix = (locale) => (locale === 'el' ? '/el' : '')

/**
 * @param {{
 *   locale: 'en'|'el'
 *   slug: string
 *   frontmatter: import('./markdown-parser.js').parseArticleMarkdown extends never ? never : any
 *   bodyHtml: string
 *   alternatePath: string | null
 *   related: { slug: string, title: string, date: string, readingMinutes: number }[]
 *   ogImageUrl: string
 *   ogImageKnownSize?: boolean
 * }} opts
 */
export const buildArticleHtml = async (opts) => {
  const { locale, slug, frontmatter, bodyHtml, alternatePath, related, ogImageUrl, ogImageKnownSize } = opts
  const ui = SITE.ui[locale]
  const base = SITE.baseUrl.replace(/\/$/, '')
  const feedPrefix = locale === 'el' ? '/el/feed' : '/feed'
  const canonicalPath = `${feedPrefix}/${slug}/`
  const canonical = `${base}${canonicalPath}`
  const socialTitle = frontmatter.shareTitle || frontmatter.title
  const pageTitle = `${socialTitle} | ${SITE.author.name}`
  const ogSiteName = `${SITE.author.name} — ${ui.listTitle}`

  const hreflang = []
  hreflang.push(
    `    <link rel="alternate" hreflang="${locale === 'el' ? 'el' : 'en'}" href="${esc(canonical)}" />`,
  )
  if (alternatePath) {
    const altFull = `${base}${alternatePath}`
    hreflang.push(`    <link rel="alternate" hreflang="${locale === 'el' ? 'en' : 'el'}" href="${esc(altFull)}" />`)
    hreflang.push(`    <link rel="alternate" hreflang="x-default" href="${esc(`${base}/feed/${slug}/`)}" />`)
  } else {
    hreflang.push(`    <link rel="alternate" hreflang="x-default" href="${esc(`${base}/feed/${slug}/`)}" />`)
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastModified,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
      url: base + (locale === 'el' ? '/el/' : '/'),
    },
    publisher: {
      '@type': 'Person',
      name: SITE.author.name,
    },
    mainEntityOfPage: canonical,
    inLanguage: locale === 'el' ? 'el-GR' : 'en-US',
    image: ogImageUrl ? [ogImageUrl] : undefined,
  }

  const readLabel = ui.readTime(frontmatter.readingTime)
  const dateLabel = new Date(frontmatter.date).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const tagLinks = frontmatter.tags
    .map((t) => {
      const slugTag = slugifyTag(t)
      const href = `${feedPrefix}/tags/${slugTag}/`
      return `<a href="${esc(href)}" class="inline-flex items-center rounded-full bg-navy-500/15 px-3 py-1 text-xs font-semibold text-navy-800 ring-1 ring-navy-600/30 hover:bg-navy-500/25 dark:bg-sky-500/15 dark:text-sky-100 dark:ring-sky-400/40 dark:hover:bg-sky-500/25">${esc(t)}</a>`
    })
    .join('\n')

  const relatedHtml =
    related.length === 0
      ? ''
      : `<div class="rounded-2xl glass-card p-5">
        <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.relatedTitle)}</h2>
        <ul class="mt-4 space-y-3">
          ${related
            .map(
              (r) => `<li>
            <a href="${esc(`${feedPrefix}/${r.slug}/`)}" class="group block rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500/25">
              <span class="text-sm font-semibold text-slate-900 group-hover:text-navy-600 dark:text-white dark:group-hover:text-sky-400">${esc(r.title)}</span>
              <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">${esc(r.date)} · ${esc(ui.readTime(r.readingMinutes))}</span>
            </a>
          </li>`,
            )
            .join('')}
        </ul>
      </div>`

  const allTagsFlat = [...new Set(frontmatter.tags)]
  const tagsBlock =
    allTagsFlat.length === 0
      ? ''
      : `<div class="rounded-2xl glass-card p-5">
        <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.tagsTitle)}</h2>
        <div class="mt-4 flex flex-wrap gap-2">${tagLinks}</div>
      </div>`

  const shareUrl = encodeURIComponent(canonical)
  const shareTitleEnc = encodeURIComponent(socialTitle)
  const shareTextCombined = encodeURIComponent(`${socialTitle}\n${canonical}`)
  const emailSubject = encodeURIComponent(socialTitle)
  const emailBody = encodeURIComponent(`${socialTitle}\n\n${canonical}\n`)
  const shareBtn =
    'glass-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-navy-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-navy-500/25 dark:text-slate-200 dark:hover:bg-slate-800/70'
  const shareBlock = `<div class="rounded-2xl glass-card p-5">
      <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.shareTitle)}</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitleEnc}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.twitterShare)}" aria-label="${esc(ui.twitterShare)}">${SHARE_ICON.x}</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.linkedinShare)}" aria-label="${esc(ui.linkedinShare)}">${SHARE_ICON.linkedin}</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.facebookShare)}" aria-label="${esc(ui.facebookShare)}">${SHARE_ICON.facebook}</a>
        <a href="https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitleEnc}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.redditShare)}" aria-label="${esc(ui.redditShare)}">${SHARE_ICON.reddit}</a>
        <a href="https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${shareTitleEnc}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.hackerNewsShare)}" aria-label="${esc(ui.hackerNewsShare)}">${SHARE_ICON.hackerNews}</a>
        <a href="https://bsky.app/intent/compose?text=${shareTextCombined}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.blueskyShare)}" aria-label="${esc(ui.blueskyShare)}">${SHARE_ICON.bluesky}</a>
        <a href="https://t.me/share/url?url=${shareUrl}&text=${shareTitleEnc}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.telegramShare)}" aria-label="${esc(ui.telegramShare)}">${SHARE_ICON.telegram}</a>
        <a href="https://wa.me/?text=${shareTextCombined}" class="${shareBtn}" target="_blank" rel="noreferrer noopener" title="${esc(ui.whatsAppShare)}" aria-label="${esc(ui.whatsAppShare)}">${SHARE_ICON.whatsapp}</a>
        <a href="mailto:?subject=${emailSubject}&body=${emailBody}" class="${shareBtn}" title="${esc(ui.emailShare)}" aria-label="${esc(ui.emailShare)}">${SHARE_ICON.mail}</a>
        <button type="button" class="${shareBtn} share-copy-link" data-copy-share-url="${esc(canonical)}" data-copy-done="${esc(ui.copyLinkDone)}" title="${esc(ui.copyLinkShare)}" aria-label="${esc(ui.copyLinkShare)}">${SHARE_ICON.copy}</button>
      </div>
    </div>`

  const headerInner = buildHeaderInner({
    locale,
    ui,
    activeFeed: true,
  })

  const breadcrumb = `<nav class="text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2">
      <li><a href="${homePrefix(locale) || '/'}" class="font-medium text-navy-600 hover:underline dark:text-navy-400">${esc(ui.breadcrumbHome)}</a></li>
      <li aria-hidden="true">/</li>
      <li><a href="${feedPrefix}/" class="font-medium text-navy-600 hover:underline dark:text-navy-400">${esc(ui.breadcrumbFeed)}</a></li>
      <li aria-hidden="true">/</li>
      <li class="font-semibold text-slate-700 dark:text-slate-200">${esc(frontmatter.title)}</li>
    </ol>
  </nav>`

  const authorBio = SITE.author.bio[locale]
  const authorSection = `<section class="rounded-2xl glass-card p-6 md:p-8" aria-label="${esc(frontmatter.author)}">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <img src="${esc(SITE.author.image)}" alt="" width="64" height="64" class="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" loading="lazy" />
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">${esc(frontmatter.author)}</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(authorBio)}</p>
        <div class="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="${esc(SITE.author.links.github)}" class="text-navy-600 hover:underline dark:text-navy-400" target="_blank" rel="noreferrer">GitHub</a>
          <a href="${esc(SITE.author.links.linkedin)}" class="text-navy-600 hover:underline dark:text-navy-400" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="${esc(SITE.author.links.email)}" class="text-navy-600 hover:underline dark:text-navy-400">Email</a>
        </div>
      </div>
    </div>
  </section>`

  const mainInner = `<div class="mx-auto w-full max-w-5xl px-4 pb-16 pt-[calc(5rem+env(safe-area-inset-top))] md:px-6 md:pt-24">
    ${breadcrumb}
    <div class="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article class="min-w-0">
        <header class="article-reveal border-b border-slate-200 pb-8 dark:border-slate-800">
          ${frontmatter.featured ? `<span class="inline-flex rounded-full bg-navy-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-900 shadow-sm ring-1 ring-navy-600/30 dark:bg-sky-400/20 dark:text-sky-50 dark:shadow-[0_0_20px_-4px_rgba(56,189,248,0.35)] dark:ring-sky-300/55">${esc(ui.featuredBadge)}</span>` : ''}
          <h1 class="mt-4 text-3xl font-semibold tracking-tight text-ink-950 dark:text-white md:text-4xl">${esc(frontmatter.title)}</h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(frontmatter.description)}</p>
          <div class="mt-6 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span><span class="font-medium text-slate-600 dark:text-slate-300">${esc(ui.published)}</span> ${esc(dateLabel)}</span>
            <span aria-hidden="true">·</span>
            <span>${esc(readLabel)}</span>
          </div>
        </header>
        <div class="article-reveal article-body prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-navy-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-sky-400 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700/90 prose-pre:bg-slate-900 prose-pre:px-4 prose-pre:py-3 prose-pre:text-slate-100 prose-pre:shadow-inner dark:prose-pre:border-sky-500/25 dark:prose-pre:bg-slate-800 dark:prose-pre:text-slate-100 dark:prose-pre:shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_16px_48px_-20px_rgba(0,0,0,0.65)] prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-slate-800 dark:prose-code:text-sky-100 [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:font-normal [&_pre_code]:text-inherit [&_pre_code]:shadow-none mt-10">
          ${bodyHtml}
        </div>
        <div class="article-reveal mt-12">${authorSection}</div>
      </article>
      <aside class="space-y-6 lg:pt-2" aria-label="Article sidebar">
        <div class="article-reveal space-y-6">${relatedHtml}${tagsBlock}${shareBlock}</div>
      </aside>
    </div>
  </div>`

  const ogDimsBlock =
    ogImageKnownSize === true
      ? `    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />`
      : ''

  const tpl = await loadTemplate('article-shell.html')
  return apply(tpl, {
    HTML_LANG: locale === 'el' ? 'el' : 'en',
    PAGE_TITLE: esc(pageTitle),
    META_DESC: esc(frontmatter.description),
    CANONICAL: esc(canonical),
    HREFLANG_BLOCK: hreflang.join('\n'),
    OG_SITE_NAME: esc(ogSiteName),
    OG_TITLE: esc(socialTitle),
    OG_DESC: esc(frontmatter.description),
    OG_URL: esc(canonical),
    OG_IMAGE: esc(ogImageUrl || `${base}${SITE.author.image}`),
    OG_IMAGE_DIMS: ogDimsBlock,
    OG_IMAGE_ALT: esc(socialTitle),
    OG_TYPE: 'article',
    OG_LOCALE: locale === 'el' ? 'el_GR' : 'en_US',
    OG_LOCALE_ALT: locale === 'el' ? 'en_US' : 'el_GR',
    TWITTER_CARD: 'summary_large_image',
    TWITTER_TITLE: esc(socialTitle),
    TWITTER_DESC: esc(frontmatter.description),
    TWITTER_IMAGE: esc(ogImageUrl || `${base}${SITE.author.image}`),
    TWITTER_IMAGE_ALT: esc(socialTitle),
    JSON_LD: jsonLdString(articleLd),
    SKIP_TEXT: esc(ui.skip),
    SCROLL_ARIA: esc(ui.scrollAria),
    HEADER_INNER: headerInner,
    MAIN_INNER: mainInner,
    FOOTER_YEAR: String(new Date().getFullYear()),
    FOOTER_RIGHTS: esc(ui.footerRights),
    AUTHOR_NAME: esc(SITE.author.name),
  })
}

/**
 * @param {{
 *   locale: 'en'|'el'
 *   featured: { slug: string, title: string, description: string, date: string, readingMinutes: number, tags: string[] }[]
 *   rest: { slug: string, title: string, description: string, date: string, readingMinutes: number, tags: string[] }[]
 *   allTagSlugs: { label: string, slug: string }[]
 * }} opts
 */
export const buildArticleListHtml = async (opts) => {
  const { locale, featured, rest, allTagSlugs } = opts
  const ui = SITE.ui[locale]
  const feedPrefix = locale === 'el' ? '/el/feed' : '/feed'
  const base = SITE.baseUrl.replace(/\/$/, '')
  const canonical = `${base}${feedPrefix}/`

  const tagPill =
    'inline-flex max-w-full shrink-0 rounded-full bg-navy-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy-900 ring-1 ring-navy-600/30 dark:bg-slate-700/95 dark:text-slate-100 dark:ring-slate-500/70'

  const card = (a) => `<article class="article-reveal flex h-full flex-col rounded-2xl glass-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
    <a href="${esc(`${feedPrefix}/${a.slug}/`)}" class="group flex flex-1 flex-col items-start focus:outline-none focus:ring-2 focus:ring-navy-500/25 rounded-xl -m-2 p-2">
      ${a.featured ? `<span class="${tagPill} mb-2">${esc(ui.featuredBadge)}</span>` : ''}
      <h2 class="text-xl font-semibold text-slate-900 group-hover:text-navy-600 dark:text-white dark:group-hover:text-sky-400">${esc(a.title)}</h2>
      <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(a.description)}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <time datetime="${esc(a.date)}">${esc(a.date)}</time>
        <span aria-hidden="true">·</span>
        <span>${esc(ui.readTime(a.readingMinutes))}</span>
      </div>
      <div class="mt-4 flex w-full flex-wrap gap-2">${a.tags
        .slice(0, 4)
        .map((t) => `<span class="${tagPill}">${esc(t)}</span>`)
        .join('')}</div>
    </a>
  </article>`

  const featuredSection =
    featured.length === 0
      ? ''
      : `<section aria-labelledby="featured-heading" class="mb-14">
    <h2 id="featured-heading" class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.listFeatured)}</h2>
    <div class="mt-6 grid gap-6 md:grid-cols-2">${featured.map(card).join('')}</div>
  </section>`

  const listSection =
    rest.length === 0
      ? ''
      : `<section aria-labelledby="all-heading">
    <h2 id="all-heading" class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.listAll)}</h2>
    <div class="mt-6 grid gap-6 md:grid-cols-2">${rest.map(card).join('')}</div>
  </section>`

  const tagsNav =
    allTagSlugs.length === 0
      ? ''
      : `<nav class="article-reveal mt-12 rounded-2xl glass-card p-5" aria-label="${esc(ui.tagsTitle)}">
    <h2 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">${esc(ui.allTags)}</h2>
    <div class="mt-4 flex flex-wrap gap-2">
      ${allTagSlugs
        .map(
          (t) =>
            `<a href="${esc(`${feedPrefix}/tags/${t.slug}/`)}" class="glass-btn rounded-xl px-3 py-1.5 text-xs font-semibold">${esc(t.label)}</a>`,
        )
        .join('')}
    </div>
  </nav>`

  const headerInner = buildHeaderInner({ locale, ui, activeFeed: true })

  const mainInner = `<div class="mx-auto w-full max-w-5xl px-4 pb-16 pt-[calc(5rem+env(safe-area-inset-top))] md:px-6 md:pt-24">
    <header class="article-reveal mb-10 max-w-2xl">
      <nav class="text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2">
          <li><a href="${homePrefix(locale) || '/'}" class="font-medium text-navy-600 hover:underline dark:text-navy-400">${esc(ui.breadcrumbHome)}</a></li>
          <li aria-hidden="true">/</li>
          <li class="font-semibold text-slate-700 dark:text-slate-200">${esc(ui.breadcrumbFeed)}</li>
        </ol>
      </nav>
      <h1 class="mt-6 text-3xl font-semibold tracking-tight text-ink-950 dark:text-white md:text-4xl">${esc(ui.listTitle)}</h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(ui.listSubtitle)}</p>
    </header>
    ${featuredSection}
    ${rest.length === 0 && featured.length === 0 ? `<p class="text-slate-600 dark:text-slate-300">${esc(ui.feedEmpty)}</p>` : ''}
    ${listSection}
    ${tagsNav}
  </div>`

  const pageTitle = `${ui.listTitle} | ${SITE.author.name}`
  const description = ui.listSubtitle

  const tpl = await loadTemplate('article-shell.html')
  return apply(tpl, {
    HTML_LANG: locale === 'el' ? 'el' : 'en',
    PAGE_TITLE: esc(pageTitle),
    META_DESC: esc(description),
    CANONICAL: esc(canonical),
    HREFLANG_BLOCK: [
      `    <link rel="alternate" hreflang="${locale === 'el' ? 'el' : 'en'}" href="${esc(canonical)}" />`,
      `    <link rel="alternate" hreflang="${locale === 'el' ? 'en' : 'el'}" href="${esc(locale === 'el' ? `${base}/feed/` : `${base}/el/feed/`)}" />`,
      `    <link rel="alternate" hreflang="x-default" href="${esc(`${base}/feed/`)}" />`,
    ].join('\n'),
    OG_TITLE: esc(pageTitle),
    OG_DESC: esc(description),
    OG_URL: esc(canonical),
    OG_IMAGE: esc(`${base}${SITE.author.image}`),
    OG_TYPE: 'website',
    OG_LOCALE: locale === 'el' ? 'el_GR' : 'en_US',
    OG_LOCALE_ALT: locale === 'el' ? 'en_US' : 'el_GR',
    TWITTER_CARD: 'summary_large_image',
    TWITTER_TITLE: esc(pageTitle),
    TWITTER_DESC: esc(description),
    TWITTER_IMAGE: esc(`${base}${SITE.author.image}`),
    JSON_LD: jsonLdString({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: ui.listTitle,
      description,
      url: canonical,
      inLanguage: locale === 'el' ? 'el-GR' : 'en-US',
    }),
    SKIP_TEXT: esc(ui.skip),
    SCROLL_ARIA: esc(ui.scrollAria),
    HEADER_INNER: headerInner,
    MAIN_INNER: mainInner,
    FOOTER_YEAR: String(new Date().getFullYear()),
    FOOTER_RIGHTS: esc(ui.footerRights),
    AUTHOR_NAME: esc(SITE.author.name),
  })
}

/**
 * @param {{
 *   locale: 'en'|'el'
 *   tagLabel: string
 *   tagSlug: string
 *   posts: { slug: string, title: string, description: string, date: string, readingMinutes: number, tags: string[] }[]
 * }} opts
 */
export const buildTagListHtml = async (opts) => {
  const { locale, tagLabel, tagSlug, posts } = opts
  const ui = SITE.ui[locale]
  const feedPrefix = locale === 'el' ? '/el/feed' : '/feed'
  const base = SITE.baseUrl.replace(/\/$/, '')
  const canonical = `${base}${feedPrefix}/tags/${tagSlug}/`

  const cards = posts
    .map(
      (a) => `<article class="article-reveal rounded-2xl glass-card p-6">
    <a href="${esc(`${feedPrefix}/${a.slug}/`)}" class="group block focus:outline-none focus:ring-2 focus:ring-navy-500/25 rounded-xl -m-2 p-2">
      <h2 class="text-lg font-semibold text-slate-900 group-hover:text-navy-600 dark:text-white dark:group-hover:text-navy-400">${esc(a.title)}</h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(a.description)}</p>
      <div class="mt-3 text-xs text-slate-500 dark:text-slate-400"><time datetime="${esc(a.date)}">${esc(a.date)}</time> · ${esc(ui.readTime(a.readingMinutes))}</div>
    </a>
  </article>`,
    )
    .join('')

  const headerInner = buildHeaderInner({ locale, ui, activeFeed: true })

  const mainInner = `<div class="mx-auto w-full max-w-5xl px-4 pb-16 pt-[calc(5rem+env(safe-area-inset-top))] md:px-6 md:pt-24">
    <nav class="article-reveal text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a href="${homePrefix(locale) || '/'}" class="font-medium text-navy-600 hover:underline dark:text-navy-400">${esc(ui.breadcrumbHome)}</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="${feedPrefix}/" class="font-medium text-navy-600 hover:underline dark:text-navy-400">${esc(ui.breadcrumbFeed)}</a></li>
        <li aria-hidden="true">/</li>
        <li class="font-semibold text-slate-700 dark:text-slate-200">${esc(tagLabel)}</li>
      </ol>
    </nav>
    <header class="article-reveal mt-8">
      <h1 class="text-3xl font-semibold tracking-tight text-ink-950 dark:text-white md:text-4xl">${esc(ui.tagPostsTagged(tagLabel))}</h1>
    </header>
    <div class="mt-10 grid gap-6 md:grid-cols-2">${cards || `<p class="text-slate-600 dark:text-slate-300">${esc(ui.tagPageEmpty)}</p>`}</div>
  </div>`

  const pageTitle = `${tagLabel} | ${ui.breadcrumbFeed} | ${SITE.author.name}`
  const tpl = await loadTemplate('article-shell.html')
  return apply(tpl, {
    HTML_LANG: locale === 'el' ? 'el' : 'en',
    PAGE_TITLE: esc(pageTitle),
    META_DESC: esc(ui.tagPostsTagged(tagLabel)),
    CANONICAL: esc(canonical),
    HREFLANG_BLOCK: `    <link rel="alternate" hreflang="${locale === 'el' ? 'el' : 'en'}" href="${esc(canonical)}" />`,
    OG_TITLE: esc(pageTitle),
    OG_DESC: esc(ui.tagPostsTagged(tagLabel)),
    OG_URL: esc(canonical),
    OG_IMAGE: esc(`${base}${SITE.author.image}`),
    OG_TYPE: 'website',
    OG_LOCALE: locale === 'el' ? 'el_GR' : 'en_US',
    OG_LOCALE_ALT: locale === 'el' ? 'en_US' : 'el_GR',
    TWITTER_CARD: 'summary_large_image',
    TWITTER_TITLE: esc(pageTitle),
    TWITTER_DESC: esc(ui.tagPostsTagged(tagLabel)),
    TWITTER_IMAGE: esc(`${base}${SITE.author.image}`),
    JSON_LD: jsonLdString({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: ui.tagPostsTagged(tagLabel),
      url: canonical,
      inLanguage: locale === 'el' ? 'el-GR' : 'en-US',
    }),
    SKIP_TEXT: esc(ui.skip),
    SCROLL_ARIA: esc(ui.scrollAria),
    HEADER_INNER: headerInner,
    MAIN_INNER: mainInner,
    FOOTER_YEAR: String(new Date().getFullYear()),
    FOOTER_RIGHTS: esc(ui.footerRights),
    AUTHOR_NAME: esc(SITE.author.name),
  })
}

/**
 * @param {{ locale: 'en'|'el', ui: typeof SITE.ui.en, activeFeed?: boolean }} p
 */
const buildHeaderInner = ({ locale, ui, activeFeed }) => {
  const p = homePrefix(locale)
  const feedHref = `${p}/feed/`
  const navClass = (active) =>
    active
      ? 'glass rounded-xl px-3 py-2 text-sm font-semibold text-navy-800 ring-2 ring-navy-500/35 dark:bg-sky-500/10 dark:text-white dark:ring-sky-400/45'
      : 'glass glass-hover rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-500/25 dark:text-slate-200 dark:hover:text-white'

  const overview = `${p}/#hero`
  const about = `${p}/#about`
  const work = `${p}/#work`
  const experience = `${p}/#experience`
  const skills = `${p}/#skills`
  const contact = `${p}/#contact`

  const langBlock =
    locale === 'en'
      ? `<div id="lang-dropdown" class="relative hidden md:block">
              <button type="button" id="lang-dropdown-trigger" class="glass glass-hover flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-500/25 dark:text-slate-200 dark:hover:text-white" aria-expanded="false" aria-haspopup="true" aria-controls="lang-dropdown-menu" aria-label="${esc(ui.langLabel)}">
                <span>EN</span>
                <svg id="lang-dropdown-chevron" class="h-4 w-4 shrink-0 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div id="lang-dropdown-menu" class="lang-dropdown-menu absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/25 opacity-0 pointer-events-none invisible transition-opacity duration-150 ease-out dark:ring-slate-500/25" role="menu" aria-label="${esc(ui.langLabel)}">
                <div class="glass-card flex flex-col p-1.5">
                  <span role="menuitem" class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400" aria-current="true">${esc(ui.langCurrent)}</span>
                  <a href="/el/" role="menuitem" class="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50" aria-label="${esc(ui.langEl)}">${esc(ui.langEl)}</a>
                </div>
              </div>
            </div>`
      : `<div id="lang-dropdown" class="relative hidden md:block">
              <button type="button" id="lang-dropdown-trigger" class="glass glass-hover flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-500/25 dark:text-slate-200 dark:hover:text-white" aria-expanded="false" aria-haspopup="true" aria-controls="lang-dropdown-menu" aria-label="${esc(ui.langLabel)}">
                <span>ΕΛ</span>
                <svg id="lang-dropdown-chevron" class="h-4 w-4 shrink-0 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div id="lang-dropdown-menu" class="lang-dropdown-menu absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/25 opacity-0 pointer-events-none invisible transition-opacity duration-150 ease-out dark:ring-slate-500/25" role="menu" aria-label="${esc(ui.langLabel)}">
                <div class="glass-card flex flex-col p-1.5">
                  <span role="menuitem" class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400" aria-current="true">${esc(ui.langCurrent)}</span>
                  <a href="/" role="menuitem" class="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50" aria-label="${esc(ui.langEn)}">${esc(ui.langEn)}</a>
                </div>
              </div>
            </div>`

  return `<div class="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 md:py-4 md:px-6">
          <a href="${overview}" class="glass glass-hover group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" aria-label="${esc(ui.breadcrumbHome)}">
            <span class="h-2 w-2 rounded-full bg-navy-500"></span>
            LF
          </a>
          <div class="flex items-center gap-2">
            <nav class="hidden items-center gap-2 md:flex" aria-label="${esc(ui.navLabel)}">
              <a class="${navClass(false)}" href="${overview}">${esc(ui.navOverview)}</a>
              <a class="${navClass(false)}" href="${about}">${esc(ui.navAbout)}</a>
              <a class="${navClass(false)}" href="${work}">${esc(ui.navWork)}</a>
              <a class="${navClass(false)}" href="${experience}">${esc(ui.navExperience)}</a>
              <a class="${navClass(false)}" href="${skills}">${esc(ui.navSkills)}</a>
              <a class="${navClass(activeFeed)}" href="${feedHref}">${esc(ui.navFeed)}</a>
              <a class="${navClass(false)}" href="${contact}">${esc(ui.navContact)}</a>
            </nav>
            ${langBlock}
            <button id="theme-toggle" type="button" class="glass-btn hidden h-10 w-10 items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500/25 md:inline-flex" aria-label="${esc(ui.themeToggle)}">
              <svg id="theme-icon-sun" class="h-5 w-5 text-slate-700 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              <svg id="theme-icon-moon" class="hidden h-5 w-5 text-slate-200 dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            </button>
            <div id="speed-dial" class="relative md:hidden">
              <button id="speed-dial-trigger" type="button" class="glass-btn flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-navy-500/25" aria-expanded="false" aria-label="${esc(ui.openMenu)}" aria-haspopup="true" aria-controls="speed-dial-menu">
                <svg id="speed-dial-icon-menu" class="h-5 w-5 text-slate-700 dark:text-slate-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></svg>
                <svg id="speed-dial-icon-close" class="hidden h-5 w-5 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M6 18L18 6" /></svg>
              </button>
              <div id="speed-dial-menu" class="speed-dial-menu absolute top-full right-0 mt-2 min-w-[200px] z-50 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/25 opacity-0 pointer-events-none invisible dark:ring-slate-500/25" role="menu" aria-label="${esc(ui.menuAria)}">
                <div class="glass-card flex flex-col p-1.5 max-h-[70dvh] overflow-y-auto">
                  <a href="${overview}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navOverview)}</a>
                  <a href="${about}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navAbout)}</a>
                  <a href="${work}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navWork)}</a>
                  <a href="${experience}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navExperience)}</a>
                  <a href="${skills}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navSkills)}</a>
                  <a href="${feedHref}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-navy-800 transition-colors hover:bg-white/50 dark:bg-sky-500/10 dark:text-white dark:hover:bg-slate-800/50">${esc(ui.navFeed)}</a>
                  <a href="${contact}" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.navContact)}</a>
                  <div class="my-1 h-px bg-slate-200/80 dark:bg-slate-600/50" aria-hidden="true"></div>
                  ${locale === 'en' ? `<a href="/el/" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.langEl)}</a>` : `<a href="/" role="menuitem" class="speed-dial-item w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50">${esc(ui.langEn)}</a>`}
                  <button type="button" id="speed-dial-theme" class="speed-dial-item flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-200 dark:hover:bg-slate-800/50" role="menuitem" aria-label="${esc(ui.themeToggle)}"><span>${esc(ui.themeMenu)}</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>`
}
