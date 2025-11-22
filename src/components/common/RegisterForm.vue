<template>
  <Card class="shadow-3">
    <template #title>
      <div class="flex justify-content-center">
        <h3>Cadastrar usuário</h3>
      </div>
    </template>
    <template #content>
      <form action="" class="w-24rem flex gap-3 flex-column">
        <AppInputText label="E-mail*" placeholder="nome@email.com" />
        <AppInputText label="Confirme seu e-mail*" placeholder="nome@email.com" />
        <AppInputText label="Cpf*" placeholder="000.000.000-00" />
        <AppInputText label="Telefone*" placeholder="(00) 00000-0000" />
        <AppPassword label="Senha*" />
        <AppPassword label="Confirmar senha*" />
        <AppDatePicker label="Data de nascimento*" />
        <AppButton label="Cadastrar" />
      </form>
    </template>
  </Card>
</template>

<script setup>
import AppButton from './AppButton.vue'
import AppPassword from './AppPassword.vue'
import AppDatePicker from './AppDatePicker.vue'
import AppInputText from './AppInputText.vue'
</script>

<style scoped></style>
