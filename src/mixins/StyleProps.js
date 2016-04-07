/**
 * Import this mixin to add shapes to a component
 * Useful for buttons, images, avatars etc.
 */
export default {
  props: {
    'border': { type: String, default: 'btn-outline', required: false },
    'border-none': { type: String, default: 'border-none', required: false },
    'rounded-top': { type: String, default: 'rounded-top', required: false },
    'rounded-right': { type: String, default: 'rounded-right', required: false },
    'rounded-bottom': { type: String, default: 'rounded-bottom', required: false },
    'rounded-left': { type: String, default: 'rounded-left', required: false },
    'transition': { type: String, default: 'bounce', required: false }
  }
}
