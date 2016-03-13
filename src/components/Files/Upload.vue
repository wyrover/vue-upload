<template>
  <div>
    <div class="col col-12">
      <input id="fileupload" v-el="fileInput" type="file" name="files[]" data-url="http://laravel-storage.app/files/upload" @change="onFileChange" multiple>
      <div class="upload inline"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  var _ = require('lodash')
  var $ = require('jquery')

  /* The jQuery UI widget factory, can be omitted if jQuery UI is already included */
  require('imports?define=>false&exports=>false!blueimp-file-upload/js/vendor/jquery.ui.widget.js')
  /* The Iframe Transport is required for browsers without support for XHR file uploads */
  require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.iframe-transport.js')
  /* The basic File Upload plugin */
  require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload.js')
  /* The File Upload processing plugin */
  require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-process.js')
  /* The File Upload validation plugin */
  require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-validate.js')

  import Common from '../../vue/Common'
  import Modal from './../Modal'
  export default {
    name: 'Upload',
    components: { Modal },
    data () { return { files: [] } },
    props: [ 'routes', 'shared-state' ],
    computed: {},
    events: {},
    http: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    ready () {
      var self = this
      this.$nextTick(function () {
        $('#fileupload').fileupload({
          dataType: 'multipart/form-data',
          maxChunkSize: 10000000, // 10 MB
          add (e, data) {
            data.context = $('<button class="inline btn btn-primary"/>')
            .text('Upload')
            .appendTo($('.upload'))
            .click(function () {
              data.context = $('<p/>').html('Uploading&hellip;').replaceAll($(this))
              data.submit()
            })
          },
          done (e, data) {
            data.context.text('Upload finished.')
          }
        })
      })
    },
    methods: {
      onFileChange (e) {

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
  #fileupload {
    padding: 1.5rem;
    margin: 1.5rem;
  }
</style>
