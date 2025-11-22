<template>
  <Button
    :label="label"
    :icon="icon"
    :class="customClass"
    :link="true"
    :href="href"
    :target="target"
    @click="handleClick"
  />
</template>

<script setup>
import Button from 'primevue/button'

const props = defineProps({
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  href: { type: String, default: '#' },
  target: { type: String, default: '_blank' },
  customClass: { type: String, default: 'p-button-text' },
})

const emit = defineEmits(['click'])

function handleClick(event) {
  emit('click', event)
}
</script>

<style scoped></style>
