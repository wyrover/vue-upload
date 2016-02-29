<template>
    <span>
        <button
          v-show="inWhitelist(country)"
          v-for="country in countries"
          @click.prevent="select(country)"
          class="col col-1 btn flag-wrapper m1 flag-icon-background flag-icon-{{ country.iso_3166_2.toLowerCase() }}"
          :class="{ 'muted' : country !== sharedState.getSelectedCountry() }"
          :title="country.name">
            &nbsp;
        </button>
    </span>
</template>

<script>
  var _ = require('underscore')
  import Common from '../vue/Common'
  export default {
    events: {
      'close-modal' () {
        this.$set('show', false)
      }
    },
    props: {
      whitelist: { type: Array, required: false },
      show: { type: Boolean, required: true, twoWay: true },
      countries: [],
      sharedState: {}
    },
    methods: {
      inWhitelist (country) {
        return _.contains(this.whitelist, country.iso_3166_2.toLowerCase())
      },
      select (country) {
        country.selected = !country.selected
        this.sharedState.setSelectedCountry(country)
      },
      contains (country) {
        return _.contains(this.whitelist, country.iso_3166_2.toLowerCase())
      }
    }
}
</script>

<style scoped>
    @import "../../node_modules/flag-icon-css/css/flag-icon.css";
    .flag-wrapper {
        width: 25px;
        height: 25px;
    }
</style>
