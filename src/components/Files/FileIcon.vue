<template>
  <div>
    <button
      class="btn p1 btn-primary bg-white sf sf-2x sf-colorful"
      :class="'sf-' + getIconClass(extension)"
      :alt="getIconClass(extension)"
      title="{{ getIconClass(extension) | capitalize }} file">
    </button>
  </div>
</template>

<script>
  import 'square-file-icons'
  var fileTypes = require('./../../data/fileTypes.json')
  export default {
    name: 'FileIcon',
    props: ['extension'],
    data () { return { type: 'default' } },
    methods: {
      getIconClass (extension) {
        if (extension) {
          var extensionToLower = extension.toLowerCase()
          if (fileTypes['image'].indexOf(extensionToLower) !== -1) { return 'image' }
          if (fileTypes['video'].indexOf(extensionToLower) !== -1) { return 'powerpoint' }
          if (fileTypes['audio'].indexOf(extensionToLower) !== -1) { return 'excel' }
          if (fileTypes['pdf'].indexOf(extensionToLower) !== -1) { return 'pdf' }
          if (fileTypes['presentation'].indexOf(extensionToLower) !== -1) { return 'powerpoint' }
          if (fileTypes['document'].indexOf(extensionToLower) !== -1) { return 'word' }
          if (fileTypes['code'].indexOf(extensionToLower) !== -1) { return 'text' }
          if (fileTypes['text'].indexOf(extensionToLower) !== -1) { return 'text' }
          if (fileTypes['archive'].indexOf(extensionToLower) !== -1) { return 'image' }
        } else {
          return 'default'
        }

      }
    }
  }
</script>
