<template>
  <div class="converter-container">
    <h1>Currency Converter</h1>
    <div class="converter">
      <div class="converter-group">
        <CurrencySelector
          v-model="currencyFrom"
          @change="onCurrencyFromChange"
        />
        <CurrencyInput v-model="amountFrom" @input="convert" />
      </div>

      <div class="converter-group">
        <CurrencySelector v-model="currencyTo" @change="onCurrencyToChange" />
        <CurrencyInput v-model="amountTo" :disabled="true" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CurrencySelector from '../components/CurrencySelector.vue';
import CurrencyInput from '../components/CurrencyInput.vue';
import { mapState } from 'vuex';

export default {
  components: { CurrencySelector, CurrencyInput },
  computed: {
    ...mapState(['baseCurrency']),
  },
  data() {
    return {
      currencyFrom: this.baseCurrency || 'USD',
      currencyTo: 'EUR',
      amountFrom: 0,
      amountTo: 0,
      rates: {},
      loading: false,
    };
  },
  created() {
    this.fetchRates();
  },
  watch: {
    currencyFrom: 'convert',
    currencyTo: 'convert',
    amountFrom: 'convert',
  },
  methods: {
    async fetchRates() {
      this.loading = true;
      try {
        const response = await axios.get(
          'https://status.neuralgeneration.com/api/currency'
        );
        this.rates = response.data;
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      } finally {
        this.loading = false;
      }
    },
    convert() {
      console.log('currencyFrom:', this.currencyFrom);
      console.log('currencyTo:', this.currencyTo);

      if (
        this.loading ||
        !this.rates ||
        typeof this.currencyFrom !== 'string' ||
        typeof this.currencyTo !== 'string' ||
        this.currencyFrom === this.currencyTo
      ) {
        this.amountTo = 0;
        return;
      }

      let rate;
      const directRateKey = `${this.currencyFrom.toLowerCase()}-${this.currencyTo.toLowerCase()}`;
      const reverseRateKey = `${this.currencyTo.toLowerCase()}-${this.currencyFrom.toLowerCase()}`;

      rate = this.rates[directRateKey];
      if (!rate && this.rates[reverseRateKey]) {
        rate = 1 / this.rates[reverseRateKey];
      }

      if (rate) {
        this.amountTo = parseFloat((this.amountFrom * rate).toFixed(2)); 
      } else {
        this.amountTo = 0;
        console.error(
          `Conversion rate not available from ${this.currencyFrom} to ${this.currencyTo}.`
        );
      }
    },
    onCurrencyFromChange(newCurrency) {
      this.currencyFrom = newCurrency.target.value;
      if (this.currencyFrom === this.currencyTo) {
        this.currencyTo = this.getDifferentCurrency(this.currencyFrom);
      }
    },
    onCurrencyToChange(newCurrency) {
      this.currencyTo = newCurrency.target.value;
      if (this.currencyTo === this.currencyFrom) {
        this.currencyFrom = this.getDifferentCurrency(this.currencyTo);
      }
    },
    getDifferentCurrency(currentCurrency) {
      return (
        ['USD', 'EUR', 'RUB'].find(
          (currency) => currency !== currentCurrency
        ) || 'EUR'
      );
    },
  },
};
</script>

<style scoped>
.converter-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.converter {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.converter-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.currency-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.currency-selector select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 300px;
}
.currency-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.currency-input input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 300px;
}
.currency-selector select:focus,
.currency-input input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.currency-input input[disabled] {
  background-color: #f9f9f9;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .converter {
    flex-direction: column;
  }

  .converter-group {
    flex-direction: column;
  }
}
</style>
