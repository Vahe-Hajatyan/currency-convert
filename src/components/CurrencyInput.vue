<template>
  <input
    class="currency-input"
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :disabled="disabled"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.currency-input-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.currency-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.currency-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.currency-input[disabled] {
  background-color: #f9f9f9;
  cursor: not-allowed;
}
</style>
