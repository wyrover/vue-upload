<template>
  <div
    class="cov-progress border-top rounded"
    style="border-color: rgba(255, 255, 255, 0.5)"
    :style="{
      'width': percent + '%',
      'height': options.height,
      'background-color': options.canSuccess ? options.color : options.failedColor,
      'border-outline': options.canSuccess ? options.color : options.failedColor,
      'opacity': options.show ? 1 : 0
    }">
  </div>
</template>

<script>
  export default {
    props: {
      percent: {
        type: Number,
        required: true
      },
      options: {
        type: Object,
        default () {
          return {
            canSuccess: true,
            color: 'rgb(143, 255, 199)',
            failedColor: 'red',
            show: false,
            height: '8px'
          }
        }
      }
    }
  }
</script>
