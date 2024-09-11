<script setup>
import { defineProps } from "vue";
// components
import DepartmentItem from "@/components/Department/Item-card.vue";

const props = defineProps(["departments"]);
</script>
<template>
  <div class="section">
    <h1>Departments</h1>

    <div class="list">
      <DepartmentItem
        v-for="department in props.departments"
        :key="department.id"
        :department="department"
        @remove="remove"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.section {
  background: white;
  padding: 1em;
  margin-block: 3em;

  h1 {
    margin-block-end: 1em;
  }
}
.list {
  display: flex;
  gap: 1em;
}
</style>