<script>
  export default {
    props: {
      content: 'default message',
      type: 'info',
      theme: 'flat',
      extraClasses: 'messenger-fixed messenger-on-top',
      showCloseButton: true
    },
    events: {
      'messenger-notify': function (message) {
        // `this` in event callbacks are automatically bound
        // to the instance that registered it
        if (message) {
          message.content ? this.content = message.content : null
          message.type ? this.type = message.type : null
          message.showCloseButton ? this.showCloseButton = message.showCloseButton : null
          console.log(message)
        }
      },
      'messenger-options': function (options) {
        if (options) {
          // Messenger.options = {
          //   extraClasses: options.extraClasses ? options.extraClasses : 'messenger-fixed messenger-on-right messenger-on-bottom',
          //   theme: options.theme ? options.theme : 'flat'
          // }
        }
      }
    },
    methods: {
      post () {
        // Messenger.post({
        //   message: this.content,
        //   type: this.type,
        //   showCloseButton: this.showCloseButton
        // })
      }
    }
  }
</script>

<style scoped>
  @import '../assets/bower/messenger/build/css/messenger.css';
</style>