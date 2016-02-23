<template>
  <div
    role="tabpanel"
    class="tab-pane"
    :class="{}"
    v-show="true"
    :transition="transition">
    <slot></slot>
  </div>
</template>

<script>
  // https://github.com/yuche/vue-strap/blob/master/src/Tab.vue
  export default {
    props: {
      header: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
      /*            itemCount: {
       type: Number,
       default: 0
       },*/
      /*            showItemCount: {
       type: Boolean,
       default: false
       }*/
    },
    data () {
      return {
        index: 0,
        show: true
      }
    },
    computed: {
      show () {
        console.log('activeIndex: ' + (this.$parent.activeIndex))
        console.log('this index: ' + (this.index))
        return (this.$parent.activeIndex === this.index)
      },
      transition () {
        return this.$parent.effect
      }
    },
    created () {
      this.$parent.renderData.push({
        header: this.header,
        showItemCount: this.showItemCount,
        itemCount: this.itemCount,
        disabled: this.disabled
      })
      // console.log(this.itemCount)
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
