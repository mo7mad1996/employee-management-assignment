<script setup>
import api from "@/services/api";
import { useHead } from "@vueuse/head";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const user = reactive({
  name: "",
  birthDate: null,
  salary: 0,
});

// methods
const add = () => {
  api
    .post("/employees", user)
    .then(() => {
      router.push("/employees");
      toast.success("success");
    })
    .catch(() => toast.error("Please fill all data "));
};
useHead({ title: "Employees" });
</script>
<template>
  <section><h1>Let's create a new Employee</h1></section>

  <form @submit.prevent="add">
    <div class="input-field">
      <label for="name">Name</label>
      <input v-model="user.name" id="name" />
    </div>
    <div class="input-field">
      <label for="birthDate">Birth Day</label>
      <input v-model="user.birthDate" id="birthDate" type="date" />
    </div>
    <div class="input-field">
      <label for="salary">Salary</label>
      <input v-model="user.salary" id="salary" />
    </div>

    <button>Add</button>
  </form>
</template>


<style scoped>
form {
  width: 400px;
  margin: auto;
}
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