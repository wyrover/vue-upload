/**
 * Import this mixin to add shape dimensions to a component
 * Useful for buttons, images, avatars etc.
 */
export default {
  props: {
    'height': { type: Number, default: 80, required: false },
    'width': { type: Number, default: 80, required: false }
  }
}
