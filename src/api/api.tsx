import { apiRequest } from '../utils/request'

export default {
  user: {
    login (username: string, password: string) {
      return apiRequest('/api-jwt-auth/', 'post', { username, password })
    }
  }
}
