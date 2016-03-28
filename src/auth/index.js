import Common from '../vue/Common'
import {router} from '../main'
import {API_AUTH_ROUTES} from '../routes'

var jwtPayloadDecoder = require('jwt-payload-decoder')

export default {
  user: {
    authenticated: false
  },
  /**
   * Log a user in and set user's data from resulting decoded JWT
   * */
  login (context, credentials, redirect) {
    var self = this
    Common.post(API_AUTH_ROUTES.LOGIN_URL, credentials).then(
      function (response) {
        // Process the token
        var token = response.data.token
        localStorage.setItem('id_token', token)
        var payload = jwtPayloadDecoder.getPayload(token)
        // Set the user's details
        self.user.authenticated = true
        self.user.id = payload.id
        self.user.admin = payload.permissions['user.admin'] === true
        self.user.email = payload.email
        self.user.first_name = payload.first_name
        self.user.last_name = payload.last_name
        // Redirect if necessary
        if (redirect) {
          router.go(redirect)
        }
      },
      function (response) {
        // Failed response
        context.error = 'add error checking'
      })
  },
  /**
   * Remove the JWT from local storage
   * */
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    this.user.authenticated = !!jwt
  },
  getAuthHeader () {
    return { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') }
  }
}
