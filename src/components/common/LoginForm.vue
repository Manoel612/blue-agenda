<template>
  <Card class="shadow-3">
    <template #title>
      <div class="flex justify-content-center">
        <h4>Login</h4>
      </div>
    </template>
    <template #content>
      <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-column gap-3 w-24rem">
        <Field name="email" v-slot="{ field, errorMessage }">
          <AppInputText v-bind="field" label="E-mail*" :error="errorMessage" />
        </Field>
        <Field name="password" v-slot="{ field, errorMessage }">
          <AppPassword v-bind="field" label="Senha*" :error="errorMessage" />
        </Field>
        <AppButton type="submit" label="Login" />
      </Form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import AppInputText from './AppInputText.vue'
import AppPassword from './AppPassword.vue'
import AppButton from './AppButton.vue'

const authStore = useAuthStore()

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
})

function onSubmit(values: any) {
  try {
    authStore.login(values.email, values.password)
  } catch (error: any) {
    alert(error.message || 'Erro ao fazer login')
  }
}
</script>

<style scoped></style>
