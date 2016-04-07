/**
 * Import this mixin to add element state properties
 * Useful for links, badges, buttons, images, avatars etc.
 */
export default {
  props: {
    'active': { type: Boolean, default: false, required: false },
    'hover': { type: Boolean, default: false, required: false },
    'visited': { type: Boolean, default: false, required: false},
    'disabled': { type: Boolean, default: false, required: false }
  }
}
