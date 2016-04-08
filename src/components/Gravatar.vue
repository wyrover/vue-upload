<template>
  <img
    :src="gravatar"
    alt="Gravatar for {{ email }}"
    :style="{ height: height + 'px', width: width + 'px' }"
    :class="{ 'rounded': rounded, 'circle': circle }"
    title="Gravatar for {{ email }}">
</template>

<script>
  var MD5 = require('crypto-js/md5')

  import DimensionProps from '../mixins/DimensionProps'
  import StateProps from '../mixins/StateProps'
  import StyleProps from '../mixins/StyleProps'

  export default {
    mixins: [DimensionProps, StyleProps, StateProps],
    computed: {
      'gravatar' () {
        if (this.email && this.email.length) {
          return `http://www.gravatar.com/avatar/${this.hash(this.email)}`
        }
      }
    },
    data () {
      return {
        types: ['identicon', 'mm', 'wavatar', 'retro', 'blank']
      }
    },
    props: {
      'email': { type: String, required: true },
      'type': { type: String, default: false, required: false },
      'showChangedNotification': { type: Boolean, default: false, required: false }
    },
    ready () {},
    methods: {
      hash (string) {
        return MD5(string).toString()
      }
    }
  }
</script>
