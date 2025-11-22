<template>
  <div class="flex flex-column gap-1">
    <label v-if="label" class="font-semibold text-xs">{{ label }}</label>

    <Password
      :feedback="false"
      :toggleMask="true"
      :value="modelValue"
      @input="onInput"
      @blur="$emit('blur', $event)"
      :placeholder="placeholder"
      inputClass="p-3"
      fluid
      :disabled="disabled"
    />

    <small v-if="error" class="text-red-400">{{ error }}</small>
  </div>
</template>

<script setup>
import Password from 'primevue/password'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  disabled: Boolean,
  error: String,
})

const emit = defineEmits(['update:modelValue', 'blur'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
