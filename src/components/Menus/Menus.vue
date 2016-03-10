<template>
    <div>
        <menu-component
          v-for="menu in menus"
          :menu.sync="menu.childrens"
          :name.sync="menu.name"
          :routes="routes">
        </menu-component>
    </div>
</template>

<script>
  import Menu from './Menu'
  export default {
    name: 'Menus',
    props: ['menus', 'routes'],
    components: {
      'menu-component': Menu
    }
  }
</script>
