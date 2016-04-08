import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'

import {API_INVITE_ROUTES} from '../routes'

export default {
  shareableUrl: null,
  /**
   * PUT invite request(s) to the auth service in the form of a list of email addresses
   */
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
   * POST required info for a shareable invite url
   */
  getShareable (context) {
    return Common.post(API_INVITE_ROUTES.INVITE_URL, {}).then(
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
  getAll (context) {
    return Common.fetch(API_INVITE_ROUTES.INVITES_URL, {}).then(
      function (response) {
        var invites = response.data
        console.log('all invites: ' + invites)
        return invites
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  }
}
