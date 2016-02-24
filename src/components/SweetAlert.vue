<script>
  import 'sweetalert/dist/sweetalert.css'
  var SweetAlert = require('sweetalert')
  export default {
    props: {
      title: { type: String, required: false },
      text: { type: String, required: true },
      type: { type: String, required: true },
      showCancelButton: { type: Boolean, required: false, default: false },
      confirmButtonColor: { type: String, required: false },
      confirmButtonText: { type: String, required: false, default: 'Sure you wanna do that?' },
      closeOnConfirm: { type: Boolean, required: false, default: false },
      imageUrl: { type: String, required: false }
    },
    ready () {
      var self = this
      var confirmCallback = function (isConfirm) {
        if (isConfirm) {
          self.alert(alert, confirmCallback)
        } else {
          self.alert(alert, confirmCallback)
        }
      }
      var alert = { title: 'Yo', text: 'Hi there!', type: 'success' }
      // this.alert(alert, confirmCallback)
    },
    events: {
      'alert' (alert, confirmCallback) {
        this.alert(alert, confirmCallback)
      }
    },
    methods: {
      alert (alert, confirmCallback) {
        console.log(alert)
        SweetAlert(alert, confirmCallback)
      }
    }
  }
</script>
