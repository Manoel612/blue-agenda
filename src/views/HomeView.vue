<script setup lang="ts">
import RegisterForm from '@/components/common/RegisterForm.vue'
import LoginForm from '@/components/common/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <main>
    <div class="mt-4 mb-4 flex align-items-center justify-content-center">
      <RegisterForm v-if="authStore.formState === 'register'" />
      <LoginForm v-else-if="authStore.formState === 'login'" />
      <div v-else>
        <p>Welcome! You are logged in.</p>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
