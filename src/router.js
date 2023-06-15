import HomePage from "./pages/HomePage.vue";
import AboutUsPage from "./pages/AboutUsPage.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/aboutus",
      name: "about",
      component: AboutUsPage,
    },
  ],
});

export { router };