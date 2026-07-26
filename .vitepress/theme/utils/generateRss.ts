import type { ThemeConfig } from '#theme/types'
import type { SiteConfig } from 'vitepress'
import { readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Feed } from 'feed'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

export async function generateRss({ site, outDir, sitemap, logger }: SiteConfig<ThemeConfig>) {
  if (!sitemap?.hostname) {
    throw new Error('Please provide a sitemap hostname.')
  }

  // 获取文章列表
  const blogFolderPath = resolve(__dirname, '../../../docs/blog')
  const posts = (await readdir(blogFolderPath))
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const path = resolve(blogFolderPath, fileName)
      const { data, content } = matter.read(path)

      const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
      const htmlContent = md.render(content)

      const postFileName = path.split('/')?.at(-1)?.replace('.md', '')
      const url = new URL(`/blog/${postFileName}`, sitemap.hostname).href

      return {
        frontmatter: data,
        content: htmlContent,
        url,
      }
    })
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
    .slice(0, 20)

  // 构建 Feed XML
  const feed = new Feed({
    title: site.title!,
    description: site.description!,
    id: sitemap.hostname,
    link: sitemap.hostname,
    feed: new URL('/rss.xml', sitemap.hostname).href,
    updated: new Date(),
    author: {
      name: 'Liang',
      email: 'liang@in-x.cc',
      link: sitemap.hostname,
    },
  })

  for (const item of posts) {
    feed.addItem({
      title: item.frontmatter.title,
      id: item.url,
      link: item.url,
      date: new Date(item.frontmatter.date),
      description: item.frontmatter.description,
      content: item.content,
    })
  }

  // 保存文件
  await writeFile(resolve(outDir, 'rss.xml'), feed.atom1(), 'utf-8')

  logger.info('✓ generating rss...\n')
}
