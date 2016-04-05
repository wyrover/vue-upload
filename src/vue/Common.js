var Vue = require('vue')
Vue.use(require('vue-resource')) // https://github.com/vuejs/vue-resource

import {router} from '../main'
import {APP_KEY} from '../main'
import createLogger from '../middlewares/logger'

// Config
Vue.http.options.root = '/'

// Legacy servers config
Vue.http.options.emulateJSON = false
Vue.http.options.emulateHTTP = false

// Common, global HTTP headers
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

// HTTP Interceptors
Vue.http.interceptors.push({
  request (request) {
    // todo: check app key using middleware on back-end
    // If not this is not a GET request, attach the app key
    if (request.method !== 'get') {
      // Set the app key on each request
      request.data.app_key = APP_KEY
      // Set Xdebug key
      request.params.XDEBUG_SESSION_START = 'vagrant'
    }
    return request
  },
  response (response) {
    response.ok
      ? console.log(`%c - XHR success - [${response.request.method}] - ${response.request.url}`, 'background: #222; color: #bada55')
      : console.log(`%c - XHR failure - [${response.request.method}] - ${response.request.url}`, 'background: #222; color: #ff4136')
    return response
  }
})

// var resource = Vue.resource
var http = Vue.http

// Redirects
export function doRedirect (redirect) {
  if (redirect) {
    router.go(redirect)
  }
}

export default {
  fetch (url, data, options) {
    return http.get(url, data, options)
  },
  post (url, data, options) {
    return http.post(url, data, options)
  },
  put (url, data, options) {
    return http.put(url, data, options)
  },
  patch (url, data, options) {
    return http.patch(url, data, options)
  },
  destroy (url, data, options) {
    return http.delete(url, data, options)
  },
  jsonp (url, data, options) {
    return http.jsonp(url, data, options)
  }
}
