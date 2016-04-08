/**
 * Import this mixin to add tooltips to a component
 */
var TooltipComponent = require('../components/Tooltip')
export default {
  components: { TooltipComponent },
  events: {
    'toggle-tooltips' () {
      // todo: set help var in localstorage/cookie
      this.$set('tooltips', !this.tooltips)
      this.$broadcast('show-tooltips', this.tooltips)
    }
  }
}
