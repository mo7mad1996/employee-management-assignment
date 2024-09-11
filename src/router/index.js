import { createRouter, createWebHistory } from "vue-router";

// components
import DepartmentsPage from "@/pages/Departments/home-page.vue";
import DepartmentsAddPage from "@/pages/Departments/add-page.vue";
import DepartmentPage from "@/pages/Departments/single-page.vue";
import DepartmentEditPage from "@/pages/Departments/edit-page.vue";
import EmployeesPage from "@/pages/employees/home-page.vue";
import EmployeesAddPage from "@/pages/employees/add-page.vue";
import EmployeesSinglePage from "@/pages/employees/single-page.vue";

const routes = [
  { path: "/", redirect: "/departments" },
  {
    path: "/departments",
    children: [
      { path: "", component: DepartmentsPage },
      { path: "add", component: DepartmentsAddPage },
      { path: ":id", component: DepartmentPage, name: "single_department" },
      { path: ":id/edit", component: DepartmentEditPage },
    ],
  },
  {
    path: "/employees",
    children: [
      { path: "", component: EmployeesPage },
      { path: "add", component: EmployeesAddPage },
      { path: ":id", component: EmployeesSinglePage, name: "single_employee" },
    ],
  },
];

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(),
  routes,
});

export default router;
