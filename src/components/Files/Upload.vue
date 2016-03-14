<template>
  <div>
    <!--console-->
    <div class="clearfix"></div>
    <div class="col m2">
      <div id="console"></div>
    </div>

    <!--dialog-->
    <div class="clearfix"></div>
    <div class="col-2 mx-auto uploader border border-silver rounded">
      <button  class="col col-12 btn btn-primary rounded bg-silver muted black p4" id="browse">Browse&hellip;</button>
      <div class="clearfix"></div>
      <button v-show="files.length" class="col col-8 p2 btn  rounded  blue" id="start-upload">{{ files.length ? 'Upload!' : 'Done!' }}</button>
      <button @click="cancel" v-show="files.length" class="col col-3 p2 ml2 h1 btn red">&times;</button>
      <div class="clearfix"></div>
    </div>

    <div class="clearfix"></div>

    <div class="col-6 mx-auto my2">
      <div v-for="file in files">
        <file
          :size="file.size"
          :description="file.description"
          :percent.sync="file.percent"
          :name="file.name">
        </file>
      </div>
    </div>


  </div>
</template>

<script>
  var _ = require('lodash')
  var $ = require('jquery')

  var plupload = require('Plupload/js/plupload.full.min.js')

  import Common from '../../vue/Common'
  import File from './File'

  export default {
    name: 'Upload',
    components: { File },
    data () {
      return {
        files: [],
        uploaded: []
      }
    },
    props: [ 'routes', 'shared-state' ],
    computed: {},
    events: {},
    ready () {
      var self = this
      this.$nextTick(function () {

        // https://github.com/moxiecode/plupload/wiki/Chunking

        var uploader = new plupload.Uploader({
          browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
          url: self.routes.postFile
        })

        uploader.init()

        uploader.bind('FilesAdded', function (up, files) {
          // var html = ''
          plupload.each(files, function (file) {
            self.files.push(file)
            // html += '<li class="bg-blue white p1 mt1 rounded list-reset" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></li>'
          })
          // document.getElementById('filelist').innerHTML += html
        })

        uploader.bind('UploadProgress', function (up, file) {
          // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + '%</span>'
        })

        uploader.bind('FileUploaded', function (up, file) {
          // Add completed file uploads to the uploaded collection
          self.uploaded = this.files.filter(function (thing) {
            return thing.status === 5
          })
          self.uploaded.map(function (thing) {
            self.files.$remove(thing)
          })
        })

        uploader.bind('Error', function (up, err) {
          document.getElementById('console').innerHTML += '\nError #' + err.code + ': ' + err.message
        })

        document.getElementById('start-upload').onclick = function () {
          uploader.start()
        }

      })
    },
    methods: {
      cancel () {
        this.$set('files', [])
        this.$set('queue', [])
      },
      send (data) {
        var self = this
        Common.post(this.routes.postFile, JSON.stringify(data)).then(
          function (response) {
            self.$set('files', response.data)
          },
          function () {
            console.log('failed uploading file(s)')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .uploader {
    box-shadow: 5px 14px 68px 18px;
    color: silver;
  }

</style>
