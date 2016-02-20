import { STORAGE_KEY } from './index'
import { createLogger } from '../../middlewares/logger'

const localStorageMiddleware = {
  onMutation (mutation, { content }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStorageMiddleware]
  : [localStorageMiddleware]
