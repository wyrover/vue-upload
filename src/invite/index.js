import Common from '../vue/Common'
import {router} from '../main'
import {API_INVITE_ROUTES} from '../routes'

export default {
  /**
   * Send invite request(s) to the auth service in the form of a list of email addresses
   * */
  send (context, invite, redirect) {
    var self = this
    Common.put(API_INVITE_ROUTES.INVITE_URL, invite).then(
      function (response) {
        console.log('successfully invited ' + invite)
        if (redirect) {
          router.go(redirect)
        }
      },
      function (response) {
        context.error = 'add error checking'
      })
  }
}
