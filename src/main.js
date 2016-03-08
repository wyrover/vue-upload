import Vue from 'vue'

import './vue/Config'
import './vue/Filters'
import './vue/Transitions'

import App from './App'
import Pages from './components/Pages/Pages'
import Content from './components/Content'
import Glossary from './components/Glossary/Glossary'
import Menus from './components/Menus/Menus'

var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/pages': { component: Pages },
  '/content': { component: Content },
  '/glossary': { component: Glossary },
  '/menus': { component: Menus }
})

router.start(App, '#app')
