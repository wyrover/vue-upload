<template>
  <div>
    <!--console-->
    <div class="clearfix"></div>
    <div class="col m2">
      <div id="console"></div>
    </div>

    <!--dialog-->
    <div class="clearfix"></div>
    <div class="col-3 mx-auto mt4 uploader">
      <!--browse button-->
      <!--n.b. see !important z-index setting in <style>, used to prevent button from appearing over modals, as z-index is set by plupload-->

      <button-component
        :id="'browse'"
        class="col col-12 p4 h1"
        :text="'Browse&hellip;'"
        :transition="'bounce'"
        :disabled="true"
        :rounded="true"
        :bg-color="bgNavy"
        :color="white">
      </button-component>

      <div class="clearfix"></div>
      <!--cancel button-->
      <button @click="cancel" v-show="queue.length" class="right p2 ml2 h1 btn red">&times;</button>
      <!--start upload button-->
      <button v-show="queue.length" class="col col-10 p2 btn rounded blue" id="start-upload">{{ 'Upload!' }}</button>

      <div class="clearfix"></div>
    </div>

    <div class="clearfix"></div>

    <div class="col-3 mx-auto my2">
      <div v-for="file in queue | filterBy searchQuery">
        <file
          @remove="remove(file)"
          style="position: relative"
          :size="file.size"
          :description="file.description"
          :percent.sync="file.percent"
          :base-path.sync="routes.getFile"
          :name="file.name">
        </file>
        <div class="clearfix"></div>
      </div>
    </div>

  </div>
</template>

<script>
  var _ = require('lodash')

  var plupload = require('Plupload/js/plupload.full.min.js')
  var fileTypes = require('./../../data/fileTypes.json')

  import Common from '../../vue/Common'
  import File from './File'

  import ButtonMixin from '../../mixins/Button'

  import ColorProps from '../../mixins/ColorProps'
  import StyleProps from '../../mixins/StyleProps'
  import DimensionProps from '../../mixins/DimensionProps'
  import StateProps from '../../mixins/StateProps'

  export default {
    name: 'Upload',
    mixins: [ButtonMixin, DimensionProps, StateProps, StyleProps, ColorProps],
    components: { File },
    data () {
      return {
        queue: [],
        uploaded: [],
        uploading: false,
        allowedFileTypes: fileTypes['allowed']
      }
    },
    props: ['search-query', 'routes', 'shared-state', 'files'],
    computed: {
      uploading: function () {
        return this.queue.length > 0
      }
    },
    ready () {
      var self = this
      this.$nextTick(function () {
        var uploader = new plupload.Uploader({
          browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
          url: 'http://laravel-storage.app/files/upload'
        })

        // Set the browse button's z-index to 0 because plupload sets it to '1'
        var browseButton = document.querySelector('#browse').style.zIndex = 0

        // https://github.com/moxiecode/plupload/wiki/Chunking
        // http://www.plupload.com/docs/Options

        uploader.init()
        uploader.settings.url = self.routes.postFile
        uploader.refresh()

        uploader.bind('FilesAdded', function (up, files) {
          // var html = ''
          plupload.each(files, function (file) {
            self.queue.push(file)
          })
        })

        uploader.bind('BeforeUpload', function (up, file) {
          up.settings.multipart_params = {fileId: file.id}
        })

        uploader.bind('FileUploaded', function (up, file) {
          // Add completed file uploads to the uploaded collection after adding some more info
          file.original_filename = file.name
          file.extension = file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2)
          file.hash = file.id
          file.downloadPath = `${self.routes.getFile}/${file.hash}`
          file.created_at = new Date()
          self.queue.$remove(file)
          self.files.push(file)
          self.uploaded = this.files.filter(function (thing) {
            return thing.status === 5
          })
        })

        uploader.bind('Error', function (up, err) {
          document.getElementById('console').innerHTML += '\nError #' + err.code + ': ' + err.message
        })

        document.getElementById('start-upload').onclick = function () {
          // Start uploading!
          uploader.start()
        }

      })
    },
    methods: {
      cancel () {
        this.$set('files', [])
        this.$set('queue', [])
      },
      remove (file) {
        this.queue.$remove(file)
      }
    }
  }
</script>

<style scoped>
  #browse {
    z-index: 0 !important;
  }
</style>
