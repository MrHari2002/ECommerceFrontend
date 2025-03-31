<template>
  <div id="cart-app">
    <app-header></app-header>
    <main>
      <router-view id = "router"/>
    </main>
    <footer>Copyright &copy; 2025</footer>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  name: "app",
  components: {AppHeader},
};
</script>

<style scoped>

#router{
    position: fixed;
    max-height: calc(100vh - 110px);
    top: 180px;
    bottom: 40px;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 20px;
}

footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}


</style>