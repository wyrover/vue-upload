<template>
  <div>

    <!--Column headings-->
    <div class="col col-12 p1 bold blue">
      <span
        class="col col-2"
        v-for="column in columns"
        @click="sortBy(column)"
        :class="{ 'active': sortKey == column }">
        {{ column | capitalize }}
      </span>
    </div>

    <div class="clearfix"></div>

  </div>
</template>

<script>
  var _ = require('lodash')
  import Common from '../../vue/Common'
  import Modal from './../Modal'
  export default {
    name: 'Pages',
    components: {
      'modal': Modal
    },
    data () {
      return {
        columns: ['name', 'description', 'type']
      }
    },
    props: [
      'routes',
      'shared-state'
    ],
    computed: {
    },
    events: {
    },
    methods: {
    }
  }
</script>
