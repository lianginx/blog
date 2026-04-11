export interface TagItem {
  name: string
  count: number
}

export interface BlogItem {
  url: string
  frontmatter: {
    title: string
    date: string
    tags?: string[]
  }
}
