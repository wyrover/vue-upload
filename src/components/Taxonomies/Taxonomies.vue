<template>
  <div class="col col-12 m0 mt1 gray">

      <!--Each vocabulary-->
      <vocabulary
        v-for="vocabulary in taxonomies"
        :vocabulary.sync="vocabulary"
        :shared-state.sync="sharedState"
        class="col"
        transition="staggered"
        stagger="25">
      </vocabulary>

  </div>
</template>

<script>
  import Vocabulary from './Vocabulary'

  export default {
    components: { Vocabulary },
    props: ['shared-state', 'taxonomies'],
    events: {
      'update' () {
        this.update()
      }
    },
    ready () {
      // this.fetchTaxonomies()
    },
    methods: {
      update () {
        var self = this
        console.log(self.$get('selectedVocabulary'))
/*        Ajax.resources.taxonomy.update({ id: self.selectedVocabulary.id }, JSON.stringify(self.$get('selectedVocabulary')) )
            .then(function (response) {
                self.$broadcast('messenger-notify', { content: "Categories updated", type: 'success' } )
            }, function (response) {
                self.$broadcast('messenger-notify', { content: "Failed to update categories, please try again", type: 'error' })
            })*/
      }
    }
  }
</script>
