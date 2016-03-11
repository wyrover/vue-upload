<template>
  <div class="border">
    <div style="max-height: 400px; overflow-y: scroll; padding-bottom: 0.5rem">

      <!--Layout select-->
      <select name="layouts" v-model="area" class="col col-10 border-none">
        <option v-for="area in areas" :value="$index">{{ area }}</option>
      </select>

    </div>
  </div>
</template>

<script>
  import Common from '../../vue/Common'

  export default {
    components: {

    },
    data () {
      return {
        area: 0,
        areas: [
          'area-1',
          'area-2',
          'area-3',
          'area-4'
        ]
      }
    },
    methods: {

    }
  }
</script>
