<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      paymentStatus: null,
    };
  },

  mounted() {
    this.paymentStatus = this.$route.query.status || 'Pagamento fallito, riprova.';

    let intervalId;
    if (this.paymentStatus === 'Pagamento fallito') {
      setTimeout(() => {
        this.$router.push({ name: 'test' });
        clearInterval(intervalId);
      }, 4000);
    } else if (this.paymentStatus === 'Pagamento effettuato') {
      setTimeout(() => {
        this.$router.push({ name: 'homepage' });
        clearInterval(intervalId);
      }, 4000);
    }
  },
};
</script>

<template>
  <div class="payment-page" :class="{ 'payment-success': paymentStatus === 'Pagamento effettuato', 'payment-failure': paymentStatus === 'Pagamento fallito' }">
    <font-awesome-icon icon="fa-regular fa-circle-check" v-if="paymentStatus === 'Pagamento effettuato'" class="icon" />
    <font-awesome-icon icon="fa-regular fa-circle-xmark" v-if="paymentStatus === 'Pagamento fallito'" class="icon" />
    <p class="status-payment">{{ paymentStatus }}</p>
    <p v-if="paymentStatus === 'Pagamento effettuato'">Ordine confermato. RIceverai un'email con i dati dell'ordine</p>
    <p v-if="paymentStatus === 'Pagamento fallito'">Riprova, inserendo un metodo di pagamento valido</p>
  </div>
</template>

<style lang="scss" scoped>
.payment-page {
  height: 85vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.icon {
  font-size: 300px;
}

.status-payment {
  font-size: 2rem;
  margin-top: 15px;
  font-weight: 700;
}

.payment-success {
  background-color: #4caf50;
  color: #fff;
}

.payment-failure {
  background-color: #f44336;
  color: #fff;
}
</style>
