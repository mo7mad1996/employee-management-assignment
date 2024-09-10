import { createRouter, createWebHistory } from "vue-router";

// components
import DepartmentsPage from "@/pages/Departments/home-page.vue";
import DepartmentsAddPage from "@/pages/Departments/add-page.vue";
import DepartmentPage from "@/pages/Departments/single-page.vue";
import DepartmentEditPage from "@/pages/Departments/edit-page.vue";
import EmployeesPage from "@/pages/employees/home-page.vue";
import EmployeesAddPage from "@/pages/employees/add-page.vue";

const routes = [
  { path: "/", redirect: "/departments" },
  {
    path: "/departments",
    component: DepartmentsPage,
    // children: [
    //   { path: "/add", component: DepartmentsAddPage },
    //   { path: ":id", component: DepartmentPage },
    // ],
  },
  { path: "/departments/add", component: DepartmentsAddPage },
  { path: "/departments/:id", component: DepartmentPage },
  { path: "/departments/:id/edit", component: DepartmentEditPage },
  { path: "/employees", component: EmployeesPage },
  { path: "/employees/add", component: EmployeesAddPage },
];

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(),
  routes,
});

export default router;
