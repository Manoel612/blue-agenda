<template>
  <Button
    :label="label"
    :icon="icon"
    :class="customClass"
    :disabled="disabled"
    @click="handleClick"
  />
</template>

<script setup>
import Button from 'primevue/button'

const props = defineProps({
  label: { type: String, default: 'Clique Aqui' },
  icon: { type: String, default: '' },
  customClass: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

function handleClick(event) {
  emit('click', event)
}
</script>

<style scoped></style>
