<template>
  <div>

    <div class="col col-12">
      <input id="fileupload" type="file" name="files[]" data-url="http://laravel-storage.app/files" multiple>
      <div class="upload inline"></div>
    </div>

  </div>
</template>

<script>
  var _ = require('lodash')

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
    components: {
      'modal': Modal
    },
    data () {
      return {
        formdata: null
      }
    },
    props: [
      'routes',
      'shared-state'
    ],
    computed: {
    },
    events: {
    },
    ready () {
      var $ = require('jquery')
      var self = this
      this.$nextTick(function () {

        $.ajaxSetup({
          headers: '{ "Access-Control-Allow-Origin": "http://localhost:8080", "Access-Control-Allow-Headers": Content-Type, Content-Range, Content-Disposition, Content-Description" }'
        })

        $('#fileupload').fileupload({
          dataType: 'json',
          maxChunkSize: 10000000, // 10 MB
          add: function (e, data) {
            data.context = $('<button class="inline btn btn-primary"/>').text('Upload')
              .appendTo($('.upload'))
              .click(function () {
                data.context = $('<p class="inline"/>').html('Uploading&hellip;').replaceAll($(this))

                Common.post(self.routes.postFile, {}).then(
                function (response) {
                  self.$set('files', response.data)
                },
                function () {
                  console.log('failed uploading file(s)')
                })

              })
          },
          done: function (e, data) {
            data.context.text('Upload finished.')
          }

        })
      })

    },
    methods: {
    }
  }
</script>
