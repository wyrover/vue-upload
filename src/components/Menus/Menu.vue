<template>
  <div>
    <sort-list
      :list="menu.Main">
    </sort-list>
  </div>
</template>

<script>
  import SortList from '../SortList'
  export default {
    components: { 'sort-list': SortList },
    props: ['menu']
  }
</script>