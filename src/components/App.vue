<template>
  <div>
    <!--vue-router - main navigation-->
    <div class="col col-12 p2 m0 h2">

      <!--login/sign out link-->
      <div class="right mr1 relative">
        <tooltip-component hint="See you soon!" placement="bottom">
          <span slot="html">
           <button v-if="user.authenticated" @click="this.$emit('logout')" class="btn btn-primary border-silver h4 bg-white gray right">Sign out</button>
          </span>
        </tooltip-component>
        <tooltip-component hint="Sign in with your username and password" placement="bottom">
          <span slot="html">
           <button v-if="!user.authenticated" @click="this.$emit('open-login-modal')" class="btn btn-primary h4 border-blue bg-white blue right">Sign in&#128273;</button>
          </span>
        </tooltip-component>
      </div>

      <!--enable/disable tooltips-->
      <div class="right mr2 relative">
        <tooltip-component hint="Enable helpful hints and tips" placement="bottom">
            <span slot="html">
              <!--enable tooltips-->
              <button
                v-if="user.authenticated"
                @click="this.$emit('toggle-tooltips') | debounce 200"
                class="btn btn-primary h4 bg-white gray">
                Help <span v-if="tooltips" class="green animated" transition="bounce">&check;</span>
              </button>
            </span>
        </tooltip-component>
      </div>

      <!--only show the following when logged in-->
      <div v-if="user.authenticated">

        <!--welcome-->
        <div v-if="user.authenticated" class="right mr2 relative">
          <!--http://www.amp-what.com/unicode/search/face-->

          <tooltip-component hint="Manage your user profile settings" placement="bottom">
              <span slot="html">
                <button
                  @click="this.$emit('open-management-modal')"
                  class="btn btn-primary h4 bg-white gray">
                  <span v-if="user.authenticated">
                    <span v-if="user.admin">
                      <span class="muted">(<span class="blue">admin</span>)</span>
                    </span>
                    {{ user.email }}
                    <!--gravatar-->
                    <gravatar-component
                      :email="user.email"
                      :circle="true"
                      :height="12"
                      :width="12">
                    </gravatar-component>
                  </span>
                </button>
              </span>
          </tooltip-component>

        </div>

        <!--invite link-->
        <div class="right mr2 relative">
          <tooltip-component hint="Send invites to people!" placement="bottom">
            <span slot="html">
              <button
                v-if="user.authenticated"
                @click="this.$emit('open-invite-modal')"
                class="btn btn-primary h4 bg-white gray">
                  Invites<span class="blue"> &#128587;</span>
              </button>
            </span>
          </tooltip-component>
        </div>

        <!--search bar-->
        <div v-if="this.$route.path !== '/upload'" class="right mr2 relative">
          <tooltip-component hint="Search for files" placement="left">
            <span slot="html">
              <input class="silver p1 h4 m0" v-model="searchQuery" type="text" name="search" placeholder="Search&hellip;" style="border: none">
              <button v-show="searchQuery" @click.prevent="searchQuery = ''" class="btn h1 red muted absolute top-0 right-0 p1">&times;</button>
            </span>
          </tooltip-component>
        </div>

        <!--upload component-->
        <tooltip-component hint="Upload your files!" placement="bottom">
          <span slot="html">
            <button v-link="{ path: '/upload' }" class="btn silver">
              <span v-if="this.$route.path === '/upload'">&#8686;</span><span v-else="">&#8679;</span> Upload
            </button>
          </span>
        </tooltip-component>

        <!--files view component-->
          <tooltip-component hint="View and edit all uploaded files" placement="bottom">
          <span slot="html">
            <button v-link="{ path: '/files' }" class="btn silver">
              <span v-if="this.$route.path === '/files'">&#128194;</span><span v-else="">&#128193;</span> Files (<small class="muted">{{ files.length }}</small>)
            </button>
          </span>
        </tooltip-component>

        <!--gallery component-->
        <tooltip-component hint="View and search for files in the Gallery" placement="right">
          <span slot="html">
            <button v-link="{ path: '/gallery' }" class="btn silver">Gallery</button>
          </span>
        </tooltip-component>

      </div>
    </div>

    <!--sweet alerts, bruh-->
    <sweet-alert
     :title="'A title'"
     :text="'Whoa, easy there buddy&hellip;'"
     :type="'danger'">
    </sweet-alert>

    <!-- use router-view element as (dynamic component) route outlet -->
    <!-- todo: investigate potential indexOf error -->
    <router-view
      v-if="user.authenticated"
      @deletedSomething="this.$sweetAlert.$emit('alert')"
      :search-query="searchQuery"
      :routes="routes"
      :shared-state.sync="sharedState"
      :files.sync="files"
      keep-alive v-cloak>
    </router-view>

    <!--invite link dialog/modal-->
    <invite-modal
      :show.sync="showInviteModal"
      v-if="user.authenticated">
      <h3 class="center blue" slot="header">Invite someone! &#128588;</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <invites-component
          :invite-link="inviteLink"
          @invite-users="inviteUsers">
        </invites-component>
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </invite-modal>

    <!--user profile link dialog/modal-->
    <management-modal
     :show.sync="showManagementModal"
     v-if="user.authenticated">
      <h3 class="center blue" slot="header">Your profile</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <management-component
          :user="user">
        </management-component>
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </management-modal>

    <!--login dialog/modal-->
    <login-modal
      :show="!user.authenticated"
      :can-close="false">
      <h3 class="center blue" slot="header">Login</h3>
      <div slot="body" class="center border-top border-bottom border-silver">
        <login-component
         @login="login">
        </login-component>
      </div>
      <div slot="buttons"></div>
      <div slot="footer"></div>
    </login-modal>

  </div>
</template>

<script>
import Routes from '../routes'
import Vue from 'vue'
import store from '../store/content/index'

import auth from '../auth'
import invite from '../invite'

import Common from '../vue/Common'
import Messages from '../vue/Messages'
import {API_AUTH_ROUTES} from '../routes'
import {API_INVITE_ROUTES} from '../routes'

import SweetAlert from '../components/SweetAlert'
import Modal from '../components/Modal'
import Login from '../components/Auth/Login'
import Invites from '../components/Auth/Invites'
import Management from '../components/Auth/Management'

import Gravatar from '../components/Gravatar'

import ButtonMixin from '../mixins/Button'
import GlobalMixin from '../mixins/Global'

export default {
  store,
  name: 'App',
  mixins: [GlobalMixin, ButtonMixin],
  replace: false,
  components: {
    'sweet-alert': SweetAlert,
    'invite-modal': Modal,
    'login-modal': Modal,
    'management-modal': Modal,
    'invites-component': Invites,
    'login-component': Login,
    'management-component': Management,
    'gravatar-component': Gravatar
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
      showManagementModal: false,
      inviteLink: 'Please wait',
      tooltips: true
    }
  },
  ready () {
    this.fetch()
    this.$broadcast('show-tooltips', this.tooltips)
  },
  events: {
    'button-clicked' () {
      console.log('clicked')
    },
    'open-login-modal' () {
      this.$set('showLoginModal', !this.showLoginModal)
    },
    'open-management-modal' () {
      this.$set('showManagementModal', !this.showManagementModal)
    },
    'open-invite-modal' () {
      var self = this
      var ajaxPromise = invite.getShareable(self.$data)
      new Promise(function (resolve, reject) {
        self.$set('showInviteModal', !self.showInviteModal)
        resolve(ajaxPromise)
      }).then(function (shareableUrl) {
        self.$set('inviteLink', shareableUrl)
      })
    },
    'fetch' () {
      this.fetch()
    },
    'logout' () {
      auth.logout()
    }
  },
  methods: {
    login (credentials) {
      auth.login(this, credentials, false)
    },
    inviteUsers (vm) {
      var newInvite = {
        initiator_id: this.user.id,
        // Split and trim invite emails list
        'recipients[]': vm.$data.inviteEmailAddresses.split(/[\s,]+/),
        comment: vm.$data.inviteComment
      }
      invite.send(this, newInvite, false)
    },
    fetch () {
      this.fetchFiles()
      this.fetchInvites()
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
    },
    fetchInvites () {
      this.$set('invites', invite.getAll())
    }
  }
}
</script>

<style>
  @import '../../node_modules/ace-css/css/ace.min.css';
  @import '../../node_modules/animate.css/animate.css';

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

  :disabled {
    cursor: not-allowed;
  }

</style>
