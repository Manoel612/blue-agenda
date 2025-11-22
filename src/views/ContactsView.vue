<script setup lang="ts">
import RegisterForm from '@/components/common/RegisterForm.vue'
import LoginForm from '@/components/common/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <main>
    <p>Welcome! You are logged in.</p>
  </main>
</template>

<style scoped></style>
