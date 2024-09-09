<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { onMounted, ref } from "vue";

// components
import ButtonsUsers from "@/components/employees/ButtonsUsers";

const employees = ref([]);

// methods
const getEmployees = () => {
  api.get("/employees").then(({ data }) => (employees.value = data));
};

// LCH
onMounted(() => getEmployees());
</script>
<template>
  <section><h1>Employees page</h1></section>

  <header class="flex mb-2">
    <h3>Employees</h3>
    <router-link to="/employees/add" class="add">Add an employee</router-link>
  </header>

  <table v-if="employees.length">
    <thead>
      <tr class="skip_me">
        <th>name</th>
        <th>birth of date</th>
        <th>salary</th>
        <th>Joined in</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in employees" :key="u.id">
        <td>{{ u.name }}</td>
        <td>{{ format(u.birthDate) }}</td>
        <td>{{ u.salary }}</td>
        <td>{{ format(u.dateOfJoining) }}</td>
        <td>
          <ButtonsUsers :id="u.id" @update="getEmployees" />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="text-center">
    <h1 class="mb-2">No data here try to add one.</h1>
    <router-link to="/employees/add" class="add">Add an employee</router-link>
  </div>
</template>

<style lang="scss" scoped>
table {
  display: table;
  width: 100%;
  //   border-radius: 10px;
  //   border: 1px solid #f6f6f6;

  thead {
    background: #f5f7f9;
    color: #596472;
  }

  th,
  td {
    border: none;
    padding: 0.3em 1em;
    text-align: start;
  }

  tr:not(.skip_me) {
    color: var(--soft-white);
    border-bottom: 1px solid #f6f6f6;

    &:hover {
      color: white;
      background: #0002;
    }
  }
}
</style>

