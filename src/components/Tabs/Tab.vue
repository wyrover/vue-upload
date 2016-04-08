<template>
  <div
    role="tabpanel"
    class="tab-pane"
    v-show="show">
    <slot></slot>
  </div>
</template>

<script>
  // https://github.com/yuche/vue-strap/blob/master/src/Tab.vue
  export default {
    props: {
      header: { type: String },
      disabled: { type: Boolean, default: false }
    },
    data () {
      return { index: 0, show: true }
    },
    computed: {
      show () {
        return (this.$parent.activeIndex === parseInt(this.index, 10))
      }
    },
    created () {
      this.$parent.renderData.push({
        header: this.header,
        disabled: this.disabled
      })
    },
    ready () {
      for (var c in this.$parent.$children) {
        if (this.$parent.$children[c].$el === this.$el) {
          this.index = c
          break
        }
      }
    }
  }
</script>

<style scoped>
  .tab-content > .tab-pane {
    display: block;
  }
</style>
