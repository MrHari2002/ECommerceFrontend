<template>
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" v-bind:key="product.productSku">
                <td>{{ product.productSku }}</td>
                <router-link class="product-name action" v-bind:to="{ name: 'productDetails', params: { id: product.productId } }">
                    <td>{{ product.name }}</td>
                </router-link>
                <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) }}</td>
                <add-to-cart class="add-to-cart" v-bind:productId="product.productId"/>
            </tr>
        </tbody>
    </table>
</template>

<script>
import AddToCart from './AddToCart.vue';
export default {
    props: ["products"],
    components: {AddToCart},
}
</script>

<style scoped>
.add-to-cart{
    margin-top: 3vh;
}
</style>