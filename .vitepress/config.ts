import type { PageData, SiteConfig } from 'vitepress'
import type { NavItem, ThemeConfig } from './theme/types/theme'
import type { IRaw } from './theme/utils/generateRss'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
// @ts-expect-error vitepress is not typed
import markdownItTextualUml from 'markdown-it-textual-uml'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { generateRss } from './theme/utils/generateRss'

const SITE_URL = 'https://in-x.cc'

export default defineConfig<ThemeConfig>({
  title: 'Liang\'s Blog',
  description: 'Liang\'s Blog',
  srcDir: 'docs',
  lang: 'zh-CN',
  lastUpdated: true,
  sitemap: { hostname: SITE_URL },
  markdown: {
    config: (md) => { md.use(markdownItTextualUml) },
  },
  vite: { plugins: [UnoCSS()] },
  transformPageData(pageData) {
    transformToRaw(pageData)
  },
  buildEnd(siteConfig) {
    rss(siteConfig)
  },
  themeConfig: {
    nav: nav(),
    footbar: {
      showVitePress: true,
      items: [
        { title: 'GitHub', link: 'https://github.com/lianginx' },
        { title: 'X/Twitter', link: 'https://x.com/Niujunliang' },
        { title: `2021-${new Date().getFullYear()} © Liang` },
      ],
    },
  },
})

function nav(): NavItem[] {
  return [
    { title: 'Blog', link: '/blog', activeMatch: '/blog/' },
    { title: 'Photos', link: '/photos', activeMatch: '/photos/' },
  ]
}

// Generate RSS feed
const pages: IRaw[] = []
function transformToRaw({
  title,
  description,
  frontmatter,
  relativePath,
}: PageData) {
  if (relativePath.startsWith('blog/')) {
    pages.push({
      title,
      description: description || title,
      date: frontmatter.date,
      link: relativePath,
    })
  }
}
function rss({ site, outDir }: SiteConfig<ThemeConfig>) {
  const rss = generateRss({
    limit: 20,
    pages,
    site: {
      title: site.title,
      url: SITE_URL,
      description: site.description,
      lang: site.lang,
    },
  })

  writeFileSync(resolve(outDir, 'rss.xml'), rss, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('✓ generating rss...\n')
}
