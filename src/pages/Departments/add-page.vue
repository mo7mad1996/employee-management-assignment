
<script setup>
import { ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

// Get toast interface
const toast = useToast();

const department = ref({ name: "", manager: "" });
const router = useRouter();

const addDepartment = async () => {
  try {
    await api.post("/departments", department.value);
    router.push("/departments");
  } catch (error) {
    console.error("Error adding department:", error);
    error.response?.data?.errors?.Name?.forEach(showError);
    error.response?.data?.errors?.Manager?.forEach(showError);
  }
};

const showError = (e) => {
  toast.error(e);
};
</script>
  
<template>
  <section>
    <h1>Add a new Department</h1>
  </section>

  <section>
    <form @submit.prevent="addDepartment">
      <div class="input-field">
        <label for="department">Department Name</label>
        <input
          v-model="department.name"
          id="department"
          placeholder="Department Name"
        />
      </div>
      <div class="input-field">
        <label for="Manager">Department Manager</label>
        <input v-model="department.manager" placeholder="Department Manager" />
      </div>
      <button type="submit">Add Department</button>
    </form>
  </section>
</template>
  
<style scoped>
input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: var(--main-color);
  width: 100%;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  filter: brightness(120%);
}
</style>
  