<template>
  <div class="col col-12">

    <!--Column headings-->
    <div class="col col-12 bold blue">
      <span
        class="col col-2"
        v-for="column in columns"
        @click="sortBy(column)"
        :class="{ 'active': sortKey == column }">
        {{ column | capitalize }}
      </span>
    </div>

    <div class="clearfix"></div>

    <!--Glossary terms list-->
    <glossary-term
      v-for="term in glossaryTerms"
      :id="term.id"
      :word.sync="term.word"
      :definition.sync="term.definition"
      :grammar.sync="term.grammar"
      :pronunciation.sync="term.pronunciation"
      soundbite-lookup-url="https://ssl.gstatic.com/dictionary/static/sounds/de/0/"
      soundbite-lookup-type=".mp3"
      @create="create"
      class="py1 border-bottom border-blue">
    </glossary-term>

    <div class="right">
      <button class="btn btn-primary mt2" @click.prevent="add">&plus;</button>
    </div>

  </div>

</template>

<script>
  var _ = require('underscore')
  import Common from '../../vue/Common'
  import GlossaryTerm from './GlossaryTerm'

  export default {
    name: 'Glossary',
    components: {
      'glossary-term': GlossaryTerm
    },
    data () {
      return {
        columns: ['Word', 'Definition', 'Pronunciation', 'Grammar', 'Soundbite']
      }
    },
    props: [
      'routes',
      'shared-state',
      'glossary-terms'
    ],
    events: {},
    methods: {
      add () {
        this.glossaryTerms.push({ word: '', definition: '', grammar: '', soundbite: '', pronunciation: '' })
      },
      create (term) {
        Common.put(this.routes.createGlossaryTerm, term).then(function (response) {
          var data = response.data
          if (data.active) {
          } else {

          }
          self.$dispatch('fetch-pages')
        }, function (response) {})
      }
    }
  }
</script>
