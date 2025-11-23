<template>
  <Dialog
    header="Cadastrar Contato"
    v-model:visible="showDialog"
    modal
    class="w-25rem"
    :closable="false"
  >
    <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-column gap-3">
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

      <Field name="birthDate" v-slot="{ field, errorMessage }">
        <AppDatePicker v-bind="field" label="Data de nascimento*" :error="errorMessage" />
      </Field>

      <div class="flex justify-content-end gap-2 mt-3">
        <AppButton
          type="button"
          label="Cancelar"
          class="p-button-secondary"
          @click="showDialog = false"
        />
        <AppButton type="submit" label="Cadastrar" />
      </div>
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import AppInputText from './AppInputText.vue'
import AppDatePicker from './AppDatePicker.vue'
import AppInputMask from './AppInputMask.vue'
import AppButton from './AppButton.vue'
import { contactService } from '@/services/contact.service'
import { emitter } from '@/util/eventBus'

const showDialog = ref(false)
const emit = defineEmits(['contact-created'])

function openModal() {
  showDialog.value = true
}

defineExpose({ openModal })

const phoneRegex = /^\d{10,11}$/
function extractNumbers(value: string) {
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
    .test('phone-digits', 'Telefone deve conter 10 ou 11 dígitos', (value) =>
      phoneRegex.test(extractNumbers(value)),
    ),
  birthDate: yup
    .date()
    .nullable()
    .typeError('Data de nascimento inválida')
    .max(new Date(), 'Data de nascimento não pode ser no futuro'),
})

async function onSubmit(values: any) {
  try {
    const payload = {
      ...values,
      phoneNumber: extractNumbers(values.phoneNumber),
      birthDate: new Date(values.birthDate),
    }
    await contactService.createContact(payload)
    emitter.emit('contact-created-globally')
    showDialog.value = false
  } catch (error: any) {
    alert(error.message)
  }
}
</script>
