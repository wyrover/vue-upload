<template>
  <span>
    <button
      @click.prevent="select"
      class="col col-1 btn flag-wrapper m1 flag-icon-background flag-icon-{{ country.iso_3166_2.toLowerCase() }} {{ !selected ? 'muted' : '' }}"
      :title="country.name">
        &nbsp;
    </button>
  </span>
</template>

<script>
  export default {
    props: {
      country: { type: Object, required: true },
      selected: { type: Boolean, required: false, default: false }
    },
    methods: {
      select () {
        this.selected = !this.selected
      }
    }
  }
</script>

<style scoped>
  @import "../../../node_modules/flag-icon-css/css/flag-icon.css";
  .flag-wrapper {
    width: 25px;
    height: 25px;
  }
</style>
