<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

// components
import AddMember from "@/components/Department/AddMember";
import { useHead } from "@vueuse/head";

// config
const route = useRoute();
const router = useRouter();
const toast = useToast();

// data
const department = ref();
const employees = ref([]);
const id = route.params.id;
const is_form_open = ref(false);

// methods
const getDepartment = async () => {
  api
    .get(`/departments/${id}`)
    .then((res) => (department.value = res.data))
    .catch(() => toast.error("No department with id:" + id));

  getEmployees();
};

const getEmployees = async () => {
  api
    .get(`/departments/${id}/employees`)
    .then((res) => (employees.value = res.data))
    .catch(() => toast.error("No department with id:" + id));
};

onMounted(getDepartment);

useHead({ title: "Single Department" });
</script>


<template>
  <div v-if="department">
    <section>
      <h1>
        <i class="fa-duotone fa-solid fa-bookmark"></i>
        {{ department.name }}
      </h1>
      <div class="sub">
        Department id: <code>{{ id }}</code>
      </div>
    </section>

    <div class="flex align-start">
      <section>
        <div class="flex">
          <h3>Members</h3>
          <button class="add" @click="is_form_open = true">
            <i class="fa-regular fa-sliders"></i>
            Edit members
          </button>
        </div>
        <ul class="employees" v-if="employees.length">
          <li
            v-for="(employee, n) in employees"
            :key="employee.id"
            @click="
              router.push({
                name: 'single_employee',
                params: { id: employee.id },
              })
            "
          >
            <!-- <i class="fa-duotone fa-solid fa-ghost"></i> -->
            <span class="index">{{ n + 1 }}</span>
            <div>
              <h3>{{ employee.name }}</h3>
              <div class="sub">{{ employee.id }}</div>
            </div>
          </li>
        </ul>

        <div v-else>No employees yet</div>
      </section>

      <section class="growUp" v-if="is_form_open">
        <AddMember :employees="employees" @update="getEmployees" />
      </section>
    </div>
    <code class="sub">{{ format(department.createdDate) }}</code>
  </div>
  <div v-else>
    <i class="fa-solid text-center fa-spinner fa-spin fa-xl"></i>
  </div>
</template>


<style lang=scss scoped>
section h1 {
  font-family: "Playwrite CU", cursive;
}

.sub {
  color: #bababa;
  margin-top: 1em;
}
.employees {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0.4em;
    border: 1px solid #e9e8e8;
    border-radius: 10px;
    cursor: pointer;
    margin-block: 1em;

    &:hover {
      background: #f8f8f8;
    }

    .index {
      font-size: 30px;
      color: tomato;
      display: grid;
      place-items: center;
      padding: 0 0.3em;
      aspect-ratio: 1/1;
      border-inline-end: 1px solid #e9e8e8;
    }
    h3 {
      color: var(--main-color);
    }
    .sub {
      font-size: 15px;
      margin: 0;
    }
  }
}
.flex {
  gap: 2em;

  > section {
    flex: 1;
  }
}
.growUp {
  animation: growUp 1s;
}

@keyframes growUp {
  from {
    flex: 0;
    opacity: 0;
  }
}
</style>
