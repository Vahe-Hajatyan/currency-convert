<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/convert" class="nav-link">Convert</router-link>
    </nav>
    <div class="currency-selector">
      <label for="currency-select" class="select-label">Base Currency:</label>
      <select id="currency-select" v-model="baseCurrency" @change="updateCurrency" class="select-input">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['baseCurrency']),
  },
  methods: {
    ...mapMutations(['setBaseCurrency']),
    updateCurrency(e) {
      this.setBaseCurrency(e.target.value);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #333;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap;
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffd700;
}

.currency-selector {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.select-label {
  margin-right: 10px;
  font-size: 1rem;
}

.select-input {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-family: 'Roboto', sans-serif;
  transition: border-color 0.3s;
}

.select-input:focus {
  border-color: #ffd700; 
  outline: none;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar {
    margin-bottom: 15px;
  }

  .currency-selector {
    margin-top: 10px;
    width: 100%;
  }

  .select-label {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .select-input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
