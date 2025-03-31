<template>
    <div>
        <h1>Shopping Cart</h1>
        <table v-if="CartItems.length > 0">
            <thead>
                <tr>
                    <th>Qty</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in CartItems" v-bind:key="item.productId">
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.product.name }}</td>
                    <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price) }}</td>
                    <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price * item.quantity) }}</td>
                    <td v-on:click="deleteItem(item.cartItemId)">X</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Subtotal:</td>
                    <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subTotal) }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Tax:</td>
                    <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax) }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Total:</td>
                    <td>{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total) }}</td>
                </tr>
            </tbody>
        </table>
        
        <button id = "clearAll" v-on:click="deleteAll()">
            Clear All
        </button>
    </div>

</template>

<script>
import productService from "../services/ProductService";
import { mapActions } from 'vuex';

export default {

    data() {
        return {
            CartItems: [],
            tax: 0,
            subTotal: 0,
            total: 0,
        };
    },
    created() {
        this.getCart();
    },
    methods: {
        getCart() {
        productService.getCart().then((response) => {
            this.CartItems = response.data.items,
            this.tax = response.data.tax,
            this.subTotal = response.data.itemSubtotal,
            this.total = response.data.total
        }).catch((error) => {
            console.log(error);
        });
        },
        ...mapActions(['deleteFromCart']),
        deleteItem(id) {
            console.log(id);
            productService.removeProduct(id).then((response) => {
             if(response.status == 204) {
                    this.deleteFromCart(id);
                    this.getCart();
                }
            else {
                    alert("Error removing item from cart.");
            }   
            }
            ).catch((error) => {
                console.log(error);
            });
        },
        ...mapActions(['deleteAllProducts']),
        deleteAll() {
            productService.removeAll().then((response) => {
                if(response.status == 204) {
                    this.deleteAllProducts();
                    this.getCart();
                }
                else {
                    alert("Error removing all items from cart.");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style>
    #clearAll{
        position: fixed;
        right: 2vw;
        width: 10vw;
    }
</style>