// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import BackTop from './components/BackTop.vue'
import DialogPreviewImg from './components/dialog/PreviewImg.vue'
import FootBar from './components/FootBar.vue'
import HomeLayout from './components/HomeLayout.vue'
import IconClose from './components/icon/close.vue'
import IconSearch from './components/icon/search.vue'
import IconTop from './components/icon/top.vue'
import ListBlog from './components/ListBlog.vue'
import ListPhoto from './components/ListPhoto.vue'
import NavBar from './components/NavBar.vue'
import NotFound from './components/NotFound.vue'
import PhotoSection from './components/PhotoSection.vue'
import SquareTag from './components/SquareTag.vue'
import CustomLayout from './layouts/Layout.vue'
import LayoutDocContent from './layouts/LayoutDocContent.vue'

import './style.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app
      .component('HomeLayout', HomeLayout)
      .component('LayoutDocContent', LayoutDocContent)
      .component('BackTop', BackTop)
      .component('NavBar', NavBar)
      .component('FootBar', FootBar)
      .component('SquareTag', SquareTag)
      .component('ListBlog', ListBlog)
      .component('ListPhoto', ListPhoto)
      .component('PhotoSection', PhotoSection)
      .component('IconClose', IconClose)
      .component('IconSearch', IconSearch)
      .component('IconTop', IconTop)
      .component('DialogPreviewImg', DialogPreviewImg)
      .component('NotFound', NotFound)
  },
} satisfies Theme
