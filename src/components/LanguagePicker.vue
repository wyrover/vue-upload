<template>
  <span>
    <select v-model="selected" @change="select" class="m1 bg-white border-none">
      <option
        v-for="language in languages"
        v-show="inWhitelist(language)"
        :value="language">
        {{ language.name }}
      </option>
    </select>
  </span>
</template>

<script>
  var _ = require('underscore')
  import Common from '../vue/Common'
  export default {
    props: {
      whitelist: { type: Array, required: false },
      selected: {},
      languages: []
    },
    methods: {
      inWhitelist (language) {
        return _.contains(this.whitelist, language.name)
      },
      select () {
        // this.selected = _.findWhere(this.languages, { id: this.preselect })
        this.$dispatch('select-language', this.selected)
      }
    }
}
</script>
