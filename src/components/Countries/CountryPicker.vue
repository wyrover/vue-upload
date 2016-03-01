<template>
  <span>
    <country
      v-for="country in countries"
      v-show="inWhitelist(country)"
      :country="country"
      :selected.sync="country.selected">
    </country>
  </span>
</template>

<script>
  var _ = require('underscore')
  import Country from './Country.vue'
  import Common from '../../vue/Common'
  export default {
    components: { Country },
    props: {
      whitelist: { type: Array, required: false },
      countries: [],
      sharedState: {}
    },
    methods: {
      inWhitelist (country) {
        return _.contains(this.whitelist, country.iso_3166_2.toLowerCase())
      }
    }
}
</script>
