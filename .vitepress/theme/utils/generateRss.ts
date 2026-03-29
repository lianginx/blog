export interface ISite {
  title: string
  url: string
  description: string
  lang: string
}

export interface IRaw {
  title: string
  description: string
  date: string
  link: string
}

export interface GenerateRssParams {
  site: ISite
  pages: IRaw[]
  limit: number
}

export function generateRss({ site, pages, limit }: GenerateRssParams) {
  const latestPosts = [...pages]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit)

  const items = handleItems(site, latestPosts)
  const rss = handleChannel(site, items)

  return rss
}

function handleChannel(site: ISite, items: string) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.lang}</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`
}

function handleItems(site: ISite, pages: IRaw[]) {
  return pages
    .map((post) => {
      const path = post.link.replace(/((^|\/)index)?\.md$/, '$2')
      const url = new URL(path, site.url).href
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || ''}]]></description>
    </item>`
    })
    .join('')
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
