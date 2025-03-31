<template>
    <header>
        <img src="/img/logo_400x70.png" alt="logo">
    
        <nav>
            <router-link v-bind:to="{ name: 'products' }">Home</router-link>
            <router-link v-bind:to="{ name: 'cart' }">Cart</router-link>
            <div id = "center" v-if="message" class="notification">
                {{ message }}
            </div>
            <div class="logout">
                <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
                    Logout
                </router-link>
                <router-link v-bind:to="{ name: 'login' }" v-else>Login</router-link>
            </div>

        </nav>
    </header>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(['message'])
    }
    };
</script>

<style>
header{
    position: fixed;
    width: 100%;
    text-align: center;;
}      

#center{
    position: fixed;
    margin-left: 50%;
}

nav{
    position: fixed;
    display: flex;
    width: 100%;
    justify-content: space-between;
    top: 100px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

a{
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: 20px;
}

.logout{
    margin-left: auto;
    padding-top: 10px;
    padding-bottom: 10px;
}

</style>