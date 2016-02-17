<template>
  <div id="app" class="green">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import 'ace-css/css/ace.min.css'
import Hello from './components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style>
  @import '../node_modules/ace-css/css/ace.min.css';

  body {
    font-family: Helvetica, sans-serif;
  }
</style>

