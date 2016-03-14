<template>
  <div>
    <!--file info-->
    <div
      style="position: relative"
      class="col bg-navy white p1 mt1 rounded"
      :class="{ 'muted': percent < 100 }">
      {{ name }}
      <!--upload percentage-->
      <progress
        :percent.sync="percent"
        :options="progressOptions">
      </progress>
    </div>

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
          color: 'rgba(255, 255, 255, .8)',
          failedColor: 'red',
          height: '5px'
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
    bottom: 0;
    left: 0;
    height: 15px;
    width: 0;
    transition: width 0.2s, opacity 0.6s;
    opacity: 1;
    background-color: #73ccec;
    z-index: 999999;
  }
</style>
