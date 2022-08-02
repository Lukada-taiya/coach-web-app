import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// import CoachesDetail from "./pages/coaches/CoachesDetails.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachesRegistration from "./pages/coaches/CoachesRegistration.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import RequestReceived from "./pages/requests/RequestReceived.vue";
import NotFound from "./pages/NotFound.vue";
// import UserAuth from "./pages/UserAuth.vue";
import store from "./store/index.js";

const CoachesDetail = defineAsyncComponent(() =>
  import("./pages/coaches/CoachesDetails.vue")
);
const CoachesRegistration = defineAsyncComponent(() =>
  import("./pages/coaches/CoachesRegistration.vue")
);
const ContactCoach = defineAsyncComponent(() =>
  import("./pages/requests/ContactCoach.vue")
);
const RequestReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestReceived.vue")
);
const UserAuth = defineAsyncComponent(() => import("./pages/UserAuth.vue"));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachesDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }],
    },
    {
      path: "/requests",
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: CoachesRegistration,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
