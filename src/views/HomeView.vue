<template>
  <main>
    <div class="mt-4 mb-4 flex align-items-center justify-content-center">
      <RegisterForm v-if="authStore.formState == AuthFormState.Register" />
      <LoginForm v-else-if="authStore.formState == AuthFormState.Login" />
    </div>
  </main>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/common/RegisterForm.vue'
import LoginForm from '@/components/common/LoginForm.vue'
import { useAuthStore, AuthFormState } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped></style>
