<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

// data
const id = route.params.id;
const lastData = ref();

api
  .get("/departments/" + id)
  .then(({ data }) => (lastData.value = data))
  .catch(() => toast.error("No department Found"));

//   methods
const editDepartment = () => {
  api
    .patch("/departments/" + id, lastData.value)
    .then(() => {
      toast.info("the department has been change");
      router.push(`/departments/${id}`);
    })
    .catch(() => toast.error("there is an error, So please try again later"));
};

useHead({ title: `Edit a department ` });
</script>

<template>
  <div v-if="lastData">
    <section>
      <h1>
        <i class="fa-duotone fa-solid fa-bookmark"></i>
        Edit the department with id: {{ id }}
      </h1>
    </section>

    <section>
      <form @submit.prevent="editDepartment">
        <div class="input-field">
          <label for="department">Department Name</label>
          <input
            v-model="lastData.name"
            id="department"
            placeholder="Department Name"
          />
        </div>
        <div class="input-field">
          <label for="Manager">Department Manager</label>
          <input v-model="lastData.manager" placeholder="Department Manager" />
        </div>
        <button type="submit">Edit Department</button>
      </form>
    </section>
    <code>last update at: {{ format(lastData.updatedDate) }}</code>
  </div>
  <div v-else>
    <i class="fa-solid fa-spinner fa-spin fa-xl"></i>
  </div>
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
  