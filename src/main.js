import Vue from 'vue'

export const APP_KEY = '789'

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
import Login from './components/Auth/Login'

import auth from './auth'
import invite from './invite'

var VueRouter = require('vue-router')
Vue.use(VueRouter)
export var router = new VueRouter()

var Progress = require('vue-progressbar')
Vue.use(Progress)

// Attempt to log in
if (auth.checkAuth()) {
  auth.decode(localStorage.getItem('id_token'))
}

// Use authenticated routes
router.map({
  '/files': { component: Files },
  '/upload': { component: Upload },
  '/gallery': { component: Gallery }
})

router.redirect({
  '*': '/upload'
})

router.start(App, '#app')
