export interface FriendsConfig {
  items?: FriendItem[]
}

export interface FriendItem {
  name: string
  link: string
  desc?: string
  avatar?: string
}
