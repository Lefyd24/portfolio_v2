import fs from 'fs/promises'
import path from 'path'
import { SITE } from './site-config.js'

const formatDate = (d) => (d.length >= 10 ? d.slice(0, 10) : d)

/**
 * @param {{
 *   feedEntries: { slug: string, en?: { lastModified: string }, el?: { lastModified: string } }[]
 *   tagSlugsByLocale: { en: Set<string>, el: Set<string> }
 * }} param0
 */
export const writeSitemap = async (rootDir, { feedEntries, tagSlugsByLocale }) => {
  const origins = SITE.getSitemapOrigins()
  const urls = []

  /**
   * @param {string} origin
   * @param {string} path must start with /
   * @param {string} lastmod
   * @param {[string, string][]} alternates [lang, fullPath starting with /]
   */
  const pushUrl = (origin, path, lastmod, alternates) => {
    const loc = `${origin}${path}`
    const fullAlts = alternates.map(([lang, p]) => [lang, `${origin}${p}`])
    urls.push({ loc, lastmod, alternates: fullAlts })
  }

  const today = new Date().toISOString().slice(0, 10)

  for (const origin of origins) {
    pushUrl(origin, '/', today, [
      ['x-default', '/'],
      ['en', '/'],
      ['el', '/el/'],
    ])
    pushUrl(origin, '/el/', today, [
      ['x-default', '/'],
      ['en', '/'],
      ['el', '/el/'],
    ])

    pushUrl(origin, '/feed/', today, [
      ['x-default', '/feed/'],
      ['en', '/feed/'],
      ['el', '/el/feed/'],
    ])
    pushUrl(origin, '/el/feed/', today, [
      ['x-default', '/feed/'],
      ['en', '/feed/'],
      ['el', '/el/feed/'],
    ])

    for (const a of feedEntries) {
      const enLm = a.en?.lastModified
      const elLm = a.el?.lastModified
      if (a.en) {
        const lm = formatDate(enLm || today)
        const hasEl = Boolean(a.el)
        const alts = hasEl
          ? [
              ['x-default', `/feed/${a.slug}/`],
              ['en', `/feed/${a.slug}/`],
              ['el', `/el/feed/${a.slug}/`],
            ]
          : [
              ['x-default', `/feed/${a.slug}/`],
              ['en', `/feed/${a.slug}/`],
            ]
        pushUrl(origin, `/feed/${a.slug}/`, lm, alts)
      }
      if (a.el) {
        const lm = formatDate(elLm || today)
        const hasEn = Boolean(a.en)
        const alts = hasEn
          ? [
              ['x-default', `/feed/${a.slug}/`],
              ['en', `/feed/${a.slug}/`],
              ['el', `/el/feed/${a.slug}/`],
            ]
          : [
              ['x-default', `/el/feed/${a.slug}/`],
              ['el', `/el/feed/${a.slug}/`],
            ]
        pushUrl(origin, `/el/feed/${a.slug}/`, lm, alts)
      }
    }

    for (const tag of tagSlugsByLocale.en) {
      pushUrl(origin, `/feed/tags/${tag}/`, today, [
        ['x-default', `/feed/tags/${tag}/`],
        ['en', `/feed/tags/${tag}/`],
      ])
    }
    for (const tag of tagSlugsByLocale.el) {
      pushUrl(origin, `/el/feed/tags/${tag}/`, today, [
        ['x-default', `/el/feed/tags/${tag}/`],
        ['el', `/el/feed/tags/${tag}/`],
      ])
    }
  }

  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
  ]

  for (const u of urls) {
    lines.push(`  <url>`)
    lines.push(`    <loc>${escapeXml(u.loc)}</loc>`)
    for (const [lang, href] of u.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
      )
    }
    lines.push(`    <lastmod>${escapeXml(u.lastmod)}</lastmod>`)
    lines.push(`    <changefreq>monthly</changefreq>`)
    lines.push(`    <priority>0.8</priority>`)
    lines.push(`  </url>`)
  }

  lines.push(`</urlset>`)
  await fs.writeFile(path.join(rootDir, 'sitemap.xml'), lines.join('\n'), 'utf8')
}

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
