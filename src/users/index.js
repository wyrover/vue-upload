import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'

import {API_AUTH_ROUTES} from '../routes'

export default {
  users: [],
  /**
   * GET all invites
   */
  all (context) {
    return Common.fetch(API_AUTH_ROUTES.USERS).then(
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
