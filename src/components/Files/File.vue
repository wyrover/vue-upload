<template>
  <div>
    <!--file info-->
    <div
      class="col bg-blue white p1 mt1 rounded"
      :class="{ 'muted': percent < 100 }">
      {{ name }}
    </div>
    <!--upload percentage-->
    <div
      class="col black p1 mt1 rounded">
      {{ percent }}%
    </div>
    <!--vue-progress-->
    <progress
      :percent.sync="percent"
      :options="progressOptions">
    </progress>
  </div>
</template>

<script>
  import Progress from './../Progress'
  export default {
    name: 'File',
    components: { 'progress': Progress },
    props: [ 'name', 'description', 'size', 'percent', 'extension' ],
    data () {
      return {
        progressOptions: {
          show: true,
          canSuccess: true,
          color: 'rgb(145, 255, 0)',
          failedColor: 'red',
          height: '16px'
        }
      }
    },
    computed: {},
    events: {},
    methods: {}
  }
</script>

<style>
  .cov-progress {
    position: absolute;
    height: 2px;
    width: 0;
    transition: width 0.2s, opacity 0.6s;
    opacity: 1;
    background-color: #73ccec;
    z-index: 999999;
  }
</style>
