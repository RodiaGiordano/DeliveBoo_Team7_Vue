<script>
export default {
  data() {
    return {
      services: [
        {
          text: 'Domande Frequenti',
          url: '#',
        },
        {
          text: 'Accedi',
          url: '#',
        },
        {
          text: 'Registrati su Deliveboo',
          url: '#',
        },
        {
          text: 'Miglior Prezzo Garantito',
          url: '#',
        },
        {
          text: "Scarica l'app di Deliveboo",
          url: '#',
        },
      ],
      cuisines: [
        {
          text: 'Cinese',
          url: '#',
        },
        {
          text: 'Messicano',
          url: '#',
        },
        {
          text: 'Greco',
          url: '#',
        },
        {
          text: 'Dolci',
          url: '#',
        },
        {
          text: 'Hamburger',
          url: '#',
        },
        {
          text: 'Cibo Italiano',
          url: '#',
        },
        {
          text: 'Tutti i tipi di cucine',
          url: '#',
        },
      ],
      information: [
        {
          text: 'informazioni su Deliveboo',
          url: '#',
        },
        {
          text: 'Diventa Partner Deliveboo',
          url: 'http://127.0.0.1:8000/',
        },
        {
          text: 'Diventa rider Deliveboo',
          url: '#',
        },
        {
          text: 'Partner Center',
          url: '#',
        },
        {
          text: 'Lavora con noi',
          url: '#',
        },
        {
          text: 'Politica dei cookie',
          url: '#',
        },
        {
          text: 'Termini e condizioni',
          url: '#',
        },
        {
          text: 'Informazioni Legali',
          url: '#',
        },
      ],
    };
  },
};
</script>

<template>
  <div class="mt-5 container d-flex justify-content-between bg-custom">
    <div>
      <h3 class="text-center">Servizio Clienti</h3>
      <ul>
        <li v-for="service in services">
          <a :href="service.url">{{ service.text }} </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="text-center">Cucine</h3>
      <ul>
        <li v-for="cuisine in cuisines">
          <a :href="cuisine.url">{{ cuisine.text }} </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="text-center">Chi Siamo</h3>
      <ul>
        <li v-for="info in information">
          <a :href="info.url">{{ info.text }} </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
