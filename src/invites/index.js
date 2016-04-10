import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'

import {API_INVITE_ROUTES} from '../routes'

export default {
  shareableUrl: null,
  invites: [],
  /**
   * PUT invite request(s) to the auth service in the form of a list of email addresses
   */
  send (context, invite, redirect) {
    Common.put(API_INVITE_ROUTES.INVITE, invite).then(
      function (response) {
        console.log('successfully invited ' + invite)
        doRedirect(redirect)
      },
      function (response) {
        context.error = 'add error checking'
      })
  },
  /**
   * POST required info for a shareable invite url
   */
  getShareable (context) {
    return Common.post(API_INVITE_ROUTES.INVITE, {}).then(
      function (response) {
        var shareableUrl = response.data
        console.log('successfully got shareable invite url: ' + shareableUrl)
        return shareableUrl
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  },
  /**
   * GET all invites
   */
  all (context) {
    return Common.fetch(API_INVITE_ROUTES.INVITES).then(
      function (response) {
        return response.data
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  }
}
