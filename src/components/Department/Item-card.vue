<script setup>
import api from "@/services/api";
import format from "@/services/format";
import { defineProps, ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

// data
const props = defineProps(["department"]);
const router = useRouter();
const is_menu_open = ref(false);

// Get toast interface
const toast = useToast();

const emit = defineEmits(["remove"]);

// methods
const remove = async (id) => {
  try {
    await api.delete(`/departments/${id}`);
    toast.success("the department has been deleted");
    emit("remove", id);
  } catch (error) {
    console.error("Error deleting department:", error);
    toast.error(error?.response?.data?.department);
  }
};
const edit = (id) => {
  router.push(`/departments/${id}/edit`);
};

const closeMenu = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget))
    is_menu_open.value = false;
};
</script>
<template>
  <div
    @click="
      router.push({
        name: 'single_department',
        params: props.department,
      })
    "
    class="department"
  >
    <header>
      <span>{{ format(department.createdDate) }}</span>

      <div
        @click.stop="is_menu_open = !is_menu_open"
        @focusout="closeMenu"
        tabindex="0"
      >
        <button>
          <i class="fa-solid fa-ellipsis"></i>
        </button>
        <div class="buttons" v-if="is_menu_open">
          <div @click="edit(department.id)" class="edit">
            edit
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
          <div @click="remove(department.id)" class="remove">
            delete
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </header>
    <h3>{{ department.name }}</h3>

    <footer>
      <i class="fa-sharp fa-regular fa-star-christmas"></i>
      {{ department.manager }}
    </footer>
  </div>
</template>


<style lang="scss" scoped>
.department {
  background: var(--soft-white);
  padding: 1em;
  border-radius: 10px;
  border: 1px solid var(--soft-white);
  color: var(--main-color);
  width: 220px;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  transition: 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    color: white;
    --soft-white: var(--main-color);
    cursor: pointer;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.8em;
    }
  }
  footer,
  header {
    color: #ababab;
    position: relative;

    button {
      color: inherit;
      background: none;
      border: none;
      padding: 3px 7px;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.152);
      }
    }
  }

  h3 {
    margin: 1.3em 0 0.9em;
  }
}

.buttons {
  position: absolute;
  top: 25px;
  right: 0;
  background: white;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  color: rgb(69, 69, 69);

  > div {
    padding: 0.3em 1em;
    place-content: center;
    text-align: end;
    cursor: pointer;
    text-transform: capitalize;
    background: inherit;

    &:hover {
      color: var(--color);
      filter: brightness(80%);
    }

    i {
      width: 1em;
      display: inline-grid;
      // margin: 0 10px;
    }
  }

  .remove {
    --color: red;
  }
  .edit {
    --color: rgb(83, 210, 44);
  }
}
</style>