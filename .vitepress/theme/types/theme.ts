export interface ThemeConfig {
  nav?: NavItem[]
  blog?: BlogConfig
  photo?: PhotoConfig
  footbar?: FootbarConfig
}

export interface NavItem {
  title: string
  link: string
  activeMatch?: string
}

export interface BlogConfig {
  homeLimit?: number
}

export interface BlogItem {
  url: string
  frontmatter: {
    title: string
    date: string
  }
}

export interface PhotoConfig {
  base: string
  homeLimit?: number
  items?: PhotoItem[]
}

export interface PhotoItem {
  src: string
  date: string
}

export interface FootbarConfig {
  showVitePress: boolean
  items?: FootbarItem[]
}

export interface FootbarItem {
  title: string
  link?: string
}
