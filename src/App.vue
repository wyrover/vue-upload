<template>
  <div>

    <p>
      <a v-link="{ path: '/pages' }">Go to Pages</a>
      <a v-link="{ path: '/content' }">Go to Content</a>
    </p>

    <!--vue-progress-->
    <progress
      :percent="ajaxProgress.percent"
      :options="ajaxProgress.options">
    </progress>

    <!--Messenger-->
    <messenger
      :content="messenger.content"
      :type="messenger.type"
      :theme="messenger.theme"
      :extra-classes="messenger.extraClasses"
      :show-close-button="messenger.showCloseButton">
    </messenger>

    <!--Taxonomies (categories)-->
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
    </div>

    <!-- use router-view element as (dynamic component) route outlet -->
    <router-view
      @keyup.esc="this.$broadcast('close-modal')"
      :is="view"
      v-ref:dynamic-component
      :shared-state.sync="sharedState"
      :views.sync="views"
      :layouts.sync="layouts"
      :pages.sync="pages"
      :content.sync="content"
      :countries.sync="countries"
      :references.sync="references"
      keep-alive>
    </router-view>

  </div>
</template>

<script>
import Routes from './routes'
import CodeMirror from './components/CodeMirror'
import Messenger from './components/Messenger'
import Progress from './components/Progress'
import Taxonomies from './components/Taxonomies/Taxonomies'
import Common from './vue/Common'
import Messages from './vue/Messages'
export default {
  replace: false,
  components: {
    CodeMirror,
    Messenger,
    Progress,
    Taxonomies
  },
  data () {
    return {
      view: 'content',
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
  body {
    font-family: Helvetica, sans-serif;
  }
  .v-link-active {
    color: red;
  }
</style>
