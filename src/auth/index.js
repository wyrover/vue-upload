import Common from '../vue/Common'
import {doRedirect} from '../vue/Common'
import {API_AUTH_ROUTES} from '../routes'

var jwtPayloadDecoder = require('jwt-payload-decoder')

export default {
  user: {
    email: null,
    first_name: null,
    last_name: null,
    super: false,
    admin: false,
    id: -1,
    roles: [],
    permissions: []
  },
  /**
   * Log a user in and set user's data from resulting decoded JWT
   * */
  login (context, credentials, redirect) {
    var self = this
    return Common.post(API_AUTH_ROUTES.LOGIN, credentials).then(
      function (response) {
        // Process the token
        var token = response.data.token
        localStorage.setItem('id_token', token)
        self.decode(token)
        // Redirect if necessary
        doRedirect(redirect)

        return self.user
      },
      function (response) {
        // Failed response
        context.error = 'add error checking'
      })
  },
  decode (token) {
    var payload = jwtPayloadDecoder.getPayload(token)
    // Set the user's details
    this.user.authenticated = true
    this.user.id = payload.id
    this.user.roles = payload.roles
    this.user.permissions = payload.permissions
    this.user.admin = this.user.permissions['user.admin'] === true
    this.user.email = payload.email
    this.user.first_name = payload.first_name
    this.user.last_name = payload.last_name
  },
  /**
   * Remove the JWT from local storage
   * */
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  /**
   * Periodically check to see if the user's token has expired
   */
  heartbeat (frequency) {
    window.setInterval(() => {
      if (this.user.authenticated) {
        Common.post(API_AUTH_ROUTES.HEARTBEAT, {})
      }
    }, frequency)
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    this.user.authenticated = !!jwt
    if (!this.user.authenticated) {
      doRedirect('login')
    }
    return this.user.authenticated
  }
}
