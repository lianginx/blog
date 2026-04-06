export interface ThemeConfig {
  nav?: NavConfig
  projects?: ProjectsConfig
  footbar?: FootbarConfig
}

export interface NavConfig {
  items?: NavItem[]
  github?: string
  x?: string
  mastodon?: string
}

export interface NavItem {
  title: string
  link: string
  activeMatch?: string
}

export interface ProjectsConfig {
  items?: ProjectItem[]
}

export interface ProjectItem {
  title: string
  description: string
  links: ProjectLink[]
  tag: string
}

export interface ProjectLink {
  type: 'github' | 'npm' | 'home'
  url: string
}

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
