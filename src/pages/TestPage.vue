<script>
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      paymentForm: false,
      dataForm: true,
      validatedForm: {},
    };
  },

  methods: {
    isValid(formData) {
      return formData.name !== '' && formData.lastName !== '' && formData.tel.match(/^\d+$/) && formData.tel !== '' && formData.address !== '';
    },

    sendOrder() {
      console.log(this.validatedForm);

      axios.post(store.baseUri + 'order/send', this.validatedForm).then((response) => {
        console.log(response);
      });
    },

    tokenCall() {
      const self = this;

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
                    if (response.data.succes) self.sendOrder();
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

    submitFormCheck() {
      const formData = {
        name: this.$refs.inputName.value,
        lastName: this.$refs.inputLastName.value,
        tel: this.$refs.inputTell.value.replace(/\s+/g, ''),
        address: this.$refs.inputAddress.value,
        note: this.$refs.inputNote.value,
      };

      if (this.isValid(formData)) {
        axios.post(store.baseUri + 'order', formData).then((response) => {
          this.validatedForm = response.data;

          this.dataForm = false;
          this.paymentForm = true;

          this.tokenCall();
        });
      }
    },
  },

  mounted() {},
};
</script>

<template>
  <div class="container">
    <div v-if="loading" class="d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>

    <form v-if="dataForm" @submit.prevent="submitForm" class="row g-3" id="ciao">
      <div class="col-md-6">
        <label for="inputName" class="form-label">Nome</label>
        <input type="text" class="form-control" ref="inputName" required />
      </div>
      <div class="col-md-6">
        <label for="inputLastName" class="form-label">Cognome</label>
        <input type="text" class="form-control" ref="inputLastName" value="" required />
      </div>
      <div class="col-6">
        <label for="inputTell" class="form-label">Telefono</label>
        <input type="tel" pattern="[0-9\s]+" class="form-control" ref="inputTell" required />
      </div>
      <div class="col-6">
        <label for="inputAddress" class="form-label">Indirizzo</label>
        <input type="text" class="form-control" ref="inputAddress" required />
      </div>
      <div class="col-md-6">
        <label for="inputNote" class="form-label">Note</label>
        <textarea class="form-control" ref="inputNote" rows="3"></textarea>
      </div>
      <button type="submit" @click="submitFormCheck()">Continua con il pagamento</button>
    </form>

    <div v-if="paymentForm" class="payment mt-2">
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
