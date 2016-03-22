const API_STORAGE_LOCAL = 'http://laravel-storage.app'
const API_AUTH_LOCAL = '//laravel-auth.app/'
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
  allFiles: `${API_STORAGE_LOCAL}/files/all`,
  postFile: `${API_STORAGE_LOCAL}/files/upload`,
  getFile: `${API_STORAGE_LOCAL}/files`,
  previewFile: `${API_STORAGE_LOCAL}/files/images/preview`,
  deleteFile: `${API_STORAGE_LOCAL}/files`,
  GET_USER_URL: `${API_AUTH_LOCAL}/auth/user`,
  LOGIN_URL: `${API_AUTH_LOCAL}/auth/login`,
  SIGNUP_URL: `${API_AUTH_LOCAL}/register`
}
