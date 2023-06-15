import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import AboutUsPage from "./pages/AboutUsPage.vue";
import ProjectsPage from "./pages/ProjectsPage.vue";
import SingleProjectPage from "./pages/SingleProjectPage.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsPage,
    },
    {
      path: "/projects/:slug",
      name: "single-project",
      component: SingleProjectPage,
    },
    {
      path: "/aboutus",
      name: "about",
      component: AboutUsPage,
    },
  ],
});

export { router };