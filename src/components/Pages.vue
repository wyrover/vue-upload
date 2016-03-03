<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>

    <!--Countries-->
    <div class="col-right">
      <strong>Country:</strong>
      <select v-model="currentCountry">
        <option v-for="country in countries" :value="country">
          {{ country.name }}
        </option>
      </select>
    </div>

    <div class="clearfix"></div>

    <!--Languages-->
    <div class="col-right">
      <strong>Language:</strong>
      <select v-model="currentLanguage">
        <option v-for="language in languages" :value="language">
          {{ language.name }}
        </option>
      </select>
    </div>

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

    <!--Modal body-->
    <div v-if="sharedState.state.selectedPage.id">
      <modal :show.sync="showModal">
        <div slot="header">
          <div class="col-right">

            <!--Lock-->
            <div v-show="sharedState.state.selectedPage.locked"
                 class="col orange border circle pointer p1 muted"
                 title="Locked by another user">&#128274;</div>
            </div>

            <!--Name-->
            <h3>{{ sharedState.state.selectedPage.name }}</h3>

        </div>
        <div slot="body">

          <!--Search (content)-->
          <input v-model="searchContentQuery" type="text" name="search" placeholder="&#128269; Search&hellip;" style="border: none">

          <!--Tabs-->
          <tabs>
            <tab header="All content"
                 :show-item-count="true"
                 :item-count="sharedState.state.selectedContent.length">
              <div class="col col-12 p2">

                <!--v-for-->
                <div v-for="someContent in content | filterBy searchContentQuery"
                     class="col col-12 border-bottom py1 mb1">

                  <div class="col ml1 mr2">

                    <!--Add content to page button-->
                    <button v-show="pageContainsContent(someContent)"
                            @click.prevent="removeContentFromPage(someContent)"
                            class="btn red btn-outline">
                      &minus;
                    </button>

                    <!--Remove content from page button-->
                    <button v-show="!pageContainsContent(someContent)"
                            @click.prevent="addContentToPage(someContent)"
                            class="btn green btn-outline">
                      &plus;
                    </button>
                  </div>
                  <div class="col col-9">
                    {{ someContent.name }}
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </tab>
            <tab header="Page content">
              <div class="col col-12 p2">
                <div v-for="content in sharedState.state.selectedPage.content | filterBy searchContentQuery"
                     transition="staggered"
                     stagger="100"
                     class="col col-12 border-bottom py1 mb1"
                >
                  <div class="col mr2">
                    <!--Add / Remove content from page buttons-->
                    <button v-show="pageContainsContent(content)"
                            @click.prevent="removeContentFromPage(content)"
                            class="btn red btn-outline">
                      &minus;
                    </button>
                    <button v-show="!pageContainsContent(content)"
                            @click.prevent="addContentToPage(content)"
                            class="btn green btn-outline">
                      &plus;
                    </button>
                  </div>
                  <div class="col col-6">
                    {{ content.name }}
                  </div>
                  <div class="col col-3">
                    <button @click.prevent="editContent()" class="btn blue btn-outline">
                      edit
                    </button>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </tab>
          </tabs>
        </div>
      </modal>
    </div> <!--/if-->

    <!--Data rows-->  <!--| orderBy sortKey | filterBy search-->
    <div v-if="filteredPages.length">

      <div v-for="page in filteredPages"
           class="col col-12 border-bottom py2"
           :class="{ 'muted': page.deleted_at, 'border-blue': page === sharedState.state.selectedPage }"
           @mouseover="setSelected(page)"
           @keyup.esc="page.locked = false">

        <!--Set click handler for setting selectedProduct-->
        <div class="col col-12">
          <div class="col col-2">

            <!--Layout select-->
            <select name="layouts" v-model="page.layout" class="col col-12 border-none p0 bg-white">
              <option v-for="layout in layouts" v-bind:value="layout">{{ layout }}</option>
            </select>
          </div>

          <div class="col col-2">
            <!--View select-->
            <select name="views" v-show="page.id" v-model="page.view" class="col col-12 border-none p0 bg-white">
              <option v-for="view in views" v-bind:value="view">{{ view }}</option>
            </select>

            <!--View input (create)-->
            <input type="text" v-show="!page.id" v-model="page.view" name="view" class="border-none p0" placeholder="site.pages.example">
          </div>

          <div class="col col-2">
            <!--Name-->
            <input type="text" v-model="page.name" @keyup="page.slug = page.name" name="name" class="border-none bold p0" placeholder="Enter name">
          </div>

          <div class="col col-2">
            <!--Slug-->
            <input type="text" v-model="page.slug | slugify 'page.name'" name="slug" class="border-none p0">
          </div>

          <div class="col col-right">

            <!--Countries-->
            <country-picker
              :countries.sync="countries"
              :whitelist="['gb','us']"
              :preselect="page.countries">
            </country-picker>

            <!--Languages-->
            <language-picker
              :languages.sync="languages"
              :whitelist="['British English','American English']"
              :selected="page.language">
            </language-picker>

            <!--Lock-->
            <div v-show="page.locked" class="col orange border circle mr1 p1 pointer muted" title="Locked by another user">&#128274;</div>
            <!--Create / Update-->
            <button
              v-show="!page.id"
              @click.prevent="createPage($index)"
              class="btn btn btn-outline mr1 green px0 small unbold">
              Create
            </button>
            <button
              v-show="page.id"
              @click.prevent="updatePage(page)"
              class="btn btn-outline mr1 blue small unbold">
              Update
            </button>
            <!--Content-->
            <a v-show="page.id" @click.prevent="openModal()" :class="{ 'muted': !page.content.length }" class="btn border rounded small unbold mr1 orange">content</a>
            <!--Preview-->
            <a v-show="page.id" :href="routes.previewPage + '/' + page.slug" :class="{ 'muted': !page.content.length }" class="btn border rounded small unbold mr1" target="_blank">preview</a>
            <!--Toggle active-->
            <a v-show="page.id" href="#" @click.prevent="toggleActive(page)" :class="{ 'muted': !page.content.length && page.active }" class="btn border rounded small unbold {{ page.active ? 'green' : 'red' }}">{{ page.active ? 'active' : 'inactive' }}</a>
            <!--Delete-->
            <a v-show="!page.deleted_at" href="#" @click.prevent="deletePage(page)" class="btn-outline red" title="Delete">&times;</a>
            <a v-show="page.deleted_at" href="#" @click.prevent="restorePage(page)" class="btn-outline blue" title="Restore">&#10559;</a>

          </div>

          <div class="clearfix"></div>
          <div v-show="!page.id" class="col col-right">
            <button @click.prevent="removePage(page)" class="col col-right mt1 block btn border rounded">&minus;</button>
          </div>

        </div>
      </div>
    </div>
    <div v-else>
      No pages found!
    </div>

    <div class="clearfix"></div>

    <!--Add a page-->
    <button @click.prevent="addPage" class="col col-right mt1 block btn btn-primary">&plus;</button>
  </div>
</template>

<script>
  var _ = require('underscore')
  import Common from '../vue/Common'
  import Modal from './Modal.vue'
  import Tabs from './Tabset.vue'
  import Tab from './Tab.vue'
  import CountryPicker from './Countries/CountryPicker'
  import LanguagePicker from './LanguagePicker'

  export default {
    name: 'Pages',
    components: {
      'modal': Modal,
      'tabs': Tabs,
      'tab': Tab,
      'country-picker': CountryPicker,
      'language-picker': LanguagePicker
    },
    data () {
      return {
        columns: ['layout', 'view', 'name', 'slug'],
        sortKey: '',
        search: '',
        searchPagesQuery: '',
        searchContentQuery: '',
        reverse: false,
        showModal: false,
        taxonomies: {}
      }
    },
    props: [
      'routes',
      'shared-state',
      'views',
      'countries',
      'languages',
      'layouts',
      'pages',
      'content'
    ],
    computed: {
      filteredPages () {
        if (this.pages) {
          return this.pages.filter(function (page) {
            // If search query is empty:
            if (!this.searchPagesQuery) { return page }
            // Then filter by name
            return page.name.toLowerCase().indexOf(this.searchPagesQuery.toLowerCase()) > -1
          }.bind(this))
        }
      }
    },
    events: {
      'open-modal' () {
        this.showModal = true
      },
      'filter-by-taxonomy' () {
        // Filter by pages in selected taxonomy (vocabulary and term)
        _.each(this.currentVocabulary.related, function (related) {
          _.each(related, function (taxonomy) {
            return taxonomy
          })
        })
      },
      'add-country' (country) {
        var page = this.sharedState.getSelectedPage()
        // Check if the country is already in the list of this page's countries
        if (!_.findWhere(page.countries, { name: country.name })) {
          // Add it to the list of countries for this page
          page.countries.push(country)
        }
        // Now associate the countries with the page
        this.associateCountries(page)
      },
      'remove-country' (country) {
        var page = this.sharedState.getSelectedPage()
        // Check if the country is already in the list of this page's countries
        if (_.findWhere(page.countries, { name: country.name })) {
          // Find the index of the country in the countries array
          var index = _.findIndex(page.countries, { name: country.name })
          if (index > -1) {
            // Remove it
            page.countries.splice(index, 1)
          }
        }
        // Now associate the countries with the page
        this.associateCountries(page)
      },
      'select-language' (language) {
        var page = this.sharedState.getSelectedPage()
        console.log(language.name)
        page.language = language
        // Now associate the languages with the content
        this.associateLanguages(page)
      }
    },
    methods: {
      associateCountries (page) {
        var self = this
        Common.patch(`${this.routes.associateCountries}/${page.slug}`, JSON.stringify(page)).then(function (response) {
          // var data = response.data
          // self.sharedState.setSelectedContent(data)
          // self.$dispatch('fetch')
          // self.$dispatch('messenger-notify', { content: `Added countries to page`, type: 'success' })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed adding countries to page, please try again', type: 'error' })
        })
      },
      associateLanguages (page) {
        var self = this
        Common.patch(`${this.routes.associateLanguages}/${page.slug}`, JSON.stringify(page)).then(function (response) {
          // var data = response.data
          // self.sharedState.setSelectedContent(data)
          // self.$dispatch('fetch')
          // self.$dispatch('messenger-notify', { content: `Added language to page`, type: 'success' })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed adding language to page, please try again', type: 'error' })
        })
      },
      toggleActive (page) {
        console.log('something')
        var self = this
        Common.fetch(this.routes.toggleActive + '/' + page.slug, {}).then(function (response) {
          var data = response.data
          if (data.active) {
            self.$dispatch('messenger-notify', { content: 'Activated page', type: 'success' })
          } else {
            self.$dispatch('messenger-notify', { content: 'Deactivated page', type: 'success' })
          }
          self.$dispatch('fetch-pages')
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed, please try again', type: 'error' })
        })
      },
      addTaxonomy (taxonomy) {
        this.taxonomies.push({ name: 'TEST' })
      },
      setCurrentVocabulary (vocabulary) {
        this.currentVocabulary = vocabulary
      },
      pageContainsContent (content) {
        return _.where(this.sharedState.state.selectedContent, { id: content.id }).length
      },
      openModal () {
        this.$dispatch('open-modal')
      },
      setSelected (page) {
        if (!this.editing) {
          this.sharedState.setSelectedPage(page)
        }
      },
      editPage (page) {
        // stub
        // page.locked = true
      },
      addPage () {
        this.pages.push({ slug: '', old_slug: '', locked: false })
      },
      removePage (page) {
        this.pages.$remove(page)
      },
      addContentToPage (content) {
        var self = this
        Common.patch(this.routes.addContent + '/' + this.sharedState.state.selectedPage.slug, JSON.stringify(content)).then(function (response) {
          var data = response.data
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', {
            content: `Added content to this page <div>${data.name}<a href='#' class='muted'> preview page</a></div>`,
            type: 'success'
          })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed adding content to that page, please try again', type: 'error' })
        })
      },
      removeContentFromPage (content) {
        var self = this
        Common.patch(
          this.routes.removeContent + '/' + this.$data.currentPage.slug, JSON.stringify(content)).then(
          function (response) {
            // Success
            var data = response.data
            self.$dispatch('fetch')
            self.$dispatch('messenger-notify', {
              content: `Removed content from this page<div>${data.name}<a href='#' class='muted'> preview page</a></div>`,
              type: 'success'
            })
          },
          function () {
            // Failure
            self.$dispatch('messenger-notify', { content: 'Failed removing content from that page, please try again', type: 'error' })
          })
      },
      createPage (index) {
        var self = this
        Common.put(this.routes.createPages, { page: self.pages[index] }).then(function (response) {
          var data = response.data
          self.pages.splice(index, 1)
          self.pages.push(data)
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', { content: `Page created`, type: 'success' })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed creating page, please try again', type: 'error' })
        })
      },
      updatePage (page) {
        var self = this
        page.old_slug = page.slug
        Common.patch(this.routes.updatePages + '/' + page.old_slug, { page: page }).then(function (response) {
          var data = response.data
          if (data.updated_at === page.updated_at) {
            self.$dispatch('messenger-notify', { content: `Page ${page.name} was updated`, type: 'success' })
          } else {
            self.$dispatch('messenger-notify', { content: `Something went wrong while updating this page, please try again`, type: 'error' })
          }
          self.$dispatch('fetch')

        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed updating page, please try again', type: 'error' })
        })
      },
      deletePage (page) {
        var self = this
        Common.delete(this.routes.deletePages + '/' + page.slug, {}).then(function (response) {
          var data = response.data
          if (data.deleted_at) {
            self.$dispatch('messenger-notify', { content: `Successfully deleted page: ${data.name}`, type: 'success' })
          }
          self.$dispatch('fetch')
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed deleting page, please try again', type: 'error' })
        })
      },
      restorePage (page) {
        var self = this
        Common.patch(this.routes.restorePages + '/' + page.slug, {}).then(function (response) {
          var data = response.data
          if (!data.deleted_at) {
            self.$dispatch('messenger-notify', { content: `Successfully restored page: ${data.name}`, type: 'success' })
          }
          self.$dispatch('fetch')
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed restoring page, please try again', type: 'error' })
        })
      },
      sortBy (sortKey) {
        this.reverse = (this.sortKey === sortKey) ? !this.reverse : false
        this.sortKey = sortKey
      }
      /*                viewify( value ) {
       var view = value.toLowerCase()
       .replace(/[^\w ]+/g,'')
       .replace(/ +/g,'.')
       console.log(view)
       return view
       }*/
    }
  }
</script>
