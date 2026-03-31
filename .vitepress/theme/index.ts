// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import HomeLayout from '#components/HomeLayout.vue'
import ListBlog from '#components/ListBlog.vue'
import ListPhoto from '#components/ListPhoto.vue'
import ProjectItem from '#components/ProjectItem.vue'
import Layout from '#layouts/Layout.vue'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app
      .component('HomeLayout', HomeLayout)
      .component('ListPhoto', ListPhoto)
      .component('ListBlog', ListBlog)
      .component('ProjectItem', ProjectItem)
  },
} satisfies Theme
