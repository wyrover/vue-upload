<template>
    <div>
        <div
          v-for="file in files"
          v-show="file.extension === 'jpg'">
            <img :src="'/files/' + file.hash" :alt="file.original_filename">
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Gallery',
      props: [
        'files'
      ]
    }
</script>
