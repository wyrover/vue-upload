import Vue from 'vue'
import App from './App'
import Pages from './components/Pages'
import Content from './components/Content'
import './vue/Config'
import './vue/Filters'
import './vue/Transitions'

var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/pages': { component: Pages },
  '/content': { component: Content }
})

router.start(App, '#app')
