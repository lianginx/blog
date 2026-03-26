import type { NavItem, PhotoItem, ThemeConfig } from './theme/types/theme'
// @ts-expect-error vitepress is not typed
import markdownItTextualUml from 'markdown-it-textual-uml'
import UnoCSS from 'unocss/vite'
import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Liang\'s Blog',
  description: 'Liang\'s Blog',
  srcDir: 'docs',
  lang: 'zh-CN',
  lastUpdated: true,
  sitemap: { hostname: 'https://blog.in-x.cc' },
  markdown: {
    config: md => md.use(markdownItTextualUml),
  },
  vite: { plugins: [UnoCSS()] },
  themeConfig: {
    nav: nav(),
    photo: { base: 'photos', items: photoItems() },
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

function photoItems(): PhotoItem[] {
  return [
    { date: '2025-03-21', src: '/images/photos/photo-1.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-2.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-3.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-4.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-5.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-6.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-7.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-8.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-9.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-10.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-11.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-12.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-13.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-14.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-15.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-16.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-17.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-18.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-19.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-20.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-21.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-22.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-23.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-24.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-25.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-26.jpg' },
    { date: '2025-03-21', src: '/images/photos/photo-27.jpg' },
  ]
}
