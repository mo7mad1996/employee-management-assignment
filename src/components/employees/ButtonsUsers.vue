<script setup>
import api from "@/services/api";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

// props & emits
const props = defineProps(["id"]);
const emit = defineEmits(["update"]);

// methods
const edit = () => {
  router.push(`/employees/${props.id}/edit`);
};
const remove = () => {
  api
    .delete("/employees/" + props.id)
    .then(() => {
      toast.success("employee has been deleted");
      emit("update");
    })
    .catch(() => toast.error("there is an error"));
};
</script>

<template>
  <div class="flex">
    <button class="edit" @click="edit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="remove" @click="remove">
      <i class="fa-regular fa-trash"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  justify-content: space-around;
}
button {
  font-size: 18px;
  cursor: pointer;
  background: none;
  color: inherit;
  border: 0;
}

.remove:focus,
.remove:hover {
  color: rgb(154, 37, 37);
}
.edit:focus,
.edit:hover {
  color: rgb(154, 146, 37);
}
</style>