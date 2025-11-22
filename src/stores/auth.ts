import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthFormState = 'register' | 'login' | 'logged-in'

export const useAuthStore = defineStore('auth', () => {
  const formState = ref<AuthFormState>('register')
  const isLoggedIn = ref(false)

  function setFormState(state: AuthFormState) {
    formState.value = state
  }

  function toggleFormState() {
    if (formState.value === 'register') {
      formState.value = 'login'
    } else if (formState.value === 'login') {
      formState.value = 'register'
    }
  }

  function logout() {
    isLoggedIn.value = false
    formState.value = 'register'
  }

  function login() {
    isLoggedIn.value = true
  }

  return {
    formState,
    isLoggedIn,
    setFormState,
    toggleFormState,
    logout,
    login,
  }
})
