<template>
  <div class="flex flex-column gap-1">
    <label v-if="label" class="font-semibold text-xs">{{ label }}</label>

    <DatePicker
      v-model="internalValue"
      @blur="$emit('blur', internalValue)"
      :showIcon="true"
      dateFormat="dd/mm/yy"
      inputClass="p-3"
      :placeholder="placeholder"
      :disabled="disabled"
      :manualInput="false"
      fluid
    />

    <small v-if="error" class="text-red-400">{{ error }}</small>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: [String, Date],
  label: String,
  placeholder: String,
  disabled: Boolean,
  error: String,
})

const emit = defineEmits(['update:modelValue', 'blur'])

const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (v) => (internalValue.value = v),
)

watch(internalValue, (v) => emit('update:modelValue', v))
</script>
