<template>
  <div>
    <div class="col col-12">

      <!--Edit term-->
      <button
        v-show="!term.editing"
        @click.prevent="setSelected(term)"
        @dblclick.prevent="setEditing(term)"
        class="btn rounded"
        :class="{ 'blue': sharedState.state.selectedTerm === term }">
          {{ term.name }}
      </button>

      <!--Edit term input-->
      <input
        v-show="term.editing"
        type="text"
        @click.prevent="setSelected(term)"
        class="border-none ml1 mb1 bg-silver muted black"
        :class="{ 'blue': term === selected }"
        @keyup.enter="term.id ? update(term.name) : create()"
        v-model="term.name" />

    </div>
  </div>
</template>

<script>
  export default {
    props: ['term', 'vocabulary', 'shared-state'],
    ready () {},
    events: {
      'add-term': function () {
        this.add()
      }
    },
    methods: {
      setSelected (term) {
        // this.$set('vocabulary', this.vocabulary)
        this.sharedState.setSelectedVocabulary(this.vocabulary)
        this.sharedState.setSelectedTerm(term)
        this.$root.setPageHash(this.vocabulary.name.toLowerCase())
      },
      setEditing (term) {
        this.sharedState.toggleEditingTerm(term)
      },
      edit (term) {
        term.editing = true
        this.sharedState.setSelectedTerm(term)
        this.sharedState.setSelectedVocabulary(this.vocabulary)
      },
      update (term) {
        this.sharedState.setSelectedTerm(term)
        this.$dispatch('update')
        this.$set('term.editing', false)
      },
      create () {
        // this.sharedState.setSelectedTerm(term)
        this.$dispatch('create')
        this.$set('term.editing', false)
      }
    }
  }
</script>
