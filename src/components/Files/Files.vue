<template>
  <div>

    <!--Column headings-->
    <div class="col col-12 p1 bold blue">
      <span
        class="col col-2"
        v-for="column in columns"
        :class="{ 'active': sortKey == column }">
        {{ column | capitalize }}
      </span>
    </div>

    <div class="clearfix"></div>

    <div class="col col-12 m1 gray border-bottom border-gray" v-for="file in files">
      <div class="col col-2">
        <small>
          {{ file.original_filename }}
        </small>
      </div>
      <div class="col col-2">
        <small>
          {{ file.description ? file.description : 'No description'}}
        </small>
      </div>
      <div class="col col-2">
        <small>
          {{ file.size }}
        </small>
      </div>
      <div class="col col-2">
        <small>
          {{ file.extension }}
        </small>
      </div>
      <div class="col">
        <button class="btn btn-outline orange">Edit</button>
        <button class="btn btn-primary">Download</button>
      </div>
    </div>

    <div class="clearfix"></div>

  </div>
</template>

<script>
  var _ = require('lodash')
  import Common from '../../vue/Common'
  import File from './File'
  export default {
    name: 'Files',
    components: {},
    data () {
      return {
        columns: ['name', 'description', 'size', 'type']
      }
    },
    props: [ 'routes', 'shared-state', 'files' ],
    computed: {},
    events: {},
    methods: {}
  }
</script>
