/**
 * Import this mixin to add shapes to a component
 * Useful for buttons, images, avatars etc.
 */
export default {
  props: {
    'rounded': { type: Boolean, default: false, required: false },
    'circle': { type: Boolean, default: false, required: false }
  }
}
