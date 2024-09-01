<template>
  <div id="app">
    <Header @currency-change="updateBaseCurrency" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  methods: {
    updateBaseCurrency(currency) {
      this.$root.$emit('base-currency-change', currency);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>