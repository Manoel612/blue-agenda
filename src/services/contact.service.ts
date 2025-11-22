// src/services/contact.service.ts
import api from './api'

export interface CreateContactModel {
  name: string
  email: string
  phoneNumber: string
}

export interface UpdateContactModel {
  name?: string
  email?: string
  phoneNumber?: string
}

export async function getContactById(id: string) {
  try {
    return await api.get(`/Contact/${id}`)
  } catch (error) {
    throw error
  }
}

export async function getUserContacts(page?: number, pageSize?: number) {
  try {
    const params = { page, pageSize }
    return await api.get('/Contact/GetUserContacts', { params })
  } catch (error) {
    throw error
  }
}

export async function createContact(model: CreateContactModel) {
  try {
    return await api.post('/Contact', model)
  } catch (error) {
    throw error
  }
}

export async function updateContact(id: string, model: UpdateContactModel) {
  try {
    return await api.put(`/Contact/${id}`, model)
  } catch (error) {
    throw error
  }
}

export async function deactivateContact(id: string) {
  try {
    return await api.patch(`/Contact/Deactivate/${id}`)
  } catch (error) {
    throw error
  }
}
