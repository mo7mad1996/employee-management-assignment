<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

// components
import DepartmentItem from "@/components/Department/Item-card.vue";
import { useHead } from "@vueuse/head";

// data
const departments = ref([]);
const loading = ref(true);
const errorMessage = ref(null);

// methods
const getDepartments = async () => {
  try {
    const response = await api.get("/departments");
    departments.value = response.data;
    loading.value = false;
  } catch (error) {
    errorMessage.value = "Error fetching departments";
    console.error("Error fetching departments:", error);
  }
};

const remove = (id) => {
  departments.value = departments.value.filter((e) => e.id != id);
};

// LSH
onMounted(() => {
  getDepartments();
});

useHead({ title: "Departments" });
</script>

<template>
  <section>
    <h1>Departments Page</h1>
  </section>

  <section>
    <header class="flex mb-2">
      <h3>Departments</h3>
      <router-link class="add" to="/departments/add">Add new One</router-link>
    </header>

    <div v-if="errorMessage" class="text-center error">
      {{ errorMessage }}
    </div>
    <div v-else-if="loading" class="text-center">
      <i class="fa-solid fa-spinner fa-spin fa-xl"></i>
    </div>
    <div v-else-if="!departments.length" class="mb-2 text-center">
      <div class="mb-2">No, Departments found</div>
      <router-link class="add" to="/departments/add"> Add new One </router-link>
    </div>
    <div v-else class="departments">
      <DepartmentItem
        v-for="department in departments"
        :key="department.id"
        :department="department"
        @remove="remove"
      />
    </div>
  </section>
</template>


<style scoped lang="scss">
.departments {
  flex-wrap: wrap;
  display: flex;
  gap: 0.7em;
}

.error {
  color: darkred;
  font-weight: 900;
}
</style>