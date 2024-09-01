<template>
  <div class="currency-selector-container">
    <select
      :value="modelValue"
      @change="handleChange"
      class="currency-selector"
      aria-label="Select currency"
    >
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    }
  },
  data() {
    return {
      currencies: ['USD', 'EUR', 'RUB']
    };
  },
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>
.currency-selector-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.currency-selector {
  width: 100%;
  min-width: 323px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.currency-selector:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.currency-selector option {
  padding: 10px;
}
</style>
