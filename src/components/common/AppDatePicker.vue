<template>
  <div class="flex flex-column gap-1">
    <label v-if="label" class="font-semibold text-xs">{{ label }}</label>

    <DatePicker
      :modelValue="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @update:modelValue="handleInput"
      :showIcon="true"
      :dateFormat="dateFormat"
      fluid
      inputClass="p-3"
    />
  </div>
</template>

<script setup>
import DatePicker from 'primevue/datepicker'

const props = defineProps({
  modelValue: { type: [String, Date], default: null },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  dateFormat: { type: String, default: 'dd/mm/yy' },
})

const emit = defineEmits(['update:modelValue'])

function handleInput(value) {
  emit('update:modelValue', value)
}
</script>

<style scoped></style>
