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
