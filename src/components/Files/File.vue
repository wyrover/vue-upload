<template>
  <div>
    <!--file info-->
    <span
      style="position: relative"
      class="col col-12 bg-navy white right p1 mt1 rounded"
      :class="{ 'test': percent < 100 }">
      <!--remove button-->
      <button @click="this.$emit('remove')" class="right btn p1 h1 red">&times;</button>
      <!--file name-->
      {{ name }}
      <!--upload percentage-->
      <progress
        :percent.sync="percent"
        :options="progressOptions">
      </progress>
    </span>
  </div>
</template>

<script>
  import Progress from './../Progress'
  export default {
    name: 'File',
    components: { 'progress': Progress },
    props: [ 'name', 'original_filename', 'description', 'size', 'percent', 'extension', 'base-path' ],
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
