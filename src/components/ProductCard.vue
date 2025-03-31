<template>
        <article class="product-card">
            <div class="sku">
                {{ product.productSku }}
            </div>
            <div class="price">
                {{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) }}
            </div>
            <router-link class="product-name action" v-bind:to="{ name: 'productDetails', params: { id: product.productId } }">
                <div>
                    {{ product.name }}
                </div>
            </router-link>
            <div class="product-image">
                <img src="/img/product_350x250.jpg" alt="">
            </div>
            <add-to-cart v-bind:productId="product.productId"/>
        </article>
</template>

<script>
import AddToCart from "./AddToCart.vue";
export default {
    props: ["product"],
    components: {AddToCart},
}
</script>

<style>

.product-card{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr auto;
    max-width: 300px;
    max-height: 300px;
    grid-template-areas: 
    'sku price'
    'name name'
    'img img'
    'cart cart';
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
}

.sku{
    grid-area: sku;
}

.price{
    grid-area: price;
    justify-self: end;
}

.product-name{
    grid-area: name;
    padding-top: 10px;
    padding-bottom: 10px;
}

.product-image{
    grid-area: img;
}

.product-card .product-image img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 4px;
  }
</style>

