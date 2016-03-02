<template>
  <div>

  </div>
</template>

<script>
  import VueTypeaheadMixin from 'vue-typeahead'
  import Common from '../vue/Common'

  export default {
    mixins: [VueTypeaheadMixin],
    data () {
      return {
        src: '...',                     // required
        data: {},                       // optional
        limit: 5,                       // optional
        onHit (item) {                  // required
          // ...
        },
        prepareResponseData (data) {    // optional
          // data = ...
          return data;
        }
      }
    }
  }
</script>

<style scoped>

</style>
