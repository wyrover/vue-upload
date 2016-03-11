<template>
  <div>
    <!--Modal body-->
    <div v-if="sharedState.state.selectedContent.id">

      <modal
        :show.sync="showModal"
        :content.sync="sharedState.state.selectedContent.markdown"
        :name.sync="sharedState.state.selectedContent.name">

        <h3 slot="header">{{ sharedState.getSelectedContent().name }}</h3>
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
            <button class="btn btn-outline fuchsia" @click.prevent="">
              <tooltip hint="Embed files into this content" text="Files"></tooltip>
            </button>
            <button class="btn btn-outline navy" @click.prevent="toggleShowContentAreas()">
              <tooltip hint="Add content areas" text="Content areas"></tooltip>
            </button>
          </div>

          <!--References-->
          <references
            v-show="showReferences"
            :routes.sync="routes"
            :shared-state.sync="sharedState"
            :references.sync="references">
          </references>

          <!--References-->
          <content-area
            v-show="showContentAreas"
            :routes.sync="routes"
            :shared-state.sync="sharedState"
            :references.sync="">
          </content-area>

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
            <div
              v-html="sharedState.state.selectedContent.markdown | marked | referenced"
              class="p1"
              style="height: 700px; overflow-y: scroll">
            </div>
          </div>
          <div class="clearfix"></div>

        </div>

        <!--Insert/Update buttons-->
        <div slot="buttons">
          <button class="btn btn-outline bg-green white" @click.prevent="showInsertMenu()">
            <tooltip placement="right" hint="Insert media into this content" text="Insert&hellip;"></tooltip>
          </button>
          <button class="right btn btn-outline bg-blue white" @click.prevent="update">
            <tooltip placement="left" hint="Save all changes that you have made in the editor" text="Save"></tooltip>
          </button>
        </div>

      </modal>

    </div><!--/if-->

    <!--Column headings-->
    <div class="col col-12 bold blue">
      <a href="#"
         class="col col-2"
         v-for="column in columns"
         @click.prevent="sortBy(column)"
         :class="{ 'active': sortKey == column }">
        {{ column | capitalize }}
      </a>
    </div>

    <!--Data rows-->
    <div
      v-for="content in content | filterBy searchContent"
      @mouseover="setSelected(content)"
      @keyup.esc="content.editing = false"
      class="col col-12 border-bottom py1"
      :class="{ 'muted': content.deleted_at, 'bg-silver': content === sharedState.state.selectedContent }">

      <div class="col col-12">
        <div class="col col-2">

          <!--Name-->
          <input
            type="text"
            v-model="content.name"
            @keyup="content.slug = $root.slugify(content.name)"
            name="name"
            class="border-none"
            :class="{ 'bg-silver': content === sharedState.state.selectedContent }"
            placeholder="Enter name">

        </div>
        <div class="col col-right">

          <!--Create button-->
          <button
            v-show="!content.id"
            @click.prevent="create($index)"
            class="btn btn-primary small unbold">
            Create
          </button>

          <!--Update button-->
          <button
            v-show="content.id"
            @click.prevent="update"
            class="btn btn-primary small unbold">
            Update
          </button>

          <!--Clone button-->
          <button
            v-show="content.id"
            @click.prevent="clone"
            class="btn orange small unbold">
            Clone
          </button>

          <button
            v-show="content.id"
            @click.prevent="openModal()"
            class="btn green small unbold">
            Edit
          </button>

          <!--Delete-->
          <a href="#" v-show="content.id" @click.prevent="delete(content)" class="btn red">&times;</a>

        </div>

        <div class="clearfix"></div>

        <div v-show="!content.id" class="col col-right">
          <button
            @click.prevent="remove(content)"
            class="col col-right mt1 block btn border rounded">
            &minus;
          </button>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <!--Add content-->
    <button
      @click.prevent="add"
      class="col col-right mt1 block btn btn-primary">
      &plus;
    </button>

  </div>
</template>

<script>
  var _ = require('underscore')
  import Common from '../../vue/Common'
  import Modal from './../Modal'
  import CodeMirror from './../CodeMirror'
  import References from './../References'
  import Tooltip from './../Tooltip'
  import ContentArea from './ContentArea'

  export default {
    name: 'Content',
    components: {
      'modal': Modal,
      'codemirror': CodeMirror,
      'references': References,
      'tooltip': Tooltip,
      'content-area': ContentArea
    },
    data () {
      return {
        columns: ['name'],
        sortKey: '',
        searchContent: '',
        reverse: false,
        showModal: false,
        showReferences: false,
        showContentAreas: false,
        showInsertDialog: false,
        selectedCountries: []
      }
    },
    props: [
      'routes',
      'shared-state',
      'views',
      'layouts',
      'pages',
      'content',
      'references',
      'resources'
    ],
    events: {
      'save-content' () {
        this.update()
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
      add () {
        this.content.push({ name: '', content: [], slug: '', old_slug: '', locked: false })
      },
      setSelected (content) {
        this.sharedState.setSelectedContent(content)
      },
      showInsertMenu () {
        this.showInsertDialog = !this.showInsertDialog
      },
      toggleShowReferences () {
        this.$set('showReferences', !this.showReferences)
      },
      toggleShowContentAreas () {
        this.$set('showContentAreas', !this.showContentAreas)
      },
      openModal () {
        this.showModal = true
      },
      remove (content) {
        this.content.$remove(content)
      },
      create (index) {
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
      update (content) {
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
      delete (content) {
        var self = this
        Common.destroy(this.routes.deleteContent + '/' + content.id).then(function (response) {
          self.$dispatch('fetch')
          self.$dispatch('messenger-notify', {content: `Deleted content: ${content.name}`, type: 'success'})
        }, function (response) {
          self.$dispatch('messenger-notify', {content: 'Failed deleting content, please try again', type: 'error'})
        })
      },
      toggleActive (content) {
        var self = this
        Common.fetch(this.routes.toggleContentActive + '/' + content.id).then(function (response) {
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
