<template>
  <div class="mx-auto col-8">
    <div
      v-for="file in files | filterBy searchQuery"
      v-show="canPreview(file)">
        <img
          class="col col-1 m1 rounded"
          :src="'http://laravel-storage.app/files/images/preview/' + file.hash + '.' + file.extension"
          :alt="file.original_filename" :title="file.original_filename">
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
    props: ['search-query', 'files'],
    methods: {
      canPreview (file) {
        return fileTypes['preview'].indexOf(file.extension.toLowerCase()) > -1
      },
      isFileType (type, name) {
        console.log(fileTypes[type])
        console.log(fileTypes[type].indexOf(name))
        return fileTypes[type].indexOf(name) > -1
      }
    }
  }
</script>
