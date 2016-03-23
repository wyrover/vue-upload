import Common from '../vue/Common'
import Routes from '../routes'
import {router} from '../main'
import {APP_KEY} from '../main'
import {API_AUTH_ROUTES} from '../routes'

export default {
  user: {
    authenticated: false
  },
  /**
   * Log a user in and set user's data from resulting decoded JWT
   * */
  login (context, credentials, redirect) {
    var self = this
    // Add the app's key
    credentials.app_key = APP_KEY
    Common.post(API_AUTH_ROUTES.LOGIN_URL, credentials).then(
      function (response) {
        var token = response.data.token
        localStorage.setItem('id_token', token)
        // Split by . -> base64 decode - Parse resulting JSON string
        var payload = JSON.parse(atob(token.split('.')[1]))
        self.user.authenticated = true
        self.user.email = payload.email
        self.user.name = payload.name
        if (redirect) {
          router.go(redirect)
        }
      },
      function (response) {
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
