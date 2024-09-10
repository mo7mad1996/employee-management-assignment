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
  <NavBar />

  <main class="content page">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.path" class="transition">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>

    <!-- without router animation -->
    <!-- <router-view></router-view> -->
  </main>
</template>

<style lang="scss" scoped>
.content {
  overflow: hidden;
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
  transform: scale(1, 1);
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.05, 1.05);
}
.fade-enter-from {
  transform: scale(0.97, 0.96);
}
</style>
