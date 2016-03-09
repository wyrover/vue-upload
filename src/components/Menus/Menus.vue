<template>
    <div>
        <menu-component
          v-for="menu in menus"
          :menu.sync="menu.childrens"
          :name.sync="menu.name">
        </menu-component>
    </div>
</template>

<script>
  import Menu from './Menu'
  export default {
    name: 'Menus',
    props: ['menus'],
    components: {
      'menu-component': Menu
    }
  }
</script>