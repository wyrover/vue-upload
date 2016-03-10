<template>
  <div>
    <h1 style="color: #3d3d3d">{{ name }}</h1>
    <sort-list
      :list="menu"
      :name="name"
      @sorted="this.$emit('update', $data)" cloak>
    </sort-list>
  </div>
</template>

<script>
  import SortList from '../SortList'
  import Common from '../../vue/Common'
  export default {
    components: { 'sort-list': SortList },
    props: ['menu', 'name', 'routes'],
    events: {
      'update' (menu) {
        console.log('up[date')
        var self = this
        Common.patch(this.routes.updateMenu, JSON.stringify(menu)).then(function (response) {
          var data = response.data
          if (data) {
            self.$set('menu', data)
            console.log(data)
          } else {
            console.log('a bad happened')
          }
          self.$dispatch('fetch-menus')
        }, function (response) {})
      }
    }
  }
</script>
