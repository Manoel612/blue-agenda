import type { RegisterModel } from '@/models/user-model'
import api from './api'

export const authService = {
  async register(model: RegisterModel) {
    try {
      debugger
      return await api.post('/Authentication/Register', model)
    } catch (error) {
      throw error
    }
  },

  async login(email: string, password: string) {
    try {
      return await api.post('/Authentication/Login', null, {
        params: { email, password },
      })
    } catch (error) {
      throw error
    }
  },
}
