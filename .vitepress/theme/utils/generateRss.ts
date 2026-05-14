import type { ThemeConfig } from '#theme/types'
import type { SiteConfig } from 'vitepress'
import { readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

export async function generateRss({ site, outDir, sitemap, logger }: SiteConfig<ThemeConfig>) {
  if (!sitemap?.hostname) {
    throw new Error('Please provide a sitemap hostname.')
  }

  // 获取文章列表
  const blogFolderPath = resolve(__dirname, '../../../docs/blog')
  const postPaths = (await readdir(blogFolderPath))
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => resolve(blogFolderPath, fileName))

  // 格式化文章列表
  const posts = postPaths
    .map((path) => {
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

  // 生成 RSS XML 内容
  const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${sitemap.hostname}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.lang}</language>
    <atom:link href="${sitemap.hostname}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map(item => `
    <item>
      <title>${escapeXml(item.frontmatter.title)}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${new Date(item.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${item.content}]]></description>
    </item>`)}
  </channel>
</rss>`

  // 写入文件
  writeFile(resolve(outDir, 'rss.xml'), rssXML, 'utf-8')

  // 打印日志
  logger.info('✓ generating rss...\n')
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
