<template>
  <div>
    <!--vue-router - main navigation-->
    <div class="col col-12 p2 m0 h2">
      <!--login/sign out link-->
      <div class="right mr1 relative">
        <button v-if="!user.authenticated" @click="this.$emit('open-login-modal')" class="btn btn-primary h4 border-blue bg-white blue right">Sign in&#128273;</button>
        <button v-if="user.authenticated" @click="this.$emit('logout')" class="btn btn-primary border-silver h4 bg-white gray right">Sign out</button>
      </div>
      <!--welcome-->
      <div v-if="user.authenticated" class="right mr2 relative">
        <!--http://www.amp-what.com/unicode/search/face-->
        <button
          class="btn btn-primary h4 bg-white gray">
            <span v-if="user.authenticated">
              <span v-if="user.admin">
                <span class="muted">(<span class="blue">admin</span>)</span>
              </span>
              {{ user.email }}
              <span class="blue"> &#128060;</span>
            </span>
        </button>
      </div>
      <!--invite link-->
      <div class="right mr2 relative">
        <button v-if="user.authenticated" @click="this.$emit('open-invite-modal')" class="btn btn-primary h4 bg-white gray">Invites<span class="blue"> &#128587;</span><!--&#128588;--></button>
      </div>
      <!--search bar-->
      <div v-if="this.$route.path !== '/upload'" class="right mr2 relative">
        <input class="silver p1 h4 m0" v-model="searchQuery" type="text" name="search" placeholder="Search&hellip;" style="border: none">
        <button v-show="searchQuery" @click.prevent="searchQuery = ''" class="btn h1 red muted absolute top-0 right-0 p1">&times;</button>
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
    <invite-modal :show.sync="showInviteModal">
      <h3 class="center blue" slot="header">Invite someone! &#128588;</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <invites-component
          :invite-link="inviteLink">
        </invites-component>
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </invite-modal>

    <!--login dialog/modal-->
    <login-modal :show="!user.authenticated">
      <h3 class="center blue" slot="header">Login</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <login-component>
        </login-component>
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </login-modal>

  </div>
</template>

<script>
import Routes from './routes'
import Vue from 'vue'
import store from './store/content/index'

import auth from './auth'
import {API_AUTH_ROUTES} from './routes'
import {API_INVITE_ROUTES} from './routes'

import SweetAlert from './components/SweetAlert'
import Modal from './components/Modal'
import Login from './components/Auth/Login'
import Invites from './components/Auth/Invites'
import Common from './vue/Common'
import Messages from './vue/Messages'

export default {
  store,
  name: 'App',
  replace: false,
  components: {
    'sweet-alert': SweetAlert,
    'invite-modal': Modal,
    'login-modal': Modal,
    'login-component': Login,
    'invites-component': Invites
  },
  data () {
    return {
      user: auth.user,
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
      showInviteModal: false,
      showLoginModal: false,
      inviteLink: API_INVITE_ROUTES.INVITE_URL
    }
  },
  ready () {
    this.fetch()
  },
  events: {
    'open-login-modal' () {
      this.$set('showLoginModal', !this.showLoginModal)
    },
    'open-invite-modal' () {
      this.$set('showInviteModal', !this.showInviteModal)
    },
    'fetch' () {
      this.fetch()
    },
    'logout' () {
      auth.logout()
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
