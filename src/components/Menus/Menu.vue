<template>
  <div>
    <h1 style="color: #3d3d3d">{{ name }}</h1>
    <sort-list
      :list="menu"
      :name="name">
    </sort-list>
  </div>
</template>

<script>
  import SortList from '../SortList'
  export default {
    components: { 'sort-list': SortList },
    props: ['menu', 'name']
  }
</script>