<template>
  <div>
    <!--file info-->
    <span
      style="position: relative; background-color: rgba(255,255,255,0.5); border-color: rgba(0, 31, 63, .2);"
      class="col col-12 navy border border-navy right p1 mt1 rounded"
      :class="{ 'test': percent < 100 }">
      <!--remove button-->
      <button @click.prevent="this.$emit('remove')" class="right btn p1 h1 red">&times;</button>
      <button @click.prevent="this.$emit('edit')" class="right btn p1 h2 yellow">&#9998;</button>
      <!--file name-->
      <div v-if="!editing">{{ name }}</div>
      <div v-if="editing"><textarea v-model="name" class="col-8 border-none bg-navy white"></textarea></div>
      <span class="clearfix"></span>
      <file-icon
        class="right"
        :extension="extension">
      </file-icon>
      <div class="silver">{{ percent }}%</div>
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
  import FileIcon from './FileIcon'
  export default {
    name: 'File',
    components: { 'progress': Progress, 'file-icon': FileIcon },
    props: ['name', 'original_filename', 'description', 'size', 'percent', 'extension', 'base-path'],
    computed: {
      extension: function () {
        return this.name.split('.').pop()
      }
    },
    data () {
      return {
        selected: false,
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
    events: {
      'edit' () {
        this.editing = !this.editing
      }
    }
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
