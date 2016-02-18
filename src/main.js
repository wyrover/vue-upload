import Vue from 'vue'
import Routes from './routes'
import Common from './vue/Common'
import Messages from './vue/Messages'
import './vue/Config.js'
import './vue/Filters.js'
import './vue/Transitions.js'
import './vue/Resources.js'
import App from './App'

// import Taxonomies from './components/Taxonomies/Taxonomies.vue'
// import Pages from './components/Pages.vue'
// import Content from './components/Content.vue'
// import Mixins from './vue/Mixins.js'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App

    // Root child components
    // 'taxonomies': Taxonomies,
    // Root child pages
    // 'pages': Pages,
    // 'content': Content
  },
  data: {
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
    routes: Routes,
    messages: Messages,
    countries: [],
    pages: [],
    content: [],
    layouts: [],
    views: [],
    references: [],
    resources: [],
    view: 'pages',
    revealTaxonomies: false
  },
  ready () {
    var self = this

    this.fetch()
    // Interceptors (middleware)
    Vue.http.interceptors.push({
      request: function (request) {
        console.log('req')
        self.$broadcast('progress-start')
        return request
      },
      response (response) {
        if (response.ok) {
          self.$broadcast('progress-stop')
        } else {
          self.$broadcast('progress-fail')
        }
        console.log('res')

        return response
      }
    })
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
    },
    'fetch' () {
      this.fetch()
    }
  },
  methods: {
    // Fetch all the things!
    fetch () {
      this.fetchViews()
      this.fetchLayouts()
      this.fetchPages()
      this.fetchContent()
      this.fetchCountries()
      this.fetchReferences()
      this.fetchResources()
    },
    fetchViews () {
      var self = this
      // Fetch views
      Common.fetch.views(this.routes.viewsList).then(
        function (response) {
          self.$set('views', response.data)
          self.$emit('messenger-notify', { content: Messages.fetch.success('views'), type: 'success' })
        },
        () => {
          self.$emit('messenger-notify', { content: Messages.fetch.failure('views'), type: 'error' })
        }
      )
    },
    fetchLayouts () {
      var self = this
      // Fetch layouts
      Common.fetch.layouts(this.routes.layoutsList).then(
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
      Common.fetch.pages(this.routes.allPages).then(
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
      Common.fetch.content(this.routes.allContent).then(
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
      Common.fetch.countries(this.routes.allCountries).then(
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
      Common.fetch.references(this.routes.allReferences).then(
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
      Common.fetch.resources(this.routes.allResources).then(
        function (response) {
          self.$set('resources', response.data)
          self.$emit('messenger-notify', { resources: Messages.fetch.success('resources'), type: 'success' })
        },
        function () {
          self.$emit('messenger-notify', { resources: Messages.fetch.failure('resources'), type: 'error' })
        }
      )
    }
  }
})
