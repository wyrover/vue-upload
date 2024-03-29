var Vue = require('vue')

// http://vuejs.org/guide/transitions.html

// Animate.css transitions
Vue.transition('bounce', { enterClass: 'bounceIn', leaveClass: 'bounceOut' })
Vue.transition('fade', { enterClass: 'fadeIn', leaveClass: 'fadeOut' })

Vue.transition('stagger', {
  stagger: function (index) {
    // increase delay by 50ms for each transitioned item,
    // but limit max delay to 300ms
    return Math.min(300, index * 50)
  }
})
