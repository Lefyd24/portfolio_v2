import matter from 'gray-matter'
import { marked } from 'marked'

marked.use({
  gfm: true,
  breaks: true,
})

/**
 * @param {string} text
 */
export const estimateReadingMinutes = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/**
 * @param {string} content
 * @returns {Map<string, string>}
 */
const extractFootnoteDefinitions = (content) => {
  const defs = new Map()
  const re = /^\[\^([^\]]+)\]:\s*(.+)$/gm
  let m = re.exec(content)
  while (m !== null) {
    defs.set(m[1], m[2].trim())
    m = re.exec(content)
  }
  return defs
}

/**
 * Remove optional `---` + `## Sources` block and footnote definition lines at end of article body.
 * @param {string} content
 */
const stripFootnoteBlockFromMarkdown = (content) => {
  let out = content.replace(/\n---[\s\n]*##\s+Sources[\s\S]*$/i, '')
  if (out === content) {
    out = content.replace(/\n##\s+Sources[\s\S]*$/i, '')
  }
  if (out === content) {
    out = content.replace(/(?:\n\n|\n)(?:\[\^[^\]]+\]:\s*[^\n]+\s*)+$/g, '')
  }
  return out.trimEnd()
}

/**
 * Replace in HTML fragments that are not inside `<pre>...</pre>` (fenced code blocks).
 * @param {string} html
 * @param {(fragment: string) => string} fn
 */
const transformHtmlOutsidePre = (html, fn) => {
  const parts = html.split(/(<pre\b[^>]*>[\s\S]*?<\/pre>)/gi)
  return parts.map((part, i) => (i % 2 === 0 ? fn(part) : part)).join('')
}

/**
 * @param {string} s
 */
const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * @param {string} id
 */
const citationAnchorId = (id) => {
  const slug = String(id).replace(/[^a-zA-Z0-9_-]/g, '_')
  return `citation-fn-${slug}`
}

/**
 * @param {string} bodyMd
 * @param {Map<string, string>} defs
 */
const buildHtmlWithCitations = async (bodyMd, defs) => {
  let html = await marked.parse(bodyMd)
  if (defs.size === 0) {
    return html
  }

  const refCounts = new Map()
  html = transformHtmlOutsidePre(html, (fragment) =>
    fragment.replace(/\[\^([^\]]+)\]/g, (full, id) => {
      if (!defs.has(id)) {
        return full
      }
      const n = (refCounts.get(id) ?? 0) + 1
      refCounts.set(id, n)
      const safe = citationAnchorId(id)
      const refId = n === 1 ? `${safe}-ref` : `${safe}-ref-${n}`
      return `<sup class="citation-ref"><a href="#${safe}" id="${refId}" class="citation-ref-link">${escapeHtml(id)}</a></sup>`
    }),
  )

  const items = await Promise.all(
    [...defs.entries()].map(async ([id, text]) => {
      const inner = await marked.parseInline(text)
      const safe = citationAnchorId(id)
      const backHref = `${safe}-ref`
      return `<li id="${safe}" class="citation-item"><span class="citation-marker">${escapeHtml(id)}</span><div class="citation-body">${inner}</div><a href="#${backHref}" class="citation-backref" aria-label="Back to citation ${escapeHtml(id)}">↩</a></li>`
    }),
  )

  const section = `<section class="article-citations not-prose" aria-labelledby="article-citations-heading"><h2 id="article-citations-heading" class="citations-heading">Sources</h2><ol class="citation-list" role="list">${items.join('')}</ol></section>`

  return `${html}\n${section}`
}

/**
 * @param {string} raw
 * @param {string} sourcePath for error messages
 */
export const parseArticleMarkdown = async (raw, sourcePath) => {
  const { data, content } = matter(raw)
  const fm = { ...data }
  if (!fm.title || typeof fm.title !== 'string') {
    throw new Error(`Missing title in ${sourcePath}`)
  }
  if (!fm.description || typeof fm.description !== 'string') {
    throw new Error(`Missing description in ${sourcePath}`)
  }
  if (!fm.date || typeof fm.date !== 'string') {
    throw new Error(`Missing date in ${sourcePath}`)
  }
  const tags = Array.isArray(fm.tags) ? fm.tags.map(String) : []

  const footnoteDefs = extractFootnoteDefinitions(content)
  const bodyMd =
    footnoteDefs.size > 0 ? stripFootnoteBlockFromMarkdown(content) : content
  const html = await buildHtmlWithCitations(bodyMd, footnoteDefs)

  const readingMinutes =
    typeof fm.readingTime === 'number' && Number.isFinite(fm.readingTime)
      ? Math.max(1, Math.round(fm.readingTime))
      : estimateReadingMinutes(bodyMd)

  return {
    frontmatter: {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      lastModified: typeof fm.lastModified === 'string' ? fm.lastModified : fm.date,
      tags,
      author: typeof fm.author === 'string' ? fm.author : 'Lefteris Fthenos',
      featured: Boolean(fm.featured),
      readingTime: readingMinutes,
      ogImage: typeof fm.ogImage === 'string' ? fm.ogImage : '',
      /** Shorter social / Open Graph title; falls back to `title` in the generator when empty. */
      shareTitle:
        typeof fm.shareTitle === 'string' && fm.shareTitle.trim() !== '' ? fm.shareTitle.trim() : '',
      canonicalUrl: typeof fm.canonicalUrl === 'string' ? fm.canonicalUrl : '',
    },
    html,
    rawBody: content,
  }
}

/**
 * @param {string} tag
 */
export const slugifyTag = (tag) => {
  const s = String(tag)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'tag'
}
