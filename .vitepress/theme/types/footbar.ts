export interface FootbarConfig {
  showVitePress: boolean
  items?: FootbarItem[]
}

export interface FootbarItem {
  title: string
  link?: string
}
