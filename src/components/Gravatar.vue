<template>
    <img
      :style="{ height: height + 'px', width: width + 'px' }"
      :class="{ 'rounded': rounded, 'circle': circle }"
      :src="gravatar"
      alt="Gravatar for {{ email }}"
      title="Gravatar for {{ email }}">
  </span>
</template>

<script>
  import DimensionProps from '../mixins/DimensionProps'
  import ShapeProps from '../mixins/ShapeProps'
  import StateProps from '../mixins/StateProps'
  var MD5 = require('crypto-js/md5')
  export default {
    mixins: [DimensionProps, ShapeProps, StateProps],
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
    ready () {
    },
    methods: {
      hash (string) {
        return MD5(string).toString()
      }
    }
  }
</script>
