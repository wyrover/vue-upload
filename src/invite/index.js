import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'

import {API_INVITE_ROUTES} from '../routes'

export default {
  /**
   * Send invite request(s) to the auth service in the form of a list of email addresses
   * */
  send (context, invite, redirect) {
    Common.put(API_INVITE_ROUTES.INVITE_URL, invite).then(
      function (response) {
        console.log('successfully invited ' + invite)
        doRedirect(redirect)
      },
      function (response) {
        context.error = 'add error checking'
      })
  },
  /**
   * Get a shareable invite url
   * */
  getShareable (context, invite, redirect) {
    Common.get(API_INVITE_ROUTES.INVITE_URL, invite).then(
      function (response) {
        console.log('successfully got shareable invite url: ' + invite)
        doRedirect(redirect)
      },
      function (response) {
        context.error = 'add error checking'
      })
  }
}
