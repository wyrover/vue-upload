<template>
    <div>
        <h1 style="color: #3d3d3d">Main menu</h1>
        <menu-component
          v-for="menu in menus"
          :menu.sync="menu">
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