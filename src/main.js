import Vue from 'vue'
import './vue/Config.js'
import './vue/Filters.js'
import './vue/Transitions.js'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  ready () {
    var self = this
    // this.fetch()
    // Interceptors (middleware)
    Vue.http.interceptors.push({
      request: function (request) {
        console.log('req')
        self.$broadcast('progress-start')
        return request
      },
      response (response) {
        if (response.ok) {
          self.$broadcast('progress-stop')
        } else {
          self.$broadcast('progress-fail')
        }
        console.log('res')

        return response
      }
    })
  },
  events: {
    'messenger-notify' (message) {
      this.$broadcast('messenger-notify', message)
    },
    'messenger-options' (options) {
      this.$broadcast('messenger-options', options)
    },
    'close-modal' () {
      this.$broadcast('close-modal')
    }
  }
})
