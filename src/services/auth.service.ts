import type { IRegister } from '@/interfaces/user-model'
import api from './api'

export const authService = {
  async register(model: IRegister) {
    try {
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
