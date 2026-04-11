import type { BlogItem } from '#types'
import { createContentLoader } from 'vitepress'

declare const data: BlogItem[]
export { data }

export default createContentLoader('blog/*.md', {
  transform(rawData) {
    return rawData.sort((a, b) => {
      const dateA = String(a.frontmatter?.date || '')
      const dateB = String(b.frontmatter?.date || '')
      return dateB.localeCompare(dateA)
    })
  },
})
