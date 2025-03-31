import axios from 'axios';

export default {
    getProducts() {
        return axios.get('/products')
    },
    getProduct(id) {
        return axios.get(`/products/${id}`)
    },
    addProduct(productId) {
        return axios.post('/cart/items',{
            productId: productId,
            quantity: 1
        })
    },
    getCart() {
        return axios.get('/cart')
    },
    removeAll() {
        return axios.delete('/cart')
    },
    removeProduct(id) {
        return axios.delete(`/cart/items/${id}`)
    }
}