import type { defineComponent } from "vue";

const modules = import.meta.glob('../views/**/*.vue');

export interface ModuleElemnet {
  (): Promise<{
    default: ReturnType<typeof defineComponent>
  }>;
}

/**
 * 获取异步组件
 * @param moduleName 组件路径
 * @returns
 */
export function getDynamicModule(moduleName: string) {
  return modules[`../views${moduleName}.vue`] || modules[`../views${moduleName}/index.vue`];
}

export default modules;
