<template>
  <button
    class="btn animated shadow"
    id="{{ id }}"
    :class="[
      transition ? transition : '',
      primary ? 'btn-primary' : '',
      border ? 'btn-outline' : '',
      color ? color : '',
      bgColor ? bgColor : '',
      borderColor ? borderColor : '',
      circle ? 'circle' : '',
      rounded ? 'rounded' : '',
      roundedTop ? 'rounded-top' : '',
      roundedRight ? 'rounded-right' : '',
      roundedBottom ? 'rounded-bottom' : '',
      roundedLeft ? 'rounded-left' : '',
      borderTop ? 'border-top' : '',
      borderRight ? 'border-right' : '',
      borderBottom ? 'border-bottom' : '',
      borderLeft ? 'border-left' : '',
    ]"
    :disabled="disabled"
    transition="transition">
      {{{ html }}}
       {{ text }}
  </button>
</template>

<script>
  import DimensionMixin from '../mixins/Dimension'
  import StateMixin from '../mixins/State'
  import StyleMixin from '../mixins/Style'
  import ColorMixin from '../mixins/Color'

  export default {
    componentName: 'Dynamic button',
    mixins: [DimensionMixin, StateMixin, StyleMixin, ColorMixin],
    data () {
      return {
        presets: ['primary', 'secondary', 'tertiary', 'info']
      }
    },
    props: {
      'id': { type: String, default: null, required: false },
      'show': { type: Boolean, default: true, required: false },
      'html': { type: String, default: null, required: false },
      'text': { type: String, default: null, required: false }
    },
    ready () {
      if (this.text && this.html) {
        this.warnAgainstUsingTextAndHtml()
      }
    },
    methods: {
      warnAgainstUsingTextAndHtml () {
        console.log(`'%c - Warning - use either :text or :html properties in ${this.$options.componentName} components, not both.`, 'background: #000; color: yellow')
      }
    }
  }
</script>

<style scoped>
 :disabled { cursor: not-allowed; }
 .shadow {
   /*box-shadow: 5px 14px 68px 18px;*/
 }
</style>
