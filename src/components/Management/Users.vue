<template>

</template>

<script>
  export default {
    data () {
      return {
        types: ['identicon', 'mm', 'wavatar', 'retro', 'blank']
      }
    },
    props: {
      'users': { type: Object, required: true }
    }
  }
</script>
