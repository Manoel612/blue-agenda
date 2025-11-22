import { authService } from '@/services/auth.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum AuthFormState {
  Register = 'register',
  Login = 'login',
  LoggedIn = 'logged-in',
}

export const useAuthStore = defineStore('auth', () => {
  const formState = ref<AuthFormState>(AuthFormState.Register)
  const isLoggedIn = ref(!!localStorage.getItem('token'))
  const token = ref<string | null>(localStorage.getItem('token'))

  function setFormState(state: AuthFormState) {
    formState.value = state
  }

  function toggleFormState() {
    formState.value =
      formState.value == AuthFormState.Register ? AuthFormState.Login : AuthFormState.Register
  }

  async function login(email: string, password: string) {
    try {
      const { data } = await authService.login(email, password)

      token.value = data.token || data.Token
      localStorage.setItem('token', token.value!)

      isLoggedIn.value = true
      formState.value = AuthFormState.LoggedIn

      return true
    } catch (error: any) {
      throw error.response?.data?.message
    }
  }

  async function register(model: any) {
    try {
      await authService.register(model)

      formState.value = AuthFormState.Login
      return true
    } catch (error: any) {
      throw error.response?.data?.message
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')

    isLoggedIn.value = false
    formState.value = AuthFormState.Register
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
