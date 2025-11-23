<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../common/AppButton.vue'
import { useAuthStore, AuthFormState } from '@/stores/auth'
import type ContactModal from '../common/ContactModal.vue'

const authStore = useAuthStore()
const contactModalRef = ref<InstanceType<typeof ContactModal>>()

function handleHeaderButtonClick() {
  if (authStore.isLoggedIn) {
    authStore.logout()
  } else {
    authStore.toggleFormState()
  }
}

async function openContactModal() {
  contactModalRef.value?.openModal()
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
      <div class="flex gap-3 align-items-center">
        <AppButton
          v-if="authStore.isLoggedIn"
          label="Cadastrar Contato"
          @click="openContactModal"
        />
        <AppButton
          :label="getButtonLabel()"
          :icon="!authStore.isLoggedIn ? 'pi pi-user' : ''"
          :severity="authStore.isLoggedIn ? 'danger' : ''"
          @click="handleHeaderButtonClick"
        />
      </div>
    </template>
  </Toolbar>

  <ContactModal ref="contactModalRef" />
</template>

<style scoped></style>
