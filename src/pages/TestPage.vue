<script>
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  data() {
    return {
      idFake: 2,

      errors: {
        nameErr: '',
        lastNameErr: '',
        telErr: '',
        addressErr: '',
        emailErr: '',
      },
      loading: false,
      paymentForm: false,
      dataForm: true,
      orderCar: {
        restaurant_id: 1,
        dishes: [
          {
            id: 9,
            quantity: 3,
          },
          {
            id: 10,
            quantity: 11,
          },
          {
            id: 11,
            quantity: 1,
          },
        ],
      },
      validatedForm: '',
    };
  },

  methods: {
    changeId() {
      if ((this.idFake = 2)) this.idFake = 25;
    },

    isValid(formData) {
      this.errors = {
        nameErr: '',
        lastNameErr: '',
        telErr: '',
        addressErr: '',
        emailErr: '',
      };
      if (formData.name.trim() == '' || !/^[A-Za-z]+$/.test(formData.name)) {
        this.errors.nameErr = `Inserisci un nome valido.`;
        return false;
      }

      if (formData.lastName.trim() == '' || !/^[A-Za-z]+$/.test(formData.lastName)) {
        this.errors.lastNameErr = `Inserisci un cognome valido.`;
        return false;
      }

      if (formData.tel.trim() == '' || !formData.tel.match(/^\d+$/) || formData.tel.length < 9) {
        this.errors.telErr = `Inserisci un numero di telefono valido.`;
        return false;
      }

      if (formData.address.trim() == '') {
        this.errors.addressErr = `l'indirizzo è obbligatorio.`;
        return false;
      }

      if (formData.email.trim() == '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        this.errors.emailErr = `Inserisci un'email valida.`;
        return false;
      }

      return true;
      // return formData.name !== '' && formData.lastName !== '' && formData.tel.match(/^\d+$/) && formData.tel !== '' && formData.address !== '';
    },

    sendOrder() {
      axios.post(store.baseUri + 'order/send', { order: this.orderCar, form: this.validatedForm }).then((response) => {
        console.log(response.data);
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
                  axios
                    .post(store.baseUri + 'order/make/payment', { payment_method_nonce: payload.nonce, id: self.idFake })
                    .then((response) => {
                      console.log(response.data);
                      if (response.data.succes) {
                        console.log('ciao');
                        alert('pagamento effettuato');
                        self.sendOrder();
                      }
                    })
                    .catch((error) => {
                      alert('pagamento non riuscito');
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

    submitDataCheck() {
      const formData = {
        name: this.$refs.inputName.value,
        lastName: this.$refs.inputLastName.value,
        tel: this.$refs.inputTell.value.replace(/\s+/g, ''),
        address: this.$refs.inputAddress.value,
        email: this.$refs.inputEmail.value,
        note: this.$refs.inputNote.value,
      };

      if (this.isValid(formData)) {
        axios.post(store.baseUri + 'order', { order: this.orderCar, form: formData }).then((response) => {
          this.orderCar = response.data.order;
          this.validatedForm = response.data.form;

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
    <button @click="changeId()">importo troppo alto</button>
    <div v-if="loading" class="d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    <div v-if="dataForm" class="alert alert-warning m-3" role="alert">* Campi obbligatori</div>
    <form v-if="dataForm" @submit.prevent="submitForm" class="row g-3" id="ciao">
      <div class="col-md-6">
        <label for="inputName" class="form-label">Nome *</label>
        <input type="text" class="form-control" id="inputname" ref="inputName" placeholder="Inserisci il tuo nome" pattern="[A-Za-z ']+" title="Inserisci un nome valido (solo lettere e spazi)" required />
        <div v-if="errors.nameErr" class="error-message alert alert-danger mt-2">{{ errors.nameErr }}</div>
      </div>
      <div class="col-md-6">
        <label for="inputLastName" class="form-label">Cognome *</label>
        <input type="text" class="form-control" id="inputLastName" ref="inputLastName" placeholder="Inserisci il tuo cognome" pattern="[A-Za-z ']+" title="Inserisci un cognome valido (solo lettere e spazi)" required />
        <div v-if="errors.lastNameErr" class="error-message alert alert-danger mt-2">{{ errors.lastNameErr }}</div>
      </div>
      <div class="col-6">
        <label for="inputTell" class="form-label">Telefono *</label>
        <input type="text" class="form-control" id="inputTell" ref="inputTell" placeholder="Inserisci il tuo numero di telefono" pattern="[0-9]{9,15}" title="Inserisci un numero di telefono valido" maxlength="15" minlength="9" required />
        <div v-if="errors.telErr" class="error-message alert alert-danger mt-2">{{ errors.telErr }}</div>
      </div>
      <div class="col-6">
        <label for="inputAddress" class="form-label">Indirizzo *</label>
        <input type="text" class="form-control" id="inputAddress" ref="inputAddress" placeholder="Inserisci il tuo indirizzo di consegna" title="Inserisci un indirizzo di consegna valido" required />
        <div v-if="errors.addressErr" class="error-message alert alert-danger mt-2">{{ errors.addressErr }}</div>
      </div>
      <div class="col-6">
        <label for="inputEmail" class="form-label">Email *</label>
        <input type="email" class="form-control" id="inputEmail" ref="inputEmail" placeholder="Inserisci la tua email" title="Inserisci un'email valida" required />
        <div v-if="errors.emailErr" class="error-message alert alert-danger mt-2">{{ errors.emailErr }}</div>
      </div>
      <div class="col-md-6">
        <label for="inputNote" class="form-label">Note</label>
        <textarea class="form-control" ref="inputNote" id="inputNote" rows="3" placeholder="es. citofono guasto, scala etc.."></textarea>
      </div>
      <button type="submit" @click="submitDataCheck()">Continua con il pagamento</button>
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
