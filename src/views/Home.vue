<template>
  <div class="exchange-rates-container">
    <h1 class="title">Exchange Rates</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else>
      <h2 class="base-currency">Base Currency: {{ baseCurrency }}</h2>
      <ul class="rates-list">
        <li
          v-for="(rate, currency) in exchangeRates"
          :key="currency"
          class="rate-item"
        >
          <span class="currency-from">1 {{ baseCurrency }}</span>
          <span class="rate-value"> {{ rate }} {{ currency }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['baseCurrency']),
  },
  data() {
    return {
      exchangeRates: {},
      loading: true,
      errorMessage: '',
    };
  },
  watch: {
    baseCurrency: 'fetchRates',
  },
  created() {
    this.fetchRates();
  },
  methods: {
    async fetchRates() {
      this.loading = true;
      try {
        const response = await axios.get(
          'https://status.neuralgeneration.com/api/currency'
        );
        this.exchangeRates = this.calculateRates(response.data);
      } catch (error) {
        this.errorMessage =
          'Error fetching exchange rates. Please try again later.';
        console.error('Error fetching currency rates:', error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    calculateRates(data) {
      const rates = {};
      Object.keys(data).forEach((key) => {
        const [fromCurrency, toCurrency] = key.split('-');
        if (toCurrency.toUpperCase() === this.baseCurrency.toUpperCase()) {
          rates[fromCurrency.toUpperCase()] = data[key];
        }
      });
      return rates;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Georgia:wght@400;700&display=swap');

.exchange-rates-container {
  max-width: 800px;
  margin: 20px auto 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
  font-family: 'Georgia', serif;
}

.loading {
  text-align: center;
  color: #007bff;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
}

.error {
  text-align: center;
  color: #dc3545;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
}

.base-currency {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
}

.rates-list {
  list-style: none;
  padding: 0;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1rem;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

.rate-item:last-child {
  border-bottom: none;
}

.currency-from {
  font-weight: 500;
  font-family: 'Georgia', serif;
}

.rate-value {
  font-weight: 700;
}
</style>
