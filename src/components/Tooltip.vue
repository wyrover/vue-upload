<template>
    <span :class="{
            'hint--top':     placement === 'top',
            'hint--left':    placement === 'left',
            'hint--right':   placement === 'right',
            'hint--bottom':  placement === 'bottom',
            'hint--error':   level === 'error',
            'hint--warning': level === 'warning',
            'hint--info':    level === 'info',
            'hint--success': level === 'success'
          }"
          class="hint--rounded"
          data-hint="{{ hint }}">
        {{ text }}
    </span>
</template>

<script>
    // https://github.com/yuche/vue-strap/blob/master/src/Tab.vue
    export default {
        props: {
            hint: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            placement: {
                type: String,
                required: false,
                default() { return 'top' }
            },
            level: {
                type: String,
                required: false,
                default() { return 'info' }
            }
        },
        data() {
            return {
                index: 0,
                show: false,
                animation: {
                    type: String,
                    required: true
                }
            }
        },
        ready() {}
    }
</script>
