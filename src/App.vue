<template>
  <div>
    <!--vue-router - main navigation-->
    <div class="col col-12 p2 m0 h2">
      <!--invite link-->
      <div class="right relative">
        <button @click="this.$emit('open-invite-link-modal')" class="btn btn-primary border-gray bg-white blue right">&#128587;<!--&#128588;--></button>
      </div>
      <!--login link-->
      <div class="right mr2 relative">
        <button @click="" class="btn btn-primary h5 border-gray bg-white gray right">Login<!--&#128273;--></button>
      </div>
      <!--search bar-->
      <div v-if="this.$route.path !== '/upload'" class="right mr2 relative">
        <input class="h3 silver p1 m0" v-model="searchQuery" type="text" name="search" placeholder="&#128269; Search&hellip;" style="border: none">
        <button @click.prevent="searchQuery = ''" class="btn h1 red muted absolute top-0 right-0 p1">&times;</button>
      </div>
      <!--upload component-->
      <button v-link="{ path: '/upload' }" class="btn silver">
        <span v-if="this.$route.path === '/upload'">&#8686;</span><span v-else="">&#8679;</span> Upload
      </button>
      <!--files view component-->
      <button v-link="{ path: '/files' }" class="btn silver">
        <span v-if="this.$route.path === '/files'">&#128194;</span><span v-else="">&#128193;</span> Files (<small class="muted">{{ files.length }}</small>)
      </button>
      <!--gallery component-->
      <button v-link="{ path: '/gallery' }" class="btn silver">Gallery</button>
    </div>
    <!--sweet alerts, bruh-->
    <sweet-alert
     :title="'A title'"
     :text="'Whoa, easy there buddy&hellip;'"
     :type="'danger'">
    </sweet-alert>
    <!-- use router-view element as (dynamic component) route outlet -->
    <router-view
      @deletedSomething="this.$sweetAlert.$emit('alert')"
      :search-query="searchQuery"
      :routes="routes"
      :shared-state.sync="sharedState"
      :files.sync="files"
      keep-alive v-cloak>
    </router-view>
    <!--invite link dialog/modal-->
    <invite-link-modal :show.sync="showInviteLinkModal">
      <h3 class="center blue" slot="header">Invite someone! &#128588;</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <p class="gray">Click to save an invitation link to your clipboard</p>
        <textarea v-model="inviteLink" class="clipboard col-4 border-blue p2 m2 rounded"></textarea>
        <!--link-copied-to-clipboard notification-->
        <p v-show="copied" class="animated mt0 p2 blue border-blue rounded " transition="bounce">Copied to clipboard!</p>
        <p class="gray">
          <em>Or&hellip;</em>
        </p>
        <input
          v-model="inviteEmailAddress"
          class="mx-auto col-3 p2 m2 rounded border-none"
          placeholder="Enter the email address of the person(s) you would like to invite" />
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </invite-link-modal>
  </div>
</template>

<script>
import Routes from './routes'
import Vue from 'vue'
import store from './store/content/index'

import SweetAlert from './components/SweetAlert'
import Modal from './components/Modal'
import Common from './vue/Common'
import Messages from './vue/Messages'

var Clipboard = require('clipboard')

export default {
  store,
  name: 'App',
  replace: false,
  components: {
    'sweet-alert': SweetAlert,
    'invite-link-modal': Modal
  },
  data () {
    return {
      searchQuery: '',
      routes: Routes,
      sharedState: {
        state: {
          selectedFile: { editing: false }
        },
        setSelectedFile (content) {
          this.state.selectedFile = content
        },
        getSelectedFile () {
          return this.state.selectedFile
        }
      },
      files: [],
      showInviteLinkModal: false,
      inviteLink: 'https://a-link.com',
      copied: false
    }
  },
  ready () {
    this.fetch()
  },
  events: {
    'open-invite-link-modal' () {
      var self = this
      var clipboard = new Clipboard('.clipboard', {
        text: function (trigger) {
          self.copied = true
          return trigger.value
        }
      })
      if (this.showInviteModal) {
        clipboard.destroy()
      }
      this.$set('showInviteLinkModal', !this.showInviteLinkModal)
    },
    'fetch' () {
      this.fetch()
    }
  },
  methods: {
    fetch () {
      this.fetchFiles()
    },
    fetchFiles () {
      var self = this
      Common.fetch(this.routes.allFiles).then(
        function (response) {
          self.$set('files', response.data)
          self.files.map(function (file) {
            file.selected = false
          })
        },
        function (response) {
          console.log('failed fetching files')
        }
      )
    }
  }
}
</script>

<style>
  @import '../node_modules/ace-css/css/ace.min.css';
  @import '../node_modules/animate.css/animate.css';

  body {
    font-family: Helvetica, sans-serif;
  }
  .v-link-active {
    color: #bada55;
  }

  [v-cloak] {
    display: none;
  }

  select, input {
    color: #8a8a8a;
    border-radius: 5px;
    margin: 5px;
    padding: 0.5rem;
  }

  select:hover, select:focus,
  input:hover, input:focus{
    color: #000;
    box-shadow: 0 0 20px;
  }

</style>
