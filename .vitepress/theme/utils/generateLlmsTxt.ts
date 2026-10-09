import type { SiteConfig } from 'vitepress'
import type { ProjectItem, ProjectLink, ThemeConfig } from '#theme/types'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import matter from 'gray-matter'
import { hasMarkdownCopy, markdownCopyPath } from './llmsPaths'

/** 带有该 tag 的项目会在描述后注明，避免 agent 向用户推荐已停止维护的项目 */
const DEPRECATED_TAG = '停止维护'

type SiteData = SiteConfig<ThemeConfig>['site']

interface Article {
  title: string
  description: string
  date: string
  year: string
  /** Markdown 原文地址，形如 `https://in-x.cc/blog/foo.md` */
  mdUrl: string
  /** 去掉 frontmatter 的正文 */
  body: string
  /** 源文件的 frontmatter 原文（含 `---` 分隔线），原样保留给消费方 */
  rawFrontmatter: string
  /** 写进 outDir 的相对路径（`blog/foo.md`，v2 规范的「替换扩展名」形式） */
  mdPath: string
}

/**
 * 生成 llms.txt 与每篇文章的 Markdown 原文副本。
 *
 * 遵循 llmstxt.org v2：只用 H2 分节，且分节内只放 `- [name](url): 说明` 链接行
 * （参考实现按 `^##` 切分后逐行按链接解析，混入 H3 或段落会直接失败）。
 * 不生成 llms-full.txt：它不在规范里，全量 dump 反而稀释上下文。
 */
export async function generateLlmsTxt({ srcDir, pages, outDir, site, sitemap, logger }: SiteConfig<ThemeConfig>) {
  if (!sitemap?.hostname) {
    throw new Error('Please provide a sitemap hostname.')
  }

  const hostname = sitemap.hostname.replace(/\/$/, '')
  const articles = await loadArticles({ srcDir, pages, hostname })

  await writeArticles(outDir, articles)
  await writeFile(resolve(outDir, 'llms.txt'), withBom(renderIndex(site, hostname, articles)), 'utf-8')

  logger.info(`✓ generating llms.txt (${articles.length} articles)...`)
}

/**
 * 纯文本没有带内编码声明机制，BOM 是与宿主无关的 UTF-8 信号（v2 规范允许）。
 * 注意：不剥离 BOM 的解析器会把首个 `#` 标题当成普通段落。
 */
function withBom(content: string): string {
  return `\uFEFF${content}`
}

/** 用 VitePress 解析出的页面列表筛文章（buildEnd 拿到的 `pages` 只有路径，正文得自己读） */
async function loadArticles({ srcDir, pages, hostname }: {
  srcDir: string
  pages: string[]
  hostname: string
}): Promise<Article[]> {
  const articlePages = pages.filter(hasMarkdownCopy)

  const articles = await Promise.all(articlePages.map(async (page) => {
    const raw = await readFile(resolve(srcDir, page), 'utf-8')
    const { data, content } = matter(raw)

    const fileName = page.split('/').pop() ?? page
    const title = String(data.title ?? '').trim() || fileName.replace(/\.md$/, '')
    const date = normalizeDate(data.date)
    const mdUrl = new URL(markdownCopyPath(page), hostname).href

    return {
      title,
      description: String(data.description ?? '').trim(),
      date,
      year: date.slice(0, 4) || '未标注年份',
      mdUrl,
      body: content.trim(),
      rawFrontmatter: extractFrontmatter(raw),
      mdPath: page,
    } satisfies Article
  }))

  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

/** 从源文本原样切出 frontmatter 块（gray-matter 的 `file.matter` 在构建期取不到） */
function extractFrontmatter(raw: string): string {
  return raw.match(/^---\r?\n[\s\S]*?\r?\n---/)?.[0] ?? ''
}

/** 未加引号的 YAML 日期会被解析成 Date，统一成 `YYYY-MM-DD` */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value ?? '').trim()
}

async function writeArticles(outDir: string, articles: Article[]) {
  await Promise.all(articles.map(async (article) => {
    const filePath = resolve(outDir, article.mdPath)
    // 源 frontmatter 原样搬过来，不重新序列化
    const frontmatter = article.rawFrontmatter ? `${article.rawFrontmatter}\n\n` : ''

    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, withBom(`${frontmatter}# ${article.title}\n\n${article.body}\n`), 'utf-8')
  }))
}

function renderIndex(site: SiteData, hostname: string, articles: Article[]): string {
  const projectLines = (site.themeConfig.projects?.items ?? [])
    .map(renderProject)
    .filter(line => line !== undefined)

  const sections: string[] = [
    `# ${site.title}`,
    '',
    `> ${oneLine(site.description)}`,
    '',
    `本站内容为个人博客文章与开源项目，共 ${articles.length} 篇文章。以下链接均指向可直接抓取的 Markdown 原文。`,
    '',
  ]

  sections.push(
    '## 博客',
    '',
    `> [博客 RSS 订阅](${hostname}/rss.xml)`,
    '',
  )

  for (const [year, list] of groupByYear(articles)) {
    sections.push(
      `### ${year}`,
      '',
      ...list.map(renderArticle),
      '',
    )
  }

  if (projectLines.length > 0) {
    sections.push(
      '## 项目',
      '',
      ...projectLines,
      '',
    )
  }

  return sections.join('\n')
}

function renderArticle(article: Article): string {
  const description = oneLine(article.description)
  return `- [${escapeLinkText(article.title)}](${article.mdUrl})${description ? `: ${description}` : ''}`
}

/** 项目优先链线上主页，退而求其次链仓库 */
function resolveProjectLink(project: ProjectItem): ProjectLink | undefined {
  return project.links.find(link => link.type === 'home')
    ?? project.links.find(link => link.type === 'github')
    ?? project.links[0]
}

function renderProject(project: ProjectItem): string | undefined {
  const link = resolveProjectLink(project)
  if (!link) {
    return undefined
  }

  const description = oneLine(project.description)
  const deprecated = project.tag === DEPRECATED_TAG ? '（已停止维护）' : ''
  const notes = `${description}${deprecated}`

  return `- [${escapeLinkText(project.title)}](${escapeLinkUrl(link.url)})${notes ? `: ${notes}` : ''}`
}

function groupByYear(articles: Article[]): [string, Article[]][] {
  const groups = new Map<string, Article[]>()

  for (const article of articles) {
    const list = groups.get(article.year) ?? []
    list.push(article)
    groups.set(article.year, list)
  }

  const entries: [string, Article[]][] = []
  groups.forEach((list, year) => entries.push([year, list]))

  return entries.sort(([a], [b]) => b.localeCompare(a))
}

function oneLine(text: string | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim()
}

function escapeLinkText(text: string): string {
  return text.replace(/([[\]\\])/g, '\\$1')
}

function escapeLinkUrl(url: string): string {
  return url.replace(/[()]/g, char => encodeURIComponent(char))
}
