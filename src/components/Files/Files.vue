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
      <p class="silver">Loading files&hellip; Please wait.</p>
      <tooltip-component hint="Click to go to the Uploader" placement="right">
        <span slot="html">
          <a v-link="{ path: '/upload' }"  class="btn btn-primary p3 white">Add files</a>
        </span>
      </tooltip-component>
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

        <tooltip-component hint="File type" placement="right">
          <span slot="html">
            <file-icon :extension="file.extension"></file-icon>
          </span>
        </tooltip-component>

      </div>
      <div class="col-3 right">

        <!--edit button-->
        <tooltip-component hint="Edit this files details" placement="top">
          <span slot="html">
            <button class="btn btn-primary">Edit</button>
          </span>
        </tooltip-component>

        <!--download button-->
        <tooltip-component hint="Download this file to your computer" placement="top">
          <span slot="html">
        <a :href="file.downloadPath" class="btn blue">Download</a>
          </span>
        </tooltip-component>

        <!--preview button-->
        <tooltip-component hint="Preview this file in a new window" placement="top">
          <span slot="html">
            <button
              v-show="canPreview(file)"
              class="btn green">
              Preview
            </button>
          </span>
        </tooltip-component>

        <!--delete button todo: add confirmation-->
        <tooltip-component hint="Permanently delete this file (this CANNOT be undone)" placement="top" level="warning">
          <span slot="html">
            <button @click="destroy(file)" class="btn red h1">&times;</button>
          </span>
        </tooltip-component>
      </div>
    </div>

    <div class="clearfix"></div>

  </div>
</template>

<script>
  var _ = require('lodash')
  var fileTypes = require('./../../data/fileTypes.json')

  import Common from '../../vue/Common'
  import File from './File'
  import FileIcon from './FileIcon'

  import GlobalMixin from '../../mixins/Global'

  export default {
    name: 'Files',
    mixins: [GlobalMixin],
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
        self.files.$remove(file.dele)
        Common.destroy(`${this.routes.deleteFile}/${file.hash}`).then(
          function (response) {

          },
          function () {
            console.log('failed deleting file(s)')
          }
        )
      }
    }
  }
</script>
