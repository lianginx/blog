import type { NavItem, ProjectItem, ThemeConfig } from '#types/theme'
import type { IRaw } from '#utils/generateRss'
import type { PageData, SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { generateRss } from '#utils/generateRss'
// @ts-expect-error 没有相关类型
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
    projects: { items: projectItems() },
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

function projectItems(): ProjectItem[] {
  return [
    {
      title: 'jd-product-unit-price',
      description: '在京东购物车页面自动识别猫粮、大米、小米等粮食类商品，并根据标题中的重量信息计算单价，便于横向比较不同商品的价格。',
      tag: '浏览器脚本',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/browser-script/tree/master/jd-product-unit-price' },
      ],
    },
    {
      title: 'homebrew-search',
      description: '简洁美观的 Homebrew Cask / Formula 快速搜索工具，支持深色模式与响应式布局。',
      tag: '工具',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/homebrew-search' },
        { type: 'home', url: 'https://brew.in-x.cc' },
      ],
    },
    {
      title: 'capslock-yes',
      description: 'Karabiner-Elements 键位映射规则，将 CapsLock 变为功能键，扩展基于 CapsLock 的快捷键组合。',
      tag: '工具',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/capslock-yes' },
      ],
    },
    {
      title: 'crontab',
      description: '面向中文用户的 Cron 表达式可视化工具，支持中文解析与执行时间预览，灵感来源于 crontab.guru。',
      tag: '工具',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/crontab' },
        { type: 'home', url: 'https://crontab.in-x.cc' },
      ],
    },
    {
      title: 'steam-screenshot-downloader',
      description: '用于批量下载 Steam 截图的 Python 工具，支持指定用户与保存路径配置。',
      tag: '工具',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/steam-screenshot-downloader' },
      ],
    },
    {
      title: 'chatgpt-vue',
      description: '基于 Vue 3 + TypeScript + Tailwind CSS 实现的纯前端 ChatGPT 对话应用，支持连续对话与流式输出。',
      tag: '停止维护',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/chatgpt-vue' },
        { type: 'home', url: 'https://chatgpt-vue-liang-n.vercel.app' },
      ],
    },
    {
      title: 'chatgpt-nuxt',
      description: '基于 Nuxt.js 的 ChatGPT 类项目，支持 OpenAI 与 Azure API 切换，具备黑暗模式与中英日多语言支持。',
      tag: '停止维护',
      links: [
        { type: 'github', url: 'https://github.com/lianginx/chatgpt-nuxt' },
      ],
    },
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
