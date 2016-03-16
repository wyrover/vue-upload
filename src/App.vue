<template>
  <div>
    <!--vue-router-->
    <div class="col col-12 p2 m0 h2">
      <input class="h3 right silver" v-model="searchQuery" type="text" name="search" placeholder="&#128269; Search&hellip;" style="border: none">
      <button v-link="{ path: '/files' }" class="btn silver">Files (<span class="muted">{{ files.length }}</span>)</button>
      <button v-link="{ path: '/upload' }" class="btn silver">Upload</button>
      <button v-link="{ path: '/gallery' }" class="btn silver">Gallery</button>
    </div>


    <!-- use router-view element as (dynamic component) route outlet -->
    <router-view
      :search-query="searchQuery"
      :routes="routes"
      :shared-state.sync="sharedState"
      :files.sync="files"
      keep-alive
      v-cloak>
    </router-view>

  </div>
</template>

<script>
import Routes from './routes'
import Vue from 'vue'
import store from './store/content/index'

import SweetAlert from './components/SweetAlert'
import Common from './vue/Common'
import Messages from './vue/Messages'

export default {
  store,
  name: 'App',
  replace: false,
  components: {
    SweetAlert
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
      files: []
    }
  },
  ready () {
    this.fetch()
  },
  events: {
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
  @import '../node_modules/animate.css/source/_base.css';

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
