<template>
  <div class="flex flex-column gap-1">
    <label v-if="label" class="font-semibold text-xs">{{ label }}</label>
    <div>
      <Password
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        toggleMask
        :feedback="false"
        fluid
        inputClass="p-3"
      />
    </div>
  </div>
</template>

<script setup>
import Password from 'primevue/password'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped></style>
