<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>

    <!--Modal body-->
    <div v-if="sharedState.state.selectedContent.id">

      <modal :show.sync="showModal"
             :content.sync="sharedState.state.selectedContent.markdown"
             :name.sync="sharedState.state.selectedContent.name">
        <h3 slot="header">{{ sharedState.state.selectedContent.name }}</h3>
        <div slot="body" class="border-top border-bottom">

          <!--Insert dialog-->
          <div v-show="showInsertDialog" transition="bounce" class="animated border-left border-right p2">
            <button class="btn btn-outline green" @click.prevent="toggleShowReferences()">
              <tooltip hint="Add references to this content" text="References"></tooltip>
            </button>
            <button class="btn btn-outline blue" @click.prevent="">
              <tooltip hint="Embed image files in this content" text="Images"></tooltip>
            </button>
            <button class="btn btn-outline orange" @click.prevent="">
              <tooltip hint="Embed documents in this content" text="Documents"></tooltip>
            </button>
          </div>

          <!--References-->
          <references v-show="showReferences"
                      :references.sync="references"
                      :shared-state.sync="sharedState"
                      :routes.sync="routes"
          ></references>

          <!--Codemirror-->
          <div class="col col-6 border-left">
            <codemirror
              :model.sync="sharedState.state.selectedContent.markdown"
              :line-numbers="true"
              :width="-1"
              :height="700">
            </codemirror>
            <textarea v-show="false" v-model="sharedState.state.selectedContent.markdown">{{ sharedState.state.selectedContent.markdown }}</textarea>
          </div>

          <!--Markdown preview-->
          <div class="col col-6 border-left border-right">
            <div v-html="sharedState.state.selectedContent.markdown | marked | referenced" class="p1"
                 style="height: 700px; overflow-y: scroll"></div>
          </div>
          <div class="clearfix"></div>

        </div>

        <!--Insert/Update buttons-->
        <div slot="buttons">
          <button class="btn btn-outline bg-green white" @click.prevent="showInsertMenu()">
            <tooltip placement="right" hint="Insert media into this content" text="Insert&hellip;"></tooltip>
          </button>
          <button class="right btn btn-outline bg-blue white" @click.prevent="updateContent()">
            <tooltip placement="left" hint="Save all changes that you have made in the editor" text="Save"></tooltip>
          </button>
        </div>
      </modal>

    </div><!--/if-->

    <h2 class="py2">{{ content.length ? 'Content' : 'No content' }}</h2>

    <!--Column headings-->
    <div class="col col-12 bold blue">
      <a href="#"
         class="col col-2"
         v-for="column in columns"
         @click.prevent="sortBy(column)"
         v-bind:class="{ 'active': sortKey == column }">
        {{ column | capitalize }}
      </a>
    </div>

    <input v-model="searchContent" class="col-right" type="text" name="search" placeholder="&#128269;  Search&hellip;"
           style="border: none">

    <!--Data rows-->
    <div v-for="content in content | filterBy searchContent"
         @click="setSelected(content)"
         class="col col-12 border-bottom py1 mb1"
         :class="{ 'muted': content.deleted_at, 'border-blue': content === sharedState.state.selectedContent }"
         v-on:keyup.esc="content.editing = false">

      <div class="col col-12">
        <div class="col col-2">

          <!--Name-->
          <input type="text"
                 v-model="content.name"
                 v-on:keyup="content.slug = $root.slugify(content.name)"
                 name="name"
                 class="border-none p0"
                 placeholder="Enter name">

        </div>
        <div class="col col-right">

          <!--Create/Edit buttons-->
          <button
            v-show="!content.id" @click.prevent="createContent($index)"
            class="btn btn-outline green small unbold">
            Create
          </button>
          <button
            v-show="content.id"
            @click.prevent="openModal()"
            class="btn btn-outline green small unbold">
            Edit
          </button>

          <!--Preview-->
          <a href="/content/{{ content.slug }}" v-show="content.id" class="btn border rounded small unbold mr1"
             target="_blank">preview</a>
          <!--Toggle active-->
          <a href="#" v-show="content.id" @click.prevent="toggleActive(content)"
             class="btn border rounded small unbold {{ content.active ? 'green' : 'red' }}">{{ content.active ? 'active'
            : 'inactive' }}</a>
          <!--Delete-->
          <a href="#" v-show="content.id" @click.prevent="deleteContent(content)" class="red">&times;</a>
        </div>

        <div class="clearfix"></div>

        <div v-show="!content.id" class="col col-right">
          <button @click.prevent="removeContent(content)"
                  class="col col-right mt1 block btn border rounded">&minus;</button>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <!--Add content-->
    <button @click.prevent="addContent" class="col col-right mt1 block btn btn-primary">&plus;</button>

  </div>
</template>

<script>
  var _ = require('underscore')

  import Common from '../vue/Common'
  import Modal from './Modal'
  import CodeMirror from './CodeMirror'
  import References from './References'
  import Tooltip from './Tooltip'

  export default {
    components: {
      'modal': Modal,
      'codemirror': CodeMirror,
      'references': References,
      'tooltip': Tooltip
    },
    data () {
      return {
        columns: ['name'],
        sortKey: '',
        searchContent: '',
        reverse: false,
        showModal: false,
        showReferences: false,
        showInsertDialog: false
      }
    },
    props: [
      'routes',
      'shared-state',
      'views',
      'layouts',
      'pages',
      'content',
      'countries',
      'references',
      'resources'
    ],
    events: {
      'save-content' () {
        console.log('save event')
        this.updateContent()
      },
      'add-reference-to-content' (reference) {
        var self = this

        // Turn off editing
        reference.editing = false

        var selectedContentReferences = this.sharedState.getSelectedContent().references

        // Only add unique references by number
        if (!_.where(selectedContentReferences, {no: reference.no}).length) {
          selectedContentReferences.push(reference)
          self.$dispatch('messenger-notify', {
            content: `Reference numbered <strong>${reference.no}</strong> was added to this content!`,
            type: 'success'
          })
        } else {
          self.$dispatch('messenger-notify', {
            content: `There is already a reference numbered <strong>${reference.no}</strong> in the list `,
            type: 'info'
          })
        }

      },
      'insert-reference' (reference) {
        this.$broadcast('insert-reference', reference)
      }
    },
    methods: {
      setSelected (content) {
        this.sharedState.setSelectedContent(content)
      },
      showInsertMenu () {
        this.showInsertDialog = !this.showInsertDialog
      },
      toggleShowReferences () {
        this.$set('showReferences', !this.showReferences)
      },
      openModal () {
        this.showModal = true
      },
      addContent () {
        this.content.push({name: ''})
      },
      removeContent (content) {
        this.content.$remove(content)
      },
      createContent (index) {
        var self = this
        Common.put(this.routes.createContent, JSON.stringify(self.content[index])).then(function (response) {
          var data = response.data
          self.content.splice(index, 1)
          self.content.push(data)
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', {
            content: `Added content: ${data.name} <div class='mt1'><a href='#' class='muted'>preview content</a></div><div><a href='#pages' class='muted'>add this content to a page</a></div>`,
            type: 'success'
          })
        }, function (response) {
          self.$dispatch('messenger-notify', {content: 'Failed creating content, please try again', type: 'error'})
        })
      },
      updateContent () {
        var self = this
        Common.patch(`${this.routes.updateContent}/${this.sharedState.state.selectedContent.id}`, JSON.stringify(this.sharedState.state.selectedContent)).then(function (response) {
          var data = response.data
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', {
            content: `Updated content: <div>${data.name}<a href='#' class='muted'> preview page</a></div>`,
            type: 'success'
          })
        }, function () {
          self.$dispatch('messenger-notify', {content: 'Failed updating content, please try again', type: 'error'})
        })
      },
      deleteContent (content) {
        var self = this
        Common.delete(this.routes.deleteContent + '/' + content.id).then(function (response) {
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', {content: `Deleted content: ${content.name}`, type: 'success'})
        }, function (response) {
          self.$dispatch('messenger-notify', {content: 'Failed deleting content, please try again', type: 'error'})
        })
      },
      toggleActive (content) {
        var self = this
        Common.get(this.routes.toggleContentActive + '/' + content.id).then(function (response) {
          var data = response.data
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', { content: `Content ${data.active} ? 'activated' : 'deactivated')`, type: 'success' })
        }, function (response) {
          self.$dispatch('messenger-notify', { content: 'Failed deleting content, please try again', type: 'error' })
        })
      },
      sortBy (sortKey) {
        this.reverse = (this.sortKey === sortKey) ? !this.reverse : false
        this.sortKey = sortKey
      }
    }
  }
</script>
