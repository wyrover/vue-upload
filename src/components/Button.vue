<template>
  <button
    class="btn"
    :class="{
      'btn-primary': primary,
      'rounded': rounded,
      'circle': circle
    }"
    :disabled="disabled"
    transition="transition">
      {{{ html }}}
  </button>
</template>

<script>
  import DimensionProps from '../mixins/DimensionProps'
  import ShapeProps from '../mixins/ShapeProps'
  import StateProps from '../mixins/StateProps'
  export default {
    mixins: [DimensionProps, ShapeProps, StateProps],
    computed: {},
    data () {
      return {
        presets: []
      }
    },
    props: {
      'html': { type: String, default: '', required: false },
      'text': { type: String, default: '', required: false },
      'primary': { type: Boolean, default: true, required: false },
      'show': { type: Boolean, default: true, required: false },
      'transition': { type: String, default: 'bounce', required: false },
      'progress': { type: Boolean, default: false, required: false }
    },
    ready () {},
    methods: {},
    events: {}
  }
</script>

<style>
  :disabled { cursor: not-allowed; }
</style>
