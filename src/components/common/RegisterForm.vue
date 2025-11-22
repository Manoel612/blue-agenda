<template>
  <Card class="shadow-3">
    <template #title>
      <div class="flex justify-content-center">
        <h4>Cadastrar usuário</h4>
      </div>
    </template>
    <template #content>
      <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-column gap-3 w-24rem">
        <Field name="name" v-slot="{ field, errorMessage }">
          <AppInputText v-bind="field" label="Nome*" :error="errorMessage" />
        </Field>

        <Field name="email" v-slot="{ field, errorMessage }">
          <AppInputText v-bind="field" label="E-mail*" :error="errorMessage" />
        </Field>

        <Field name="phoneNumber" v-slot="{ field, errorMessage }">
          <AppInputMask
            v-bind="field"
            label="Telefone*"
            mask="(99) 99999-9999"
            :error="errorMessage"
          />
        </Field>

        <Field name="cpf" v-slot="{ field, errorMessage }">
          <AppInputMask v-bind="field" label="CPF*" mask="999.999.999-99" :error="errorMessage" />
        </Field>

        <Field name="birthDate" v-slot="{ field, errorMessage }">
          <AppDatePicker v-bind="field" label="Data de nascimento*" :error="errorMessage" />
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }">
          <AppPassword v-bind="field" label="Senha*" :error="errorMessage" />
        </Field>

        <Field name="confirmPassword" v-slot="{ field, errorMessage }">
          <AppPassword v-bind="field" label="Confirmar senha*" :error="errorMessage" />
        </Field>

        <AppButton type="submit" label="Cadastrar" />
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
import AppDatePicker from './AppDatePicker.vue'
import AppInputMask from './AppInputMask.vue'
import AppButton from './AppButton.vue'

const authStore = useAuthStore()

const phoneRegex = /^\d{10,11}$/
const cpfRegex = /^\d{11}$/

function extractNumbers(value: string): string {
  return value.replace(/\D/g, '')
}

const schema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),

  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),

  phoneNumber: yup
    .string()
    .required('Telefone é obrigatório')
    .test('phone-digits', 'Telefone deve conter 10 ou 11 dígitos', (value) => {
      const digits = extractNumbers(value || '')
      return phoneRegex.test(digits)
    }),

  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test('cpf-digits', 'CPF deve conter 11 dígitos', (value) => {
      const digits = extractNumbers(value || '')
      return cpfRegex.test(digits)
    }),

  birthDate: yup
    .date()
    .typeError('Data de nascimento inválida')
    .required('Data de nascimento é obrigatória')
    .max(new Date(), 'Data de nascimento não pode ser no futuro'),

  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .matches(/[^a-zA-Z0-9]/, 'Senha deve conter pelo menos um caractere especial'),

  confirmPassword: yup
    .string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
})

async function onSubmit(values: any) {
  try {
    const { confirmPassword, phoneNumber, cpf, ...payload } = values
    const cleanedPayload = {
      ...payload,
      phoneNumber: extractNumbers(phoneNumber),
      cpf: extractNumbers(cpf),
    }
    await authStore.register(cleanedPayload)
  } catch (error: any) {
    alert(error.message || 'Erro ao registrar')
  }
}
</script>

<style scoped></style>
