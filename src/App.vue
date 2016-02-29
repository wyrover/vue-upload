<template>
  <div>

    <!--vue-router-->
    <div class="col col-12 bg-black p2 m0">

      <a v-link="{ path: '/pages'   }" class="btn silver">Pages   <span class="muted">({{ pages.length   }})</span></a>
      <a v-link="{ path: '/content' }" class="btn silver">Content <span class="muted">({{ content.length }})</span></a>

      <!--search-->
      <input
        v-model="searchModel"
        class="right center white bg-black py1 h4"
        type="text"
        name="search"
        placeholder="&#128269;Search&hellip;"
        style="border: none">

    </div>

    <!--vue-progress-->
    <progress
      :percent="ajaxProgress.percent"
      :options="ajaxProgress.options">
    </progress>

    <!--sweetalert-->
    <sweet-alert></sweet-alert>

    <!--Messenger-->
    <messenger
      :content="messenger.content"
      :type="messenger.type"
      :theme="messenger.theme"
      :extra-classes="messenger.extraClasses"
      :show-close-button="messenger.showCloseButton">
    </messenger>

<!--    &lt;!&ndash;Taxonomies (categories)&ndash;&gt;
    <div class="py2">
      <button
        @click.prevent="toggleTaxonomiesDialog()"
        class="btn">
        Categories
      </button>
      <taxonomies
        v-show="revealTaxonomies"
        :taxonomies.sync="taxonomies"
        :shared-state.sync="sharedState">
      </taxonomies>
    </div>-->

    <!-- use router-view element as (dynamic component) route outlet -->
    <router-view
      @keyup.esc="this.$broadcast('close-modal')"
      :routes="routes"
      :shared-state.sync="sharedState"
      :views.sync="views"
      :layouts.sync="layouts"
      :pages.sync="pages"
      :content.sync="content"
      :countries.sync="countries"
      :languages.sync="languages"
      :references.sync="references"
      keep-alive>
    </router-view>

  </div>
</template>

<script>
import Routes from './routes'
import Vue from 'vue'
import store from './store/content/index'

import 'prismjs'

import CodeMirror from './components/CodeMirror'
import Messenger from './components/Messenger'
import Progress from './components/Progress'
import Taxonomies from './components/Taxonomies/Taxonomies'
import SweetAlert from './components/SweetAlert'
import Typeahead from './components/Typeahead'
import Common from './vue/Common'
import Messages from './vue/Messages'
import store from './store/content/index'

export default {
  store,
  name: 'App',
  replace: false,
  components: {
    CodeMirror,
    Messenger,
    Progress,
    Taxonomies,
    SweetAlert,
    Typeahead
  },
  data () {
    return {
      routes: Routes,
      sharedState: {
        state: {
          selectedContent: { editing: false },
          selectedPage: { editing: false },
          selectedVocabulary: { editing: false },
          selectedTerm: { editing: false },
          selectedReference: { editing: false },
          selectedAsset: { editing: false }
        },
        setSelectedContent (content) {
          this.state.selectedContent = content
        },
        setSelectedReference (reference) {
          this.state.selectedReference = reference
        },
        getSelectedReference () {
          return this.state.selectedReference
        },
        getSelectedContent () {
          return this.state.selectedContent
        },
        setSelectedPage (page) {
          this.state.selectedPage = page
        },
        setSelectedVocabulary (vocabulary) {
          this.state.selectedVocabulary = vocabulary
        },
        setSelectedTerm (term) {
          this.state.selectedTerm = term
        },
        setSelectedAsset (asset) {
          this.state.selectedAsset = asset
        },
        toggleEditingVocabulary (vocabulary) {
          vocabulary.editing = !vocabulary.editing
          this.state.selectedVocabulary = vocabulary
        },
        toggleEditingTerm () {
          this.state.selectedTerm.editing = !this.state.selectedTerm.editing
        },
        enableEditing (model) {
          model.editing = true
        },
        disableEditing (model) {
          model.editing = false
        }
      },
      countries: [],
      languages: [],
      pages: [],
      content: [],
      layouts: [],
      views: [],
      references: [],
      resources: [],
      taxonomies: [],
      revealTaxonomies: false,
      messenger: {
        content: {},
        type: {},
        theme: {},
        extraClasses: {},
        showCloseButton: {}
      },
      ajaxProgress: {
        percent: 0,
        options: {
          show: true,
          canSuccess: true,
          color: 'rgb(145, 255, 0)',
          failedColor: 'red',
          height: '3px'
        }
      }
    }
  },
  ready () {
    this.fetch()
  },
  events: {
    'fetch' () {
      this.fetch()
    },
    events: {
      'messenger-notify' (message) {
        this.$broadcast('messenger-notify', message)
      },
      'messenger-options' (options) {
        this.$broadcast('messenger-options', options)
      },
      'close-modal' () {
        this.$broadcast('close-modal')
      }
    }
  },
  methods: {
    toggleTaxonomiesDialog () {
      this.$set('revealTaxonomies', !this.revealTaxonomies)
    },
    // Fetch all the things!
    fetch () {
      this.fetchViews()
      this.fetchLayouts()
      this.fetchPages()
      this.fetchContent()
      this.fetchCountries()
      this.fetchLanguages()
      this.fetchReferences()
      this.fetchResources()
      this.fetchTaxonomies()
    },
    fetchViews () {
      var self = this
      // Fetch views
      Common.fetch(this.routes.viewsList).then(
        function (response) {
          self.$set('views', response.data)
          self.$emit('messenger-notify', { content: Messages.fetch.success('views'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { content: Messages.fetch.failure('views'), type: 'error' })
        }
      )
    },
    fetchLayouts () {
      var self = this
      // Fetch layouts
      Common.fetch(this.routes.layoutsList).then(
        function (response) {
          self.$set('layouts', response.data)
          self.$emit('messenger-notify', { content: Messages.fetch.success('layouts'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { content: Messages.fetch.failure('layouts'), type: 'error' })
        }
      )
    },
    fetchPages () {
      var self = this
      // Fetch pages
      Common.fetch(this.routes.allPages).then(
        function (response) {
          self.$set('pages', response.data)
          self.$emit('messenger-notify', { content: Messages.fetch.success('pages'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { content: Messages.fetch.failure('pages'), type: 'error' })
        }
      )
    },
    fetchContent () {
      var self = this
      // Fetch content
      Common.fetch(this.routes.allContent).then(
        function (response) {
          self.$set('content', response.data)
          // Add old_slug for comparison when updating
          self.content.map(function (content) { content.old_slug = content.slug })
          self.$emit('messenger-notify', { content: Messages.fetch.success('content'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { content: Messages.fetch.failure('content'), type: 'error' })
        }
      )
    },
    fetchCountries () {
      var self = this
      // Fetch countries
      Common.fetch(this.routes.allCountries).then(
        function (response) {
          self.$set('countries', response.data)
          self.$emit('messenger-notify', { countries: Messages.fetch.success('countries'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { countries: Messages.fetch.failure('countries'), type: 'error' })
        }
      )
    },
    fetchLanguages () {
      var self = this
      // Fetch languages
      Common.fetch(this.routes.allLanguages).then(
        function (response) {
          self.$set('languages', response.data)
          self.$emit('messenger-notify', { languages: Messages.fetch.success('languages'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { languages: Messages.fetch.failure('languages'), type: 'error' })
        }
      )
    },
    fetchReferences () {
      var self = this
      // Fetch references
      Common.fetch(this.routes.allReferences).then(
        function (response) {
          self.$set('references', response.data)
          self.$emit('messenger-notify', { references: Messages.fetch.success('references'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { references: Messages.fetch.failure('references'), type: 'error' })
        }
      )
    },
    fetchResources () {
      var self = this
      // Fetch resources
      Common.fetch(this.routes.allResources).then(
        function (response) {
          self.$set('resources', response.data)
          self.$emit('messenger-notify', { resources: Messages.fetch.success('resources'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { resources: Messages.fetch.failure('resources'), type: 'error' })
        }
      )
    },
    fetchTaxonomies () {
      var self = this
      // Fetch taxonomies
      Common.fetch(this.routes.allTaxonomies).then(
        function (response) {
          self.$set('taxonomies', response.data)
          self.$emit('messenger-notify', { taxonomies: Messages.fetch.success('taxonomies'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { taxonomies: Messages.fetch.failure('taxonomies'), type: 'error' })
        }
      )
    }
  }
}
</script>

<style>
  @import '../node_modules/ace-css/css/ace.min.css';
  @import '../node_modules/animate.css/source/_base.css';
  @import "../node_modules/prismjs/themes/prism.css";

  body {
    font-family: Helvetica, sans-serif;
  }
  .v-link-active {
    color: #ff599c;
  }
</style>
