import ENV from '../.env'

var Vue = require('vue')
Vue.use(require('vue-resource')) // https://github.com/vuejs/vue-resource

import {Regex} from '../vue/Regex'
import {router} from '../main'
import createLogger from '../middlewares/logger'

// Config
Vue.http.options.root = '/'

// Legacy servers config
Vue.http.options.emulateJSON = false
Vue.http.options.emulateHTTP = false

// HTTP Interceptors
Vue.http.interceptors.push({
  request (request) {
    // Set the Authorization header from the JWT on localStorage
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
    Vue.http.headers.common['App-Key'] = ENV.APP_KEY

    if (ENV.DEBUG) {
      // Set Xdebug key
      request.params.XDEBUG_SESSION_START = 'vagrant'
    }

    return request
  },
  response (response) {
    // todo: ensure synchronous
    // if (response.status === 401 || response.status === 400) {
    //   // Remove the token, could not authorize
    //   console.log('should remove token')
    //   localStorage.removeItem('id_token')
    // }
    if (response.headers()) {
      var headers = response.headers()
      var authorization = headers.authorization
    }
    if (authorization) {
      var token = authorization.split(Regex.HTTP_AUTH_BEARER_TOKEN).pop()
    }
    if (token) {
      localStorage.setItem('id_token', token)
      localStorage.setItem('time', new Date())
    }

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
