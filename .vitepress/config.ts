import type { NavItem, ThemeConfig } from '#types/theme'
import type { IRaw } from '#utils/generateRss'
import type { PageData, SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { generateRss } from '#utils/generateRss'
import markdownItTextualUml from 'markdown-it-textual-uml'
import UnoCSS from 'unocss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitepress'

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
  vite: {
    plugins: [
      UnoCSS(),
      tsconfigPaths({ loose: true }),
    ],
  },
  transformPageData(pageData) {
    transformToRaw(pageData)
  },
  buildEnd(siteConfig) {
    rss(siteConfig)
  },
  themeConfig: {
    nav: {
      items: navItems(),
      github: 'https://github.com/lianginx',
      mastodon: 'https://elk.zone/m.cmx.im/@lianginx',
      x: 'https://x.com/Niujunliang',
    },
    footbar: {
      showVitePress: true,
      items: [
        { title: `2021-${new Date().getFullYear()} © Liang` },
      ],
    },
  },
})

function navItems(): NavItem[] {
  return [
    { title: 'Blog', link: '/blog', activeMatch: '/blog/' },
    { title: 'Projects', link: '/projects' },
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
