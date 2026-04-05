// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import HomeLayout from '#components/HomeLayout.vue'
import ListBlog from '#components/ListBlog.vue'
import ListPhoto from '#components/ListPhoto.vue'
import ListProject from '#components/ListProject.vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

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
      .component('ListProject', ListProject)
  },
} satisfies Theme
