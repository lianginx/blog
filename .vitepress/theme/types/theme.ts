export interface ThemeConfig {
  nav?: NavItem[]
  footbar?: FootbarConfig
}

export interface NavItem {
  title: string
  link: string
  activeMatch?: string
}

export interface BlogItem {
  url: string
  frontmatter: {
    title: string
    date: string
  }
}

export interface FootbarConfig {
  showVitePress: boolean
  items?: FootbarItem[]
}

export interface FootbarItem {
  title: string
  link?: string
}

export interface PhotoItem {
  src: string
  date: string
  blurhash?: string
}
