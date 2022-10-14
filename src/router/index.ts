import type { App } from "vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useUserStore } from '../stores/user';
import { getDynamicModule } from "./dynamicModules";
const LOGIN_PATH = '/login';
const BASE_PATH = '/';
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: () => import(/* webpackChunkName "layout" */ '@/layout/index.vue'),
    children: [
      {
        path: "/:pathMatch(.*)",
        component: () => import(/* webpackChunkName "404" */ '@/views/404.vue'),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName "login" */ '@/views/login/index.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes,
});
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { path } = to;
  if (userStore.token){
    if (path === LOGIN_PATH) {
      next({
        path: BASE_PATH
      })
    } else {
      if (!userStore.routes || userStore.routes.length === 0) {
        console.log('添加路由');
        const layout = defaultRoutes.find(item => item.name === 'layout') as RouteRecordRaw;
        userStore.afterLogin();
        // layout?.children?.unshift({
        //   path: '/dashboard',
        //   component: getDynamicModule('/dashboard')
        // }, {
        //   path: '/about',
        //   component: getDynamicModule('/about')
        // })
        // router.addRoute(layout);
        next({ path: to.path });
      } else {
        next();
      }
    }
  } else {
    if (path !== LOGIN_PATH) {
      next({
        path: LOGIN_PATH
      })
    } else {
      next()
    }
  }
});

// router.afterEach((to, from, failure) => {
//   const userStore = useUserStore();
//   console.log('first', userStore.token, userStore.routes)
// })


export function setupRouter(app: App) {
  app.use(router);
}

export default router;
