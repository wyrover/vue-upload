/* http://vuejs.org/guide/transitions.html */

var Vue = require('vue')

// Animate.css transitions
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})

Vue.transition('stagger', {
  stagger: function (index) {
    // increase delay by 50ms for each transitioned item,
    // but limit max delay to 300ms
    return Math.min(300, index * 50)
  }
})

console.log('transitions loaded')
