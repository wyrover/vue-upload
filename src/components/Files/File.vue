<template>
  <div
    class="col bg-blue white p1 mt1 rounded"
    :class="{ 'muted': percent < 100 }">
    {{ name }}
  </div>

  <div
    class="col black p1 mt1 rounded">
    {{ percent }}%
  </div>

  <div class="clearfix"></div>
</template>

<script>
  export default {
    name: 'File',
    props: [ 'name', 'description', 'size', 'percent', 'extension' ],
    computed: {},
    events: {},
    methods: {}
  }
</script>
