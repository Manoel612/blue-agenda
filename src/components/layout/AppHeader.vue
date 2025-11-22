<script setup lang="ts">
import AppButton from '../common/AppButton.vue'
</script>

<template>
  <Toolbar style="border-radius: 0px; padding: 16px 32px; margin: 0px">
    <template #start>
      <h2>Blue Agenda</h2>
    </template>

    <template #end>
      <AppButton label="Login" icon="pi pi-user" />
    </template>
  </Toolbar>
</template>
