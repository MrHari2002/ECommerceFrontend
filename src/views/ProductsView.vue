<template>
  <div class="home">
    <div id="heading-line">
      <div id = "product">
        Products
      </div>
      <div id = tiles>
      <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="View tiles"
        />
        &nbsp
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: !cardView }"
          v-on:click="cardView = false"
          icon="fa-solid fa-table"
          title="View table"
        />
      </div>
      <div id = "search-container">
        <input type="text" id="search-input" v-model="searchTerm" placeholder="Search Products">
      </div>   
      <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
       </p>
    </div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else id = "view-container">
      <product-card v-if="cardView" v-for="product in filteredProducts" v-bind:key="product.id" v-bind:product="product"></product-card>
      <product-table v-else v-bind:products="filteredProducts"></product-table>
    </div>
  </div>
</template>

<script>
import productCard from "../components/ProductCard.vue";
import ProductService from "../services/ProductService";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductTable from "../components/ProductTable.vue";
export default {
  components: {
    productCard,
    LoadingSpinner,
    ProductTable},
  data() {
    return {
      error:null,
      isLoading: false,
      products: [],
      cardView: true,
      searchTerm: "",
    };
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      })
    },
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {},

  created() {
    this.isLoading = true;
    ProductService.getProducts()
      .then((response) => {
        this.products = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error;
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
#product{
    position: fixed;
    top: 11vw;
    font-size: xx-large;
}

#product-summary{
    position: fixed;
}

#search-container{
    position: fixed;
    top: 11vw;
    left: 84vw;
    max-width: 500px;
}

#tiles{
    position: fixed;
    top: 11vw;
    left: 80vw;
}

#view-container{
    position: fixed;
    top: 35vh;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    height: 60%;
}
</style>