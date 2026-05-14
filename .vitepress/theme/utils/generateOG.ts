import type { PageData, TransformPageContext } from 'vitepress'

export function generateOG(pageData: PageData, { siteConfig }: TransformPageContext) {
  const title = pageData.frontmatter.title || pageData.title || siteConfig.site.title
  const description = pageData.frontmatter.description || pageData.description || siteConfig.site.description
  const url = `${siteConfig.sitemap?.hostname}/${pageData.relativePath}`.replace(/index\.md$/, '').replace(/\.md$/, '.html')
  const image = `${siteConfig.sitemap?.hostname}/favicon.ico`

  // 页面标题由 VitePress 自动管理
  // 页面描述配置为文章简介
  pageData.description = description

  pageData.frontmatter.head ??= []
  pageData.frontmatter.head.push(
    // Open Graph
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    // Twitter Cards
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
  )
}
