<script setup>
// images
import vueLogo from "@/assets/logo.png";

// data
const links = [
  {
    to: "/departments",
    name: "Departments",
    icon: "fa-regular fa-tablet-rugged",
  },
  {
    to: "/employees",
    name: "Employees",
    icon: "fa-light fa-users",
  },
];
</script>

<template>
  <aside>
    <div class="logo">
      <img :src="vueLogo" alt="logo" />
      <span>Employees management</span>
    </div>

    <nav>
      <ul>
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to" activeClass="active" :title="link.name">
            <i :class="link.icon"></i>
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<style scoped lang="scss">
aside {
  padding: 1em;

  .logo {
    font-family: "Playwrite CU", cursive;
    font-weight: 100;
    display: flex;
    align-items: center;
    gap: 0.4em;
    margin-bottom: 2em;

    img {
      height: 2em;
    }
  }

  ul {
    list-style: none;

    a {
      color: #888;
      text-decoration: none;
      display: flex;
      gap: 1em;
      padding: 0.6em 1em;

      &:hover,
      &.active {
        color: white;
      }
      &.active {
        background: var(--main-color);
        border-radius: 10px;
      }

      i {
        width: 1em;
      }
    }
  }
}
</style>