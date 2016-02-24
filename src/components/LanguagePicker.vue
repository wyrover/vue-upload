<template>
    <div class="col col-12">
        <button
            v-show="inShowList(country)"
            v-for="country in countries"
            @click.prevent="setSelected(country)"
            class="col col-1 btn flag-wrapper m1 flag-icon-background flag-icon-{{ country.iso_3166_2.toLowerCase() }}"
            :class="{ 'muted' : selected !== country } "
            :title="country.name"
        >&nbsp;</button>
  </div>
</template>

<script>
  var _ = require('underscore')
  export default {
    events: {
      'close-modal' () {
        this.$set('show', false)
      }
    },
    props: {
      onlyShow: {
        // Only show these countries...
        type: Array,
        required: false
      },
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      selected: {},
      countries: []
    },
    methods: {
      inShowList (country) {
        return _.contains(this.onlyShow, country.iso_3166_2.toLowerCase())
      },
      setSelected (country) {
        this.$set('selected', country)
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

    .modal-container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        min-height: 500px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }
</style>
