<template>
  <button
    class="btn"
    :class="[
      transition.length ? 'animated': '',
      black, gray, silver, white, aqua, blue, navy, teal, green, olive, lime, yellow, orange, red, fuchsia, purple, maroon, darken1, darken2, darken3, darken4, lighten1, lighten2, lighten3, lighten4,
      bgBlack, bgGray, bgSilver, bgWhite, bgAqua, bgBlue, bgNavy, bgTeal, bgGreen, bgOlive, bgLime, bgYellow, bgOrange, bgRed, bgFuchsia, bgPurple, bgMaroon, bgDarken1, bgDarken2, bgDarken3, bgDarken4, bgLighten1, bgLighten2, bgLighten3, bgLighten4,
      borderBlack, borderGray, borderSilver, borderWhite, borderAqua, borderBlue, borderNavy, borderTeal, borderGreen, borderOlive, borderLime, borderYellow, borderOrange, borderRed, borderFuchsia, borderPurple, borderMaroon, darkenBorder1, darkenBorder2, darkenBorder3, darkenBorder4, lightenBorder1, lightenBorder2, lightenBorder3, lightenBorder4,
      primary,
      circle,
      rounded,
      btnOutline,
      rounded-top, rounded-right, rounded-bottom, roundedLeft
      border-top, border-right, border-bottom, border-left
    ]"
    :disabled="disabled"
    transition="transition">
      {{{ html }}}
  </button>
</template>

<script>
  import DimensionProps from '../mixins/DimensionProps'
  import ShapeProps from '../mixins/ShapeProps'
  import StateProps from '../mixins/StateProps'
  import StyleProps from '../mixins/StyleProps'
  import ColorProps from '../mixins/ColorProps'
  export default {
    mixins: [DimensionProps, ShapeProps, StateProps, StyleProps, ColorProps],
    data () {
      return {
        presets: ['primary', 'secondary', 'tertiary', 'info']
      }
    },
    props: {
      'show': { type: Boolean, default: true, required: false },
      'html': { type: String, default: '<span>Click here</span>', required: false },
      'text': { type: String, default: 'Click here', required: false },
      'primary': { type: String, default: 'btn-primary', required: false },
      'progress': { type: Boolean, default: false, required: false }
    }
  }
</script>

<style>
  :disabled { cursor: not-allowed; }
</style>
