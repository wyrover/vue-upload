import {router} from '../main'
import {APP_KEY} from '../main'

export const API_URL = '//laravel-auth.app/'
export const LOGIN_URL = API_URL + 'auth/login/'
export const SIGNUP_URL = API_URL + 'register/'

export default {
  user: {
    authenticated: false
  },
  login (context, credentials, redirect) {
    // Add the app's key
    credentials.app_key = APP_KEY
    context.$http.post(LOGIN_URL, credentials, (data) => {
      localStorage.setItem('id_token', data.token)
      this.user.authenticated = true
      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },
  signup (context, credentials, redirect) {
    context.$http.post(SIGNUP_URL, credentials, (data) => {
      localStorage.setItem('id_token', data.id_token)
      this.user.authenticated = true
      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    this.user.authenticated = !!jwt
  },
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
