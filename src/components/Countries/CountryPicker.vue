<template>
  <span>
    <country
      v-for="country in countries"
      v-show="inWhitelist(country)"
      :country="country"
      :selected="shouldPreselect(country)">
    </country>
  </span>
</template>

<script>
  var _ = require('underscore')
  import Country from './Country'
  export default {
    components: { Country },
    props: {
      whitelist: { type: Array, required: false },
      preselect: [],
      countries: []
    },
    methods: {
      inWhitelist (country) {
        return _.contains(this.whitelist, country.iso_3166_2.toLowerCase())
      },
      shouldPreselect (country) {
        return !!_.where(this.preselect, {id: country.id}).length
      }
    }
  }
</script>
