<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { onMounted, ref } from "vue";

// components
import ButtonsUsers from "@/components/employees/ButtonsUsers";
import { useHead } from "@vueuse/head";
import { useRouter } from "vue-router";

const router = useRouter();

const employees = ref([]);

// methods
const getEmployees = () => {
  api.get("/employees").then(({ data }) => (employees.value = data));
};

// LCH
onMounted(() => getEmployees());

useHead({ title: "Employees" });
</script>
<template>
  <section><h1>Employees page</h1></section>

  <div class="cover" v-if="employees.length">
    <header class="flex mb-2">
      <h3>Employees</h3>
      <router-link to="/employees/add" class="add">Add an employee</router-link>
    </header>

    <ul>
      <li
        v-for="u in employees"
        :key="u.id"
        @click="router.push({ params: { id: u.id }, name: 'single_employee' })"
      >
        <div class="icon">
          <i class="fa-regular fa-user-tie"></i>
        </div>

        <div class="info">
          <h5>{{ u.name }}</h5>
          <span>{{ format(u.birthDate) }}</span>
        </div>

        <div class="buttons">
          <ButtonsUsers :id="u.id" @update="getEmployees" />
        </div>
      </li>
    </ul>
  </div>

  <div v-else class="text-center">
    <h1 class="mb-2">No data here try to add one.</h1>
    <router-link to="/employees/add" class="add">Add an employee</router-link>
  </div>
</template>

<style lang="scss" scoped>
.cover {
  background: white;
  padding: 1em 0.2em;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
}
header {
  padding: 1em;
  border-radius: 10px;
}
li {
  list-style: none;
  display: flex;
  border-radius: 10px;
  gap: 1em;
  margin-top: 0.3em;
  // box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
  //   rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 1em;

  .container {
    width: 90%;
    border-bottom: 1px solid #b4afaf;
  }

  .icon {
    font-size: 20px;
  }

  &:hover {
    // filter: brightness(70%);
    background: #6c6c6c1b;
  }

  .info {
    flex: 1;

    span {
      color: #c3c3c3;
      font-size: 14px;
    }
  }

  .buttons {
    opacity: 0;
  }

  &:hover .buttons {
    transition: 0.3s;
    opacity: 1;
  }
}
</style>

