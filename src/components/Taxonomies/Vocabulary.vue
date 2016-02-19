<template>
  <div class="col col-12">
    <!--CRUD buttons-->
    <button
      v-show="!vocabulary.editing"
      @click.prevent="setSelected(vocabulary)"
      @dblclick.prevent="setEditing(vocabulary)"
      class="btn mb1 rounded"
      :class="{ 'blue': vocabulary == sharedState.state.selectedVocabulary }">
      {{ vocabulary.name }}
    </button>

    <!--Edit vocabulary input-->
    <input
      v-show="vocabulary.editing"
      type="text"
      class="border-none ml1 mb1 bg-white blue"
      @keyup.enter="vocabulary.id ? update() : create()"
      v-model="vocabulary.name" />

    <div class="clearfix"></div>

    <!--Each term:-->
    <term v-for="term in vocabulary.terms"
          :term.sync="term"
          :shared-state.sync="sharedState"
          :vocabulary.sync="vocabulary"
          class="col"
          transition="staggered"
          stagger="25">
    </term>

    <!--Add/remove term button(s)-->
    <div class="col">

      <!-- add -->
      <button
        v-show="!sharedState.state.selectedTerm.editing || !vocabulary.terms.length"
        @click.prevent="add()"
        class="btn blue">
        &plus;
      </button>

      <!-- remove -->
      <button
        v-show="sharedState.state.selectedTerm || (sharedState.state.selectedTerm.editing && vocabulary.terms.length)"
        @click.prevent="remove()"
        class="btn red">
        &minus;
      </button>
    </div>

  </div>
</template>

<script>
  import Term from './Term.vue'

  export default {
    components: { 'term': Term },
    props: ['vocabulary', 'shared-state'],
    methods: {
      setSelected (vocabulary) {
        // Set page hash
        this.$root.setPageHash(vocabulary.name.toLowerCase())
        // Set state
        this.sharedState.setSelectedVocabulary(vocabulary)
      },
      setEditing (vocabulary) {
        this.sharedState.toggleEditingVocabulary(vocabulary)
        this.$set('vocabulary', vocabulary)
      },
      edit (model) {
        model.editing = true
        this.sharedState.setSelectedVocabulary(model)
        this.$set('vocabulary', this.vocabulary)
      },
      add () {
        this.$set('vocabulary.editing', false)
        this.vocabulary.terms.push({ editing: true })
      },
      remove () {
        this.$nextTick(function () {
          if (Object.keys(this.selectedTerm).length) {
            this.vocabulary.terms.$remove(this.selectedTerm)
          } else {
            this.vocabulary.terms.pop()
          }
          this.$set('selectedTerm', { })
        })
      },
      update () {
        this.$dispatch('update')
        this.$set('vocabulary.editing', false)
      }
    }
  }
</script>
