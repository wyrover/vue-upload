<template>
  <span
    :class="{
      'hint--top': placement === 'top',
      'hint--left': placement === 'left',
      'hint--right': placement === 'right',
      'hint--bottom': placement === 'bottom',
      'hint--error': level === 'error',
      'hint--warning': level === 'warning',
      'hint--info': level === 'info',
      'hint--success': level === 'success'
    }"
    class="hint--rounded"
    data-hint="{{{ show ? hint : '' }}}">
      <slot name="html">{{{ html }}}</slot>
      <slot name="text">{{ text }}</slot>
  </span>
</template>

<script type="text/babel">
  import 'hint.css/hint.css'
  export default {
    props: {
      hint: { type: String },
      text: { type: String, required: false },
      html: { type: String, required: false },
      placement: { type: String, required: false, default () { return 'top' } },
      level: { type: String, required: false, default () { return 'info' } },
      muted: { type: Boolean, required: false, default: true }
    },
    data () {
      return {
        index: 0,
        show: true,
        animation: { type: String, required: true }
      }
    },
    events: {
      'show-tooltips' (state) {
        this.$set('show', state)
      }
    }
  }
</script>
