import Vue from 'vue'

import './vue/Config'
import './vue/Filters'
import './vue/Transitions'
import './vue/Directives'

// Example json loading
var contentAreas = require('./data/contentAreas.json')

import App from './App'
import Files from './components/Files/Files'
import Upload from './components/Files/Upload'
import Gallery from './components/Files/Gallery'

var VueRouter = require('vue-router')

Vue.use(VueRouter)

var router = new VueRouter()

var Progress = require('vue-progressbar')

Vue.use(Progress)

router.map({
  '/files': { component: Files },
  '/upload': { component: Upload },
  '/gallery': { component: Gallery }
})

router.start(App, '#app')
