<template>
    <div class="modal-mask" v-show="show" transition="modal">
        <div class="modal-wrapper">
            <div class="col col-12 modal-container">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                    <slot name="buttons">
                        Some buttons
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="close">
                        default footer
                        <button @click="show = false" class="btn btn-primary modal-default-button">
                            Close
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    events: {
      'close-modal' () {
        this.$set('show', false)
      }
    },
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      content: '',
      name: ''
    },
    computed: {
      update () {
        this.$nextTick(() => this.show = true)
      }
    }
  }
</script>

<style scoped>
    .modal-mask {

        background-color: rgba(255, 255, 255, 0.90);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        /*position: absolute;*/
        /*top: 0px;*/
        /*bottom: 0px;*/
        min-height: 500px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-default-button {
        float: right;
    }

    /*
     * the following styles are auto-applied to elements with
     * v-transition="modal" when their visiblity is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
