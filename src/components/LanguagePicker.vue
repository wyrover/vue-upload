<template>
  <span>
    <select v-model="selected.id" @change="select" class="m1">
      <option
        v-for="language in languages"
        v-show="inWhitelist(language)"
        :value="language.id">
        {{ language.name }}
      </option>
    </select>
  </span>
</template>

<script>
  var _ = require('underscore')
  import Common from '../vue/Common'
  export default {
    ready () {
      // Get the selected language from languages[] by name
      var selectedLanguage = _.findWhere(this.languages, { name: this.preselect })
      if (selectedLanguage) {
        this.selected = selectedLanguage
      }
    },
    props: {
      whitelist: { type: Array, required: false },
      selected: { default: { id: 40 } },
      preselect: { default: 'British English' },
      languages: []
    },
    methods: {
      inWhitelist (language) {
        return _.contains(this.whitelist, language.name)
      },
      select () {
        this.$dispatch('select-language', this.selected)
      }
    }
}
</script>
