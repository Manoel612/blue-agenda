import { authService } from '@/services/auth.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthFormState = 'register' | 'login' | 'logged-in'

export const useAuthStore = defineStore('auth', () => {
  const formState = ref<AuthFormState>('register')
  const isLoggedIn = ref(!!localStorage.getItem('token'))
  const token = ref<string | null>(localStorage.getItem('token'))

  function setFormState(state: AuthFormState) {
    formState.value = state
  }

  function toggleFormState() {
    formState.value = formState.value === 'register' ? 'login' : 'register'
  }

  async function login(email: string, password: string) {
    try {
      const { data } = await authService.login(email, password)

      token.value = data.token || data.Token
      localStorage.setItem('token', token.value!)

      isLoggedIn.value = true
      formState.value = 'logged-in'

      return true
    } catch (error: any) {
      throw error.response?.data?.message || 'Erro ao fazer login.'
    }
  }

  async function register(model: any) {
    try {
      await authService.register(model)

      // Após registrar, muda automaticamente para tela de login
      formState.value = 'login'
      return true
    } catch (error: any) {
      throw error.response?.data?.message || 'Erro ao registrar.'
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')

    isLoggedIn.value = false
    formState.value = 'register'
  }

  return {
    formState,
    isLoggedIn,
    token,
    setFormState,
    toggleFormState,
    login,
    register,
    logout,
  }
})
