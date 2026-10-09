/** llms.txt 生成器与页面 head 注入共用的路径规则，避免两处判断漂移 */

/** 只有该目录下的页面会进入 llms.txt，并拥有 Markdown 原文副本 */
export const ARTICLE_DIR = 'blog'

/** 该页面是否存在 Markdown 原文副本（列表页、首页等没有） */
export function hasMarkdownCopy(relativePath: string): boolean {
  return relativePath.startsWith(`${ARTICLE_DIR}/`)
    && relativePath.endsWith('.md')
    && !relativePath.endsWith('/index.md')
}

/** Markdown 原文的路径，形如 `/blog/mac-launchd.md` */
export function markdownCopyPath(relativePath: string): string {
  return `/${relativePath}`
}
