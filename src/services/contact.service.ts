import type { ICreateContact, IUpdateContact } from '@/interfaces/contact-model'
import api from './api'

export const contactService = {
  async getContactById(id: string) {
    try {
      return await api.get(`/Contact/${id}`)
    } catch (error) {
      throw error
    }
  },

  async getUserContacts(page?: number, pageSize?: number) {
    try {
      const params = { page, pageSize }
      return await api.get('/Contact/GetUserContacts', { params })
    } catch (error) {
      throw error
    }
  },

  async createContact(model: ICreateContact) {
    try {
      return await api.post('/Contact', model)
    } catch (error) {
      throw error
    }
  },

  async updateContact(id: string, model: IUpdateContact) {
    try {
      return await api.put(`/Contact/${id}`, model)
    } catch (error) {
      throw error
    }
  },

  async deactivateContact(id: string) {
    try {
      return await api.patch(`/Contact/Deactivate/${id}`)
    } catch (error) {
      throw error
    }
  },
}
