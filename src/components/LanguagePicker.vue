<template>
    <span>
        <select v-model="currentLanguage" class="m1">
            <option
              v-for="language in languages"
              v-show="inWhitelist(language)"
              v-bind:value="language">
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
      show: { type: Boolean, required: true, twoWay: true },
      default: 'en_GB',
      selected: {},
      languages: []
    },
    methods: {
      inWhitelist (language) {
        console.log(language.name)
        return _.contains(this.whitelist, language.name)
      },
      setSelected (language) {
        this.$set('selected', language)
      },
      associate (content) {
        var self = this
        Common.patch(`${this.routes.associateLanguages}/${content.id}`, JSON.stringify(content)).then(function (response) {
          var data = response.data
          console.log(data)
          self.sharedState.setSelectedContent(data)
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', { content: `Added references to content`, type: 'success' })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed adding references to content, please try again', type: 'error' })
        })
      }
    }
}
</script>
