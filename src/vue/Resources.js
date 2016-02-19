var Vue = require('vue')
Vue.use(require('vue-resource')) // https://github.com/vuejs/vue-resource

// Config
Vue.http.options.root = '/'

// Legacy servers config
Vue.http.options.emulateJSON = false
Vue.http.options.emulateHTTP = false

// Common, global HTTP headers
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value')

// Init
// var resource = Vue.resource
var http = Vue.http

// Create Ajax object
export default {
  resources: {
    // terms    : resource(Vue.http.options.root + 'terms{/id}'),
    // taxonomy : resource(Vue.http.options.root + 'admin/taxonomy{/id}')
  },
  get (url, data, options) {
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

