<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-el="http://www.w3.org/1999/xhtml">
<div>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs list-reset" role="tablist">
            <li v-for="r in renderData" class="col"
                v-bind:class="{
                    'disabled': r.disabled
                }"
                @click.prevent="handleTabListClick($index, r)"
                :disabled="r.disabled"
            >
                <button class="p1 m1 btn"
                        :class="{
                            'regular': !($index === activeIndex),
                            'disabled': r.disabled
                         }"
                >
                    {{{ r.header }}} <span v-show="r.itemCount > 0" class="muted">({{{ r.itemCount }}})</span>
                </button>
            </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content" v-el:tab-content>
            <slot></slot>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
</template>

<script>
  // https://github.com/yuche/vue-strap/blob/master/src/Tabset.vue
  export default {
    props: {
      effect: {
        type: String,
        default: 'fadein'
      }
    },
    data () {
      return {
        renderData: [],
        activeIndex: 0
      }
    },
    methods: {
      handleTabListClick (index, el) {
        console.log('clicked')
        if (!el.disabled) this.$set('activeIndex', index)
      }
    }
  }
</script>

<style scoped>
    .nav-tabs {
        margin-bottom: 15px
    }
</style>
