<template>
  <img
    :src="gravatar"
    alt="Gravatar for {{ email }}"
    title="Gravatar for {{ email }}"
    :style="{ height: height + 'px', width: width + 'px' }"
    :class="{ 'rounded': rounded, 'circle': circle, 'muted': highlight }">
</template>

<script>
  var MD5 = require('crypto-js/md5')

  import DimensionMixin from '../mixins/Dimension'
  import StateMixin from '../mixins/State'
  import StyleMixin from '../mixins/Style'

  export default {
    mixins: [DimensionMixin, StyleMixin, StateMixin],
    computed: {
      'gravatar' () {
        if (this.email && this.email.length) {
          return `http://www.gravatar.com/avatar/${this.hash(this.email)}`
        }
      },
      'highlight' () {
        if (this.email === this.highlightUser) {
          return true
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
      'showChangedNotification': { type: Boolean, default: false, required: false },
      'highlight-user': { type: String, required: false }
    },
    methods: {
      hash (string) {
        return MD5(string).toString()
      }
    }
  }
</script>
