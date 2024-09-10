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
  gap: 0.3em;
}
button {
  cursor: pointer;
  font-size: 20px;
  background: none;
  color: inherit;
  border: 1px solid transparent;
  padding: 0.3em;
  aspect-ratio: 1/1;
  border-radius: 10px;
  display: grid;

  color: rgb(var(--main-color));

  &:hover,
  &:focus {
    background: rgba(var(--main-color), 0.2);
    // border-color: rgb(var(--main-color));
  }
}

.edit {
  --main-color: 184, 186, 17;
}
.remove {
  --main-color: 254, 37, 37;
}
</style>