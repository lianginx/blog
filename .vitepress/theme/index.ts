// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import Layout from '#layouts/Layout.vue'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme
