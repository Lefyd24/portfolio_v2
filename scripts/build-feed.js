import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'
import { parseArticleMarkdown, slugifyTag } from './lib/markdown-parser.js'
import { buildArticleHtml, buildArticleListHtml, buildTagListHtml } from './lib/html-generator.js'
import { writeSitemap } from './lib/sitemap-generator.js'
import { SITE } from './lib/site-config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const contentRoot = path.join(rootDir, 'content/feed')

const exists = async (p) => {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

/**
 * @param {string} mdPath
 * @param {string} ogImage
 * @param {string} slug
 */
const copyOgImageIfAny = async (mdPath, ogImage, slug) => {
  if (!ogImage || typeof ogImage !== 'string' || !ogImage.startsWith('./')) {
    return ''
  }
  const src = path.resolve(path.dirname(mdPath), ogImage)
  if (!(await exists(src))) return ''
  const destDir = path.join(rootDir, 'feed', slug, 'images')
  await fs.mkdir(destDir, { recursive: true })
  const dest = path.join(destDir, path.basename(src))
  await fs.copyFile(src, dest)
  const base = SITE.baseUrl.replace(/\/$/, '')
  return `${base}/feed/${slug}/images/${path.basename(src)}`
}

const writeIfChanged = async (filePath, html) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  let prev = ''
  try {
    prev = await fs.readFile(filePath, 'utf8')
  } catch {
    prev = ''
  }
  if (prev !== html) await fs.writeFile(filePath, html, 'utf8')
}

const collectSlugs = async () => {
  const enDir = path.join(contentRoot, 'en')
  const elDir = path.join(contentRoot, 'el')
  const enFiles = (await exists(enDir)) ? await glob('*.md', { cwd: enDir }) : []
  const elFiles = (await exists(elDir)) ? await glob('*.md', { cwd: elDir }) : []
  const set = new Set()
  for (const f of enFiles) set.add(f.replace(/\.md$/i, ''))
  for (const f of elFiles) set.add(f.replace(/\.md$/i, ''))
  return [...set].sort()
}

/**
 * @param {string} slug
 * @param {'en'|'el'} locale
 * @param {{ slug: string, en: Awaited<ReturnType<typeof parseArticleMarkdown>> | null, el: Awaited<ReturnType<typeof parseArticleMarkdown>> | null }} row
 */
const getRelated = (slug, locale, row, allRows) => {
  const cur = row[locale]
  if (!cur) return []
  const tags = new Set(cur.frontmatter.tags.map((t) => slugifyTag(t)))
  const candidates = allRows
    .filter((row) => row.slug !== slug && row[locale])
    .map((row) => {
      const p = row[locale]
      if (!p) return null
      const overlap = p.frontmatter.tags.some((t) => tags.has(slugifyTag(t)))
      if (!overlap) return null
      return {
        slug: row.slug,
        title: p.frontmatter.title,
        date: p.frontmatter.date,
        readingMinutes: p.frontmatter.readingTime,
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return candidates.slice(0, 3)
}

const run = async () => {
  await fs.rm(path.join(rootDir, 'feed'), { recursive: true, force: true })
  await fs.rm(path.join(rootDir, 'el', 'feed'), { recursive: true, force: true })
  await fs.rm(path.join(rootDir, 'articles'), { recursive: true, force: true })
  await fs.rm(path.join(rootDir, 'el', 'articles'), { recursive: true, force: true })

  const slugs = await collectSlugs()
  /** @type {{ slug: string, en: Awaited<ReturnType<typeof parseArticleMarkdown>> | null, el: Awaited<ReturnType<typeof parseArticleMarkdown>> | null }[]} */
  const rows = []

  for (const slug of slugs) {
    const enPath = path.join(contentRoot, 'en', `${slug}.md`)
    const elPath = path.join(contentRoot, 'el', `${slug}.md`)
    let en = null
    let el = null
    if (await exists(enPath)) {
      const raw = await fs.readFile(enPath, 'utf8')
      en = await parseArticleMarkdown(raw, enPath)
    }
    if (await exists(elPath)) {
      const raw = await fs.readFile(elPath, 'utf8')
      el = await parseArticleMarkdown(raw, elPath)
    }
    if (!en && !el) continue
    rows.push({ slug, en, el })
  }

  const base = SITE.baseUrl.replace(/\/$/, '')

  for (const row of rows) {
    let ogEn = ''
    let ogEl = ''
    const enPath = path.join(contentRoot, 'en', `${row.slug}.md`)
    const elPath = path.join(contentRoot, 'el', `${row.slug}.md`)
    if (row.en?.frontmatter.ogImage) {
      ogEn = await copyOgImageIfAny(enPath, row.en.frontmatter.ogImage, row.slug)
    }
    if (row.el?.frontmatter.ogImage) {
      ogEl = await copyOgImageIfAny(elPath, row.el.frontmatter.ogImage, row.slug)
    }
    if (!ogEn && ogEl) ogEn = ogEl
    if (!ogEl && ogEn) ogEl = ogEn

    if (row.en) {
      const ogImageUrl = ogEn || `${base}${SITE.author.image}`
      const altPath = row.el ? `/el/feed/${row.slug}/` : null
      const related = getRelated(row.slug, 'en', row, rows)
      const html = await buildArticleHtml({
        locale: 'en',
        slug: row.slug,
        frontmatter: row.en.frontmatter,
        bodyHtml: row.en.html,
        alternatePath: altPath,
        related,
        ogImageUrl,
      })
      await writeIfChanged(path.join(rootDir, 'feed', row.slug, 'index.html'), html)
    }

    if (row.el) {
      const ogImageUrl = ogEl || `${base}${SITE.author.image}`
      const altPath = row.en ? `/feed/${row.slug}/` : null
      const related = getRelated(row.slug, 'el', row, rows)
      const html = await buildArticleHtml({
        locale: 'el',
        slug: row.slug,
        frontmatter: row.el.frontmatter,
        bodyHtml: row.el.html,
        alternatePath: altPath,
        related,
        ogImageUrl,
      })
      await writeIfChanged(path.join(rootDir, 'el', 'feed', row.slug, 'index.html'), html)
    }
  }

  const toCard = (locale, row) => {
    const p = row[locale]
    if (!p) return null
    return {
      slug: row.slug,
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      date: p.frontmatter.date,
      readingMinutes: p.frontmatter.readingTime,
      tags: p.frontmatter.tags,
      featured: p.frontmatter.featured,
    }
  }

  const enCards = rows.map((r) => toCard('en', r)).filter(Boolean)
  const elCards = rows.map((r) => toCard('el', r)).filter(Boolean)

  const splitFeatured = (cards) => {
    const featured = cards.filter((c) => c.featured)
    const rest = cards.filter((c) => !c.featured)
    return { featured, rest }
  }

  const enSplit = splitFeatured(enCards)
  const elSplit = splitFeatured(elCards)

  const tagMapEn = new Map()
  const tagMapEl = new Map()
  for (const c of enCards) {
    for (const t of c.tags) {
      const s = slugifyTag(t)
      if (!tagMapEn.has(s)) tagMapEn.set(s, t)
    }
  }
  for (const c of elCards) {
    for (const t of c.tags) {
      const s = slugifyTag(t)
      if (!tagMapEl.has(s)) tagMapEl.set(s, t)
    }
  }

  const allTagSlugsEn = [...tagMapEn.entries()].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label))
  const allTagSlugsEl = [...tagMapEl.entries()].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label))

  const listEn = await buildArticleListHtml({
    locale: 'en',
    featured: enSplit.featured,
    rest: enSplit.rest,
    allTagSlugs: allTagSlugsEn,
  })
  await writeIfChanged(path.join(rootDir, 'feed', 'index.html'), listEn)

  const listEl = await buildArticleListHtml({
    locale: 'el',
    featured: elSplit.featured,
    rest: elSplit.rest,
    allTagSlugs: allTagSlugsEl,
  })
  await writeIfChanged(path.join(rootDir, 'el', 'feed', 'index.html'), listEl)

  for (const [tagSlug, tagLabel] of tagMapEn) {
    const posts = enCards.filter((c) => c.tags.some((t) => slugifyTag(t) === tagSlug))
    const html = await buildTagListHtml({ locale: 'en', tagLabel, tagSlug, posts })
    await writeIfChanged(path.join(rootDir, 'feed', 'tags', tagSlug, 'index.html'), html)
  }
  for (const [tagSlug, tagLabel] of tagMapEl) {
    const posts = elCards.filter((c) => c.tags.some((t) => slugifyTag(t) === tagSlug))
    const html = await buildTagListHtml({ locale: 'el', tagLabel, tagSlug, posts })
    await writeIfChanged(path.join(rootDir, 'el', 'feed', 'tags', tagSlug, 'index.html'), html)
  }

  await writeSitemap(rootDir, {
    feedEntries: rows.map((r) => ({
      slug: r.slug,
      en: r.en ? { lastModified: r.en.frontmatter.lastModified } : undefined,
      el: r.el ? { lastModified: r.el.frontmatter.lastModified } : undefined,
    })),
    tagSlugsByLocale: {
      en: new Set(tagMapEn.keys()),
      el: new Set(tagMapEl.keys()),
    },
  })

  console.log(`Built ${rows.length} feed entry pair(s), sitemap, and tag pages.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
