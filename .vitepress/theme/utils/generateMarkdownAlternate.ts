import type { PageData } from 'vitepress'
import { hasMarkdownCopy, markdownCopyPath } from './llmsPaths'

/**
 * 按 v2 推荐的 link relations，给有 Markdown 副本的文章页加
 * `rel="alternate" type="text/markdown"`；其它页面加会指向不存在的文件。
 */
export function generateMarkdownAlternate(pageData: PageData) {
  if (pageData.isNotFound || !hasMarkdownCopy(pageData.relativePath)) {
    return
  }

  pageData.frontmatter.head ??= []
  pageData.frontmatter.head.push([
    'link',
    { rel: 'alternate', type: 'text/markdown', href: markdownCopyPath(pageData.relativePath) },
  ])
}
