<script setup>
import api from "@/services/api";
import { onMounted, ref, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

// config
const route = useRoute();
const toast = useToast();

// props
const props = defineProps(["employees"]);

// emits
const emit = defineEmits(["update"]);

// data
const employees = ref([]);

const is_checked = (id) => !!props.employees.find((e) => e.id == id);

// data
const id = route.params.id;

// methods
const getEmployees = () => {
  api
    .get(`/employees`)
    .then(({ data }) => (employees.value = data))
    .catch(() => toast.error("can not get the users"));
};

const append = (employeeId, e) => {
  if (e.target.checked)
    api
      .post(`/departments/${id}/employees`, { employeeId })
      .then(() => emit("update"))
      .catch(showError);
  else
    api
      .delete(`/departments/${id}/employees/${employeeId}`)
      .then(() => emit("update"))
      .catch(showError);
};

const showError = () => toast.error("there is an error with this action");

onMounted(getEmployees);
</script>

<template>
  <h2>
    <i class="fa-duotone fa-solid fa-sliders"></i>
    Edit Members
  </h2>

  <hr />
  <main class="employees">
    <div v-for="employee in employees" :key="employee.id" class="employee">
      <div class="checkbox-wrapper-20">
        <div class="switch">
          <input
            type="checkbox"
            class="input"
            :value="employee.id"
            :checked="is_checked(employee.id)"
            :id="employee.id"
            @change="append(employee.id, $event)"
          />
          <label for="one-20" class="slider"></label>
        </div>
      </div>
      <label :for="employee.id">
        <b>
          {{ employee.name }}
        </b>
      </label>
    </div>

    <div></div>
  </main>
</template>

<style lang="scss" scoped>
.employees {
  display: flex;
  flex-direction: column;

  .employee {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 0.4em 1em;

    label {
      flex: 1;
      cursor: pointer;
    }
    &:hover {
      background: var(--soft-white);
    }
  }
}
hr {
  margin: 1em 0;
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

.checkbox-wrapper-20 {
  --slider-height: 5px;
  --slider-width: calc(var(--slider-height) * 4);
  --switch-height: calc(var(--slider-height) * 3);
  --switch-width: var(--switch-height);
  --switch-shift: var(--slider-height);
  --transition: all 0.2s ease;

  --switch-on-color: #ef0460;
  --slider-on-color: #fc5d9b;

  --switch-off-color: #eeeeee;
  --slider-off-color: #c5c5c5;
}

.checkbox-wrapper-20 .switch {
  display: grid;
}

.checkbox-wrapper-20 .switch .slider {
  position: relative;
  display: inline-block;
  height: var(--slider-height);
  width: var(--slider-width);
  border-radius: var(--slider-height);
  cursor: pointer;
  background: var(--slider-off-color);
  transition: var(--transition);
}

.checkbox-wrapper-20 .switch .slider:after {
  background: var(--switch-off-color);
  position: absolute;
  left: calc(-1 * var(--switch-shift));
  top: calc((var(--slider-height) - var(--switch-height)) / 2);
  display: block;
  width: var(--switch-height);
  height: var(--switch-width);
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: var(--transition);
}

.checkbox-wrapper-20 .switch label {
  margin-right: 7px;
}

.checkbox-wrapper-20 .switch .input {
  display: none;
}

.checkbox-wrapper-20 .switch .input ~ .label {
  margin-left: var(--slider-height);
}

.checkbox-wrapper-20 .switch .input:checked ~ .slider:after {
  left: calc(var(--slider-width) - var(--switch-width) + var(--switch-shift));
}

.checkbox-wrapper-20 .switch .input:checked ~ .slider {
  background: var(--slider-on-color);
}

.checkbox-wrapper-20 .switch .input:checked ~ .slider:after {
  background: var(--switch-on-color);
}
</style>
