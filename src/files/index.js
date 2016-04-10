import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'

import {API_FILE_ROUTES} from '../routes'

export default {
  /**
   * GET all files
   */
  all (context) {
    return Common.fetch(API_FILE_ROUTES.ALL).then(
      function (response) {
        var files = response.data
        files.map(function (file) {
          file.selected = false
        })
        return files
      },
      function (response) {
        // todo: test with error
        context.error = 'add error checking'
      }
    )
  },
  /**
   * DELETE file(s)
   */
  destroy (context, file) {
    var self = this
    return Common.destroy(`${this.API_FILE_ROUTES.DELETE}/${file.hash}`).then(
      function (response) {
        self.files.$remove(file)
      },
      function () {
        console.log('failed deleting file(s)')
      }
    )
  }
}
