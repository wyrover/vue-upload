var Vue = require('vue')
Vue.use(require('vue-resource')) // https://github.com/vuejs/vue-resource

import createLogger from '../middlewares/logger'

// Config
Vue.http.options.root = '/'

// Legacy servers config
Vue.http.options.emulateJSON = false
Vue.http.options.emulateHTTP = false

// Common, global HTTP headers
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
Vue.http.headers.common['Set-Cookie'] = 'XDEBUG_SESSION=PHPSTORM'

// Interceptors
Vue.http.interceptors.push({
  request (request) {
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
