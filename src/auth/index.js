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
        self.decode(token)
        // Redirect if necessary
        self.redirect(redirect)
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
    this.user.admin = payload.permissions['user.admin'] === true
    this.user.email = payload.email
    this.user.first_name = payload.first_name
    this.user.last_name = payload.last_name
  },
  redirect (redirect) {
    if (redirect) {
      router.go(redirect)
    }
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
    return this.user.authenticated
  },
  getAuthHeader () {
    return { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') }
  }
}
