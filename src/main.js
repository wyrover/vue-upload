import Vue from 'vue'
import './vue/Config.js'
import './vue/Filters.js'
import './vue/Transitions.js'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
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
