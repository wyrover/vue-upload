<template>
  <span>
    <img
      :style="{ height: height + 'px', width: width + 'px' }"
      :class="{ 'rounded': rounded, 'circle': circle }"
      :src="gravatar"
      alt="Gravatar for {{ email }}"
      title="Gravatar for {{ email }}">
  </span>
</template>

<script>
  var MD5 = require('crypto-js/md5')
  export default {
    computed: {
      'gravatar' () {
        if (this.email && this.email.length) {
          return `http://www.gravatar.com/avatar/${this.hash}`
        }
      },
      'hash' () {
        return MD5(this.email)
      }
    },
    data () {
      return {
        types: ['identicon', 'mm', 'wavatar', 'retro', 'blank']
      }
    },
    props: {
      'email': { type: String, default: 'example@example.com', required: true },
      'type': { type: String, default: false, required: false },
      'height': { type: Number, default: 80, required: false },
      'width': { type: Number, default: 80, required: false },
      'rounded': { type: Boolean, default: false, required: false },
      'circle': { type: Boolean, default: false, required: false }
    }
  }
</script>
