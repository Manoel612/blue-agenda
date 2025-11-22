<script setup lang="ts">
import AppButton from '../common/AppButton.vue'
import { useAuthStore, AuthFormState } from '@/stores/auth'

const authStore = useAuthStore()

function handleHeaderButtonClick() {
  if (authStore.isLoggedIn) {
    authStore.logout()
  } else {
    authStore.toggleFormState()
  }
}

function getButtonLabel() {
  if (authStore.isLoggedIn) {
    return 'Logout'
  } else if (authStore.formState == AuthFormState.Register) {
    return 'Login'
  } else {
    return 'Cadastro'
  }
}
</script>

<template>
  <Toolbar style="border-radius: 0px; padding: 16px 32px; margin: 0px">
    <template #start>
      <h2>Blue Agenda</h2>
    </template>

    <template #end>
      <AppButton
        :label="getButtonLabel()"
        :icon="!authStore.isLoggedIn ? 'pi pi-user' : ''"
        :severity="authStore.isLoggedIn ? 'danger' : ''"
        @click="handleHeaderButtonClick"
      />
    </template>
  </Toolbar>
</template>

<style scoped></style>
