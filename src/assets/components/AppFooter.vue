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
          text: 'Informazioni su Deliveboo',
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
  <footer>
    <div class="custom-container container d-flex justify-content-between bg-custom">
      <div>
        <h5>Servizio Clienti</h5>
        <ul>
          <li v-for="service in services">
            <a :href="service.url">{{ service.text }} </a>
          </li>
        </ul>
      </div>
      <div>
        <h5>Cucine</h5>
        <ul>
          <li v-for="cuisine in cuisines">
            <a :href="cuisine.url">{{ cuisine.text }} </a>
          </li>
        </ul>
      </div>
      <div>
        <h5>Chi Siamo</h5>
        <ul>
          <li v-for="info in information">
            <a :href="info.url">{{ info.text }} </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="icons container">
      <h5>Seguici su:</h5>
      <font-awesome-icon class="icon" icon="fa-brands fa-instagram" style="color: #ffffff" />
      <font-awesome-icon class="icon" icon="fa-brands fa-facebook" style="color: #ffffff" />
      <font-awesome-icon class="icon" icon="fa-brands fa-twitter" style="color: #ffffff" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '../scss/partials/variables' as *;

footer {
  background-color: $bg2-color;
  .custom-container {
    h5 {
      margin-top: 1.2rem;
      font-weight: 700;
      color: $secondary-color;
    }
    ul {
      padding: 0 !important;

      a {
        cursor: pointer;
        color: $secondary-font-color !important;
        font-weight: 600;
        font-size: 0.85rem;
      }
    }
  }
}

.icons {
  .icon {
    margin-right: 15px;
    cursor: pointer;
  }
  h5 {
    color: $secondary-color;
  }
  font-size: 1.4rem;
  padding-bottom: 1rem;
}
</style>
