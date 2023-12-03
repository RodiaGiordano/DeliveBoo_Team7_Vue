<script>
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  data() {
    return {
      token: 'a',
      restaurants: [],
    };
  },

  methods: {
    prova(endpoint = store.baseUri + 'restaurant/1') {
      axios.get(endpoint).then((response) => {
        // console.log(response);
        this.restaurants = response.data;
      });
    },

    // tokenCall(endpoint = store.baseUri + 'order/generate') {
    //   axios.get(endpoint).then((response) => {
    //     console.log(response.data.token);
    //     this.token = response.data.token;
    //   });
    // },
  },

  mounted() {
    this.prova();
    // this.tokenCall();
  },

  components: {},
};
var button = document.querySelector('#submit-button');

braintree.dropin.create(
  {
    tokenCall(endpoint = store.baseUri + 'order/generate') {
      axios.get(endpoint).then((response) => {
        console.log(response.data.token);
        this.token = response.data.token;
      });
    },
    authorization: this.token,
    selector: '#dropin-container',
  },
  function (err, instance) {
    button.addEventListener('click', function () {
      console.log(authorization);
      instance.requestPaymentMethod(function (err, payload) {
        // Submit payload.nonce to your server
      });
    });
  },
);
</script>

<template>
  <!-- Step one: add an empty container to your page -->
  <div id="dropin-container"></div>
  <button id="submit-button" class="button button--small button--green">Purchase</button>
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
