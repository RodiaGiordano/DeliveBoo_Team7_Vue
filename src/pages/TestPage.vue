<script>
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
      loading: false,
    };
  },

  methods: {
    // raggruppamentoAnthemProva() {
    //   // prova(endpoint = store.baseUri + 'restaurant/1') {
    //   //   axios.get(endpoint).then((response) => {
    //   //     this.restaurants.id = response.data.dishes[0].id;
    //   //     // console.log(this.restaurants.id);
    //   //   });
    //   // },
    //   // tokenCall(endpoint = store.baseUri + 'order/generate') {
    //   //   axios
    //   //     .get(endpoint)
    //   //     .then((response) => {
    //   //       // this.restaurants.token = response.data.token;
    //   //       this.paymant.token = response.data.token;
    //   //       this.paymant.id = this.id;
    //   //       console.log(this.paymant);
    //   //       const button = document.querySelector('#submit-button');
    //   //       this.initBraintree(this.paymant, button);
    //   //     })
    //   //     .finally(() => {
    //   //       this.loading = false;
    //   //     });
    //   // },
    //   // sendPayment() {
    //   //   axios
    //   //     .post(store.baseUri + 'order/make/payment')
    //   //     .then((response) => {
    //   //       console.log(response);
    //   //     })
    //   //     .catch((error) => {
    //   //       console.error('Errore nella richiesta:', error);
    //   //     });
    //   // },
    //   // initBraintree(paymant, button) {
    //   //   braintree.dropin.create(
    //   //     {
    //   //       authorization: paymant.token,
    //   //       selector: '#dropin-container',
    //   //     },
    //   //     (err, instance) => {
    //   //       // console.log(instance);
    //   //       button.addEventListener('click', function () {
    //   //         instance.requestPaymentMethod(function (err, payload) {
    //   //           // submit payload.nonce to your server
    //   //           // console.log(payload.nonce);
    //   //         });
    //   //       });
    //   //     },
    //   //   );
    //   // },
    // },

    tokenCall() {
      axios.get(store.baseUri + 'order/generate').then((response) => {
        const tokenn = response.data.token;

        braintree.dropin.create(
          {
            authorization: tokenn,
            container: '#dropin-container',
          },
          (error, dropinInstance) => {
            if (error) {
              console.error('errore nella creazione:', error);
            }
          },
        );
      });
    },

    sendPayment() {
      axios
        .post(store.baseUri + 'order/make/payment', { payment_method_nonce: 'fake-valid-nonce', id: 3 })
        .then((response) => {
          console.log(response.config);
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
  },

  mounted() {
    this.tokenCall();
    // this.prova();
  },
};
</script>

<template>
  <div v-if="loading" class="d-flex align-items-center">
    <strong role="status">Loading...</strong>
    <div class="spinner-border ms-auto" aria-hidden="true"></div>
  </div>

  <div id="dropin-container"></div>
  <button @click="sendPayment()" id="submit-button" class="">Purchase</button>
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
</style>
