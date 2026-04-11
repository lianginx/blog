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
