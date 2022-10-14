import type { UserState } from "@/stores/user";
import type { RouteRecordRaw } from "vue-router";
import NotFound from '@/views/404.vue'
import { getDynamicModule } from './dynamicModules';
import { RouteType } from "@/service/enum";
import router, { defaultRoutes } from ".";

type NotEmptyArr<T = any[] | undefined> = T extends undefined ? [] : T;

const generatorDynamicComponent = (routes: NotEmptyArr<UserState['routes']>): RouteRecordRaw[] => {
  return routes?.map((route, idx) => {
    const { path, router, icon, type, children, redirect, name} = route;
    if (type === RouteType.Folder && children) {
      return {
        path: router,
        children: children && generatorDynamicComponent(children),
        name
      }
    }
    if (type === RouteType.Page && path) {
      const component = getDynamicModule(path);
      return {
        path: router,
        component: component || NotFound,
        name
      }
    } 
    return {
      path: router,
      component: NotFound,
      name
    }
  })
}

const generatorRoutes = (routes: NotEmptyArr<UserState['routes']>) => {
  const routeRecordRaw = generatorDynamicComponent(routes);
  const layout = defaultRoutes.find((route) => route.name === 'layout');
  layout!.children?.unshift(...routeRecordRaw);
  router.addRoute(layout as RouteRecordRaw);
}


export default generatorRoutes;
