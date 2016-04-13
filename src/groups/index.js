import Common from '../vue/Common'
import {API_GROUP_ROUTES} from '../routes'

export default {
  groups: [],
  /**
   * GET all groups
   */
  all (context) {
    return Common.fetch(API_GROUP_ROUTES.GROUPS).then(
      function (response) {
        return response.data
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  },
  /**
   * Assign a group to a user
   */
  assign (context, group, user) {
    return Common.post(`${API_GROUP_ROUTES.GROUP_ASSIGN}/${group.id}/${user.id}`).then(
      function (response) {
        return response.data
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  },
  /**
   * Remove a group from a user
   */
  remove (context, group, user) {
    return Common.post(`${API_GROUP_ROUTES.GROUP_REMOVE}/${group.id}/${user.id}`).then(
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
