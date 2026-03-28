import type { NavItem, ThemeConfig } from './theme/types/theme'
// @ts-expect-error vitepress is not typed
import markdownItTextualUml from 'markdown-it-textual-uml'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig<ThemeConfig>({
  title: 'Liang\'s Blog',
  description: 'Liang\'s Blog',
  srcDir: 'docs',
  lang: 'zh-CN',
  lastUpdated: true,
  sitemap: { hostname: 'https://blog.in-x.cc' },
  markdown: {
    config: (md) => { md.use(markdownItTextualUml) },
  },
  vite: { plugins: [UnoCSS()] },
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
