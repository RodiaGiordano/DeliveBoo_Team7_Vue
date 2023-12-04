<script>
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    tokenCall() {
      axios
        .get(store.baseUri + 'order/generate')
        .then((response) => {
          const token = response.data.token;

          const button = document.querySelector('#submit-button');

          braintree.dropin.create(
            {
              authorization: token,
              selector: '#dropin-container',
            },
            function (error, instance) {
              button.addEventListener('click', function () {
                instance.requestPaymentMethod((err, payload) => {
                  axios.post(store.baseUri + 'order/make/payment', { payment_method_nonce: payload.nonce, id: 4 }).then((response) => {
                    console.log(response);
                  });
                });
              });
              if (error) {
                console.error('errore nella creazione:', error);
              }
            },
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  mounted() {
    this.tokenCall();
  },
};
</script>

<template>
  <div class="container">
    <div v-if="loading" class="d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>

    <form class="row g-3" id="ciao">
      <div class="col-md-6">
        <label for="inputName" class="form-label">Nome</label>
        <input type="text" class="form-control" id="inputname" required />
      </div>
      <div class="col-md-6">
        <label for="inputLastName" class="form-label">Cognome</label>
        <input type="text" class="form-control" id="inputLastName" required />
      </div>
      <div class="col-6">
        <label for="inputTell" class="form-label">Telefono</label>
        <input type="text" class="form-control" id="inputTell" pattern="[0-9]{9,15}" title="porco dio" required />
      </div>
      <div class="col-6">
        <label for="inputAddress" class="form-label">Indirizzo</label>
        <input type="text" class="form-control" id="inputAddress" required />
      </div>
      <div class="col-md-6">
        <label for="inputNote" class="form-label">Example textarea</label>
        <textarea class="form-control" id="inputNote" rows="3"></textarea>
      </div>
    </form>

    <div class="payment mt-2">
      <div id="dropin-container"></div>
      <button form="ciao" id="submit-button" class="button button--small button--green">Purchase</button>
    </div>
  </div>
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
  // -webkit-appearance: none;
  // -moz-appearance: none;
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
