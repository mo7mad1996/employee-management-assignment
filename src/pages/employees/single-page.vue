<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { useHead } from "@vueuse/head";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

// components
import DepartmentsList from "@/components/employees/DepartmentsList";

// config
const route = useRoute();
const toast = useToast();

// data
const id = route.params.id;
const employee = ref();
const departments = ref([]);

// methods
const get_employee = () => {
  api
    .get(`/employees/${id}`)
    .then(({ data: d }) => (employee.value = d))
    .catch(() => toast.error("there is employee no with id:" + id));
};
const get_departments = () => {
  api
    .get(`/employees/${id}/departments`)
    .then(({ data: d }) => (departments.value = d))
    .catch(() => toast.error("there is an error with departments"));
};

const format_num = (number) =>
  number.toLocaleString("en-EG", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "EGP",
  });

// LSH
onMounted(() => {
  get_employee();
  get_departments();
});

// head
useHead({ title: "single employee" });
</script>
    
<template>
  <template v-if="employee">
    <section>
      <h1><i class="fa-duotone fa-solid fa-fire"></i> {{ employee.name }}</h1>
    </section>

    <div class="info">
      <hgroup class="info__card">
        <span>Salary</span>
        <p>{{ format_num(employee.salary) }}</p>
      </hgroup>

      <hgroup class="info__card">
        <span>DOB</span>
        <p>{{ format(employee.birthDate) }}</p>
      </hgroup>

      <hgroup class="info__card">
        <span>Joined</span>
        <p>{{ format(employee.dateOfJoining) }}</p>
      </hgroup>
    </div>

    <div class="departments">
      <DepartmentsList v-if="departments.length" :departments="departments" />

      <div class="error" v-else>
        <h2>No departments with this employee</h2>
      </div>
    </div>
  </template>

  <!-- notFound -->
  <template v-else>
    <div class="text-center">
      <h1>404</h1>
      <div>employee not found</div>
    </div>
  </template>
</template>


<style lang="scss" scoped>
section h1 {
  font-family: "Playwrite CU", cursive;
  text-transform: capitalize;
}

.info {
  display: flex;
  gap: 2em;
  //   padding: 1em;

  &__card {
    flex: 1;
    padding: 1.4em;
    border-radius: 10px;
    background-image: conic-gradient(
      from 40deg at 70% 40%,
      hsl(var(--h), 63%, 55%),
      hsl(var(--h), 30%, 45%)
    );
    // border: 2px solid hsl(var(--h), 30%, 45%);

    color: white;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

    &:nth-of-type(1) {
      --h: 140;
    }
    &:nth-of-type(2) {
      --h: 70;
    }
    &:nth-of-type(3) {
      --h: 210;
    }

    span {
      font-size: 16px;
    }
    p {
      margin-top: 1em;
      font-weight: bold;
      font-size: 22px;
    }
  }
}

.departments .error {
  min-height: 300px;
  display: grid;
  place-items: center;
}
</style>