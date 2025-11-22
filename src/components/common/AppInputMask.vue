<template>
  <div class="flex flex-column gap-1">
    <label v-if="label" class="font-semibold text-xs">{{ label }}</label>

    <InputMask
      :modelValue="internalValue"
      @update:modelValue="onInput"
      @blur="() => emit('blur', internalValue)"
      :mask="mask"
      :placeholder="placeholder"
      :disabled="disabled"
      class="p-3"
    />

    <small v-if="error" class="text-red-400">{{ error }}</small>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' },
  mask: { type: String, default: '' },
  error: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'blur', 'input'])

const internalValue = ref(props.modelValue)

// atualiza caso o pai altere o modelValue externamente
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
  },
)

function onInput(val) {
  internalValue.value = val
  emit('update:modelValue', val)
  emit('input', val)
}
</script>
