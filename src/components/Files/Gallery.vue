<template>
  <div class="mx-auto col-8">
    <div
      v-for="file in files | filterBy searchQuery"
      v-show="canPreview(file)">
        <div class="col col-1 m1 relative">
          <img
            class="rounded"
            :src="routes.previewFile + '/' + file.hash + '.' + file.extension"
            :alt="file.original_filename" :title="file.original_filename">
            <!--delete button-->
            <button @click="destroy(file)" class="absolute top-0 right-0 delete btn p1 red h1">&times;</button>
        </div>
    </div>
  </div>
</template>

<script>
  var fileTypes = require('./../../data/fileTypes.json')
  export default {
    name: 'Gallery',
    data () {
      return {
        editing: false,
        progressOptions: {
          show: true,
          canSuccess: true,
          color: '#bada55',
          failedColor: 'red',
          height: '5px'
        }
      }
    },
    props: ['routes', 'search-query', 'files'],
    methods: {
      canPreview (file) {
        return fileTypes['previewVisual'].indexOf(file.extension.toLowerCase()) > -1
      },
      isFileType (type, name) {
        console.log(fileTypes[type])
        console.log(fileTypes[type].indexOf(name))
        return fileTypes[type].indexOf(name) > -1
      }
    }
  }
</script>
