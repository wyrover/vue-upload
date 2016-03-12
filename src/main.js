import Vue from 'vue'

import './vue/Config'
import './vue/Filters'
import './vue/Transitions'

// Example json loading
var contentAreas = require('./data/contentAreas.json')

import App from './App'
import Files from './components/Files/Files'

var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/': { component: Files }
})

router.start(App, '#app')
