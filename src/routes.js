const API_STORAGE_LOCAL = 'http://laravel-storage.app'
const API_AUTH_LOCAL = 'http://laravel-auth.app'

export const API_FILE_ROUTES = {
  FIRST: `${API_STORAGE_LOCAL}/files`,
  ALL: `${API_STORAGE_LOCAL}/files/all`,
  UPLOAD: `${API_STORAGE_LOCAL}/files/upload`,
  PREVIEW: `${API_STORAGE_LOCAL}/files/images/preview`,
  DELETE: `${API_STORAGE_LOCAL}/files`
}

export const API_AUTH_ROUTES = {
  USER: `${API_AUTH_LOCAL}/auth/user`,
  USERS: `${API_AUTH_LOCAL}/auth/users`,
  ROLES: `${API_AUTH_LOCAL}/auth/roles`,
  ROLE_ASSIGN: `${API_AUTH_LOCAL}/auth/roles/assign`,
  ROLE_REMOVE: `${API_AUTH_LOCAL}/auth/roles/remove`,
  LOGIN: `${API_AUTH_LOCAL}/auth/login`,
  SIGNUP: `${API_AUTH_LOCAL}/signup`,
  HEARTBEAT: `${API_AUTH_LOCAL}/heartbeat`
}

export const API_INVITE_ROUTES = {
  INVITE: `${API_AUTH_LOCAL}/invite`,
  INVITES: `${API_AUTH_LOCAL}/invites`,
  DELETE: `${API_AUTH_LOCAL}/invites`
}

export const API_GROUP_ROUTES = {
  GROUPS: `${API_AUTH_LOCAL}/groups`,
  GROUP_ASSIGN: `${API_AUTH_LOCAL}/groups/assign`,
  GROUP_REMOVE: `${API_AUTH_LOCAL}/groups/remove`
}

export const API_MAIL_ROUTES = {
  SEND: `${API_AUTH_LOCAL}/send`
}
