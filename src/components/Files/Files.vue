<template>
  <div>

    <!--Column headings-->
    <div v-if="files.length" class="col col-12 p1 bold blue" v-cloak>
      <span
        v-for="column in columns"
        class="col {{ 'col-' + column.size }}">
        {{ column.name | capitalize }}
      </span>
    </div>

    <div v-else="files.length" class="col col-12 h1 p4 center" v-cloak>
      <p class="silver">No files here&hellip; Yet!</p>
      <a v-link="{ path: '/upload' }"  class="btn btn-primary p3 white">Add files</a>
    </div>

    <div class="clearfix"></div>

    <div v-for="file in files | filterBy searchQuery" v-el="row" class="col col-12 m1 py1 gray border-bottom border-gray">
      <div class="col col-3">
        <small>
          {{ file.original_filename }}
        </small>
      </div>
      <div class="col col-2">
        <small>
          {{ file.description ? file.description : 'No description'}}
        </small>
      </div>
      <div class="col col-1">
        <small>
          {{ file.size }}
        </small>
      </div>
      <div class="col col-1">
        <small>
          {{ file.created_at }}
        </small>
      </div>
      <div class="col col-1">
        <file-icon :extension="file.extension"></file-icon>
      </div>
      <div class="col-3 right">
        <!--edit button-->
        <button class="btn btn-primary">Edit</button>
        <!--download button-->
        <a :href="file.downloadPath" class="btn blue">Download</a>
        <!--preview button-->
        <button
          v-show="canPreview(file)"
          class="btn green">
          Preview
        </button>
        <!--delete button-->
        <button @click="destroy(file)" class="btn red h1">&times;</button>
      </div>
    </div>

    <div class="clearfix"></div>

  </div>
</template>

<script>
  var _ = require('lodash')
  import Common from '../../vue/Common'
  var fileTypes = require('./../../data/fileTypes.json')
  import File from './File'
  import FileIcon from './FileIcon'
  export default {
    name: 'Files',
    components: {
      'file-icon': FileIcon
    },
    data () {
      return {
        columns: [
          { name: 'name', size: 3 },
          { name: 'description', size: 2 },
          { name: 'size', size: 1 },
          { name: 'uploaded', size: 1 },
          { name: 'type', size: 1 }
        ],
        fileTypes: {},
        previewable: fileTypes['preview']
      }
    },
    props: ['search-query', 'routes', 'shared-state', 'files'],
    methods: {
      selectAll () {
        this.files.forEach(function (thisFile) {
          thisFile.selected = true
          console.log(thisFile.selected)
        })
      },
      canPreview (file) {
        return !this.previewable.indexOf(file.extension ? file.extension.toLowerCase() : false)
      },
      destroy (file) {
        var self = this
        Common.destroy(`${this.routes.deleteFile}/${file.hash}`).then(
          function (response) {
            self.files.$remove(file)
          },
          function () {
            console.log('failed deleting file(s)')
          }
        )
      }
    }
  }
</script>
