/**
 * Import this mixin to add shapes to a component
 * Useful for buttons, images, avatars etc.
 */
export default {
  props: {
    'primary': { type: Boolean, default: false, required: false },
    'border': { type: Boolean, default: false, required: false },
    'border-none': { type: String, default: null, required: false },
    'border-color': { type: String, default: null, required: false },
    'rounded-top': { type: String, default: null, required: false },
    'rounded': { type: Boolean, default: true, required: false },
    'circle': { type: Boolean, default: false, required: false },
    'rounded-right': { type: String, default: null, required: false },
    'rounded-bottom': { type: String, default: null, required: false },
    'rounded-left': { type: String, default: null, required: false },
    'transition': { type: String, default: null, required: false }
  }
}
