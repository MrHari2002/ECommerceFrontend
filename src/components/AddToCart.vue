<template>
    <div v-on:click="addProductToCart(productId)" v-if="isLoggedIn" class="cart">
        <font-awesome-icon title = "Add to Cart" icon="fa-solid fa-cart-plus icon action"/>
    </div>
</template>

<script>
import productService from '../services/ProductService';
import { mapActions } from 'vuex';
export default {
    props: ["productId"],
    computed: {
        isLoggedIn() {
            return this.$store.state.user.id != null;
        },
    },
    methods: {
        ...mapActions(['addToCart']),
        addProductToCart(productId) {
            productService.addProduct(productId).then((response) => {
                if(response.status == 200) {
                    console.log("Item added to cart.");
                    this.addToCart(productId);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
    .cart{
        flex: auto;
        object-fit: contain;
        margin: 4px;
        grid-area: cart;
        justify-self: end;
    }
</style>