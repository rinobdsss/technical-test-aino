import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginPage.vue";
import Register from "../components/RegisterPage.vue";
import Home from "../components/HomePage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
