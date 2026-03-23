import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createElement as h } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..', '..')
const notoDir = path.join(repoRoot, 'node_modules', '@fontsource', 'noto-sans', 'files')

const W = 1200
const H = 630

/** Latin first in both the CSS stack and registration: digits, punctuation, and Latin author names resolve from `Noto Sans`; Greek letters fall through to `Noto Sans Greek`. Greek-first stacks break ASCII in Satori when Greek subsets are tried first. */
const FONT_STACK = 'Noto Sans, Noto Sans Greek'

/** @type {import('satori').SatoriOptions['fonts'] | null} */
let cachedFonts = null

const loadFonts = () => {
  if (cachedFonts) return cachedFonts

  const weights = [
    {
      weight: /** @type {const} */ (400),
      latin: 'noto-sans-latin-400-normal.woff',
      latinExt: 'noto-sans-latin-ext-400-normal.woff',
      greek: 'noto-sans-greek-400-normal.woff',
      greekExt: 'noto-sans-greek-ext-400-normal.woff',
    },
    {
      weight: /** @type {const} */ (700),
      latin: 'noto-sans-latin-700-normal.woff',
      latinExt: 'noto-sans-latin-ext-700-normal.woff',
      greek: 'noto-sans-greek-700-normal.woff',
      greekExt: 'noto-sans-greek-ext-700-normal.woff',
    },
  ]

  /** @type {import('satori').SatoriOptions['fonts']} */
  const fonts = []

  const push = (name, file, w) => {
    fonts.push({
      name,
      data: readFileSync(path.join(notoDir, file)),
      weight: w,
      style: 'normal',
    })
  }

  for (const spec of weights) {
    const { weight: w } = spec
    push('Noto Sans', spec.latin, w)
    push('Noto Sans', spec.latinExt, w)
    push('Noto Sans Greek', spec.greek, w)
    push('Noto Sans Greek', spec.greekExt, w)
  }

  cachedFonts = fonts
  return fonts
}

/**
 * @param {string} text
 * @param {number} max
 */
const clip = (text, max) => {
  const s = String(text).replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return `${s.slice(0, max - 1).trimEnd()}…`
}

/**
 * @param {{
 *   locale: 'en'|'el'
 *   title: string
 *   description: string
 *   authorName: string
 *   dateIso: string
 * }} opts
 * @returns {Promise<Buffer>}
 */
export const renderArticleOgPng = async (opts) => {
  const { locale, title, description, authorName, dateIso } = opts
  const label = locale === 'el' ? 'Άρθρο' : 'Article'
  const dateLabel = new Date(dateIso).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const titleText = clip(title, 200)
  const descText = clip(description, 240)
  const titleFontSize = titleText.length > 100 ? 38 : titleText.length > 72 ? 44 : titleText.length > 52 ? 50 : 56

  const tree = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(152deg, #050B14 0%, #0f172a 42%, #172554 100%)',
        padding: 64,
        fontFamily: FONT_STACK,
        position: 'relative',
      },
    },
    [
      h('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height: '100%',
          background: '#2563eb',
        },
      }),
      h(
        'div',
        {
          style: {
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#64748b',
            fontWeight: 700,
            marginLeft: 16,
          },
        },
        label,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            flexShrink: 1,
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: 16,
            maxWidth: 1080,
          },
        },
        [
          h(
            'div',
            {
              style: {
                fontSize: titleFontSize,
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
              },
            },
            titleText,
          ),
        ],
      ),
      h(
        'div',
        {
          style: {
            marginTop: 28,
            marginLeft: 16,
            fontSize: 22,
            color: '#94a3b8',
            lineHeight: 1.4,
            maxWidth: 1020,
            maxHeight: 96,
            overflow: 'hidden',
          },
        },
        descText,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 36,
            marginLeft: 16,
            paddingTop: 24,
            borderTop: '1px solid rgba(148, 163, 184, 0.28)',
          },
        },
        [
          h(
            'span',
            {
              style: {
                fontSize: 20,
                color: '#e2e8f0',
                fontWeight: 700,
                fontFamily: 'Noto Sans',
              },
            },
            authorName,
          ),
          h(
            'span',
            {
              style: {
                fontSize: 18,
                color: '#64748b',
                fontWeight: 400,
                fontFamily: FONT_STACK,
              },
            },
            dateLabel,
          ),
        ],
      ),
    ],
  )

  const svg = await satori(tree, {
    width: W,
    height: H,
    fonts: loadFonts(),
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
  })
  const pngData = resvg.render()
  return pngData.asPng()
}
