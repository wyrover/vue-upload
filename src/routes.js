const API_STORAGE_LOCAL = 'http://laravel-storage.app'
const API_AUTH_LOCAL = 'http://laravel-auth.app'
// var API_STORAGE_LOCAL = 'https://halesway-storage.azurewebsites.net'

// todo: refactor - should export each const as consts
// todo: refactor - add HTTP method prefixes to consts
export default {
  allFiles: `${API_STORAGE_LOCAL}/files/all`,
  postFile: `${API_STORAGE_LOCAL}/files/upload`,
  getFile: `${API_STORAGE_LOCAL}/files`,
  previewFile: `${API_STORAGE_LOCAL}/files/images/preview`,
  deleteFile: `${API_STORAGE_LOCAL}/files`
}

export const API_AUTH_ROUTES = {
  GET_USER_URL: `${API_AUTH_LOCAL}/auth/user`,
  LOGIN_URL: `${API_AUTH_LOCAL}/auth/login`,
  SIGNUP_URL: `${API_AUTH_LOCAL}/signup`,
  HEARTBEAT_URL: `${API_AUTH_LOCAL}/heartbeat`
}

export const API_INVITE_ROUTES = {
  INVITE_URL: `${API_AUTH_LOCAL}/invite`,
  INVITES_URL: `${API_AUTH_LOCAL}/invites`
}

export const API_MAIL_ROUTES = {
  SEND_URL: `${API_AUTH_LOCAL}/send`
}
