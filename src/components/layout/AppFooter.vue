<template>
  <Toolbar style="border-radius: 0px; padding: 4px 32px; margin: 0px">
    <template #start>
      <slot name="left"> Manoel José 2025</slot>
    </template>

    <template #end>
      <AppLink
        label="Repositório"
        icon="pi pi-github"
        href="https://github.com/seu-usuario/seu-repositorio"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import AppLink from '../common/AppLink.vue'
</script>
