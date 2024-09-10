<script setup>
import { useHead } from "@vueuse/head";
import NavBar from "@/components/layout/NavBar.vue";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://kit-pro.fontawesome.com/releases/v6.6.0/css/pro.min.css",
    },
  ],
});
</script>


<template>
  <div id="app">
    <NavBar></NavBar>

    <main class="content page">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
#app {
  display: flex;
  color: #071d4b;
  background: #edeff1;
  overflow: hidden;
  height: 100dvh;
  width: 100%;
  align-items: stretch;

  .content {
    flex: 1;
  }
}
</style>
