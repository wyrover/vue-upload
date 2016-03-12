<template>
  <div>
    <!--vue-router-->
    <div class="col col-12 bg-black p2 m0">
      <a v-link="{ path: '/files' }" class="btn silver">Files</a>
    </div>

    <!-- use router-view element as (dynamic component) route outlet -->
    <router-view
      :routes="routes"
      :shared-state.sync="sharedState"
      keep-alive>
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
      this.fetchResources()
    },
    fetchResources () {
      var self = this
      Common.fetch(this.routes.allFiles).then(
        function (response) {
          self.$set('resources', response.data)
        },
        function () {
          console.log('failed fetching resources')
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
    color: #ff599c;
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
