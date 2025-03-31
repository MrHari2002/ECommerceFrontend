<template>
    <div class="details">
        <h1>{{ product.name }}</h1>
        <h2>{{ product.description }}</h2>
        <p>{{ product.productSku }} &nbsp {{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) }}</p>
        <p>{{ product.name }}</p>
        <img src="/img/product_350x250.jpg" alt="">
        <button id = "addToCart">
            Add To cart
            <add-to-cart v-bind:productId="product.productId"/>
        </button>
    </div>
</template>

<script>
import ProductService from '../services/ProductService';
import AddToCart from './AddToCart.vue';
export default {
    components: {AddToCart},
    data() {
        return {
            product: {}
        }
    },

    created() {
        ProductService.getProduct(this.$route.params.id)
            .then(response => {
                this.product = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<style scoped>
    .details{
        display: flex;
        flex-direction: column;
    }
    img {
        width: 20vw;
        height: 20vh;
        display: block;
        border-radius: 4px;
    }
    #addToCart{
        position: fixed;
        right: 20px;
        width: 10vw;
    }
</style>