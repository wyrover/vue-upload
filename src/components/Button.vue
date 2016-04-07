<template>
  <button
    class="btn animated"
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
  import DimensionProps from '../mixins/DimensionProps'
  import StateProps from '../mixins/StateProps'
  import StyleProps from '../mixins/StyleProps'
  import ColorProps from '../mixins/ColorProps'

  export default {
    componentName: 'Dynamic button',
    mixins: [DimensionProps, StateProps, StyleProps, ColorProps],
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
      console.log(this.transition)

    },
    methods: {
      warnAgainstUsingTextAndHtml () {
        console.log(`'%c - Warning - use either :text or :html properties in ${this.$options.componentName} components, not both.`, 'background: #000; color: yellow')
      }
    }
  }
</script>

<style>
 :disabled { cursor: not-allowed; }
</style>
