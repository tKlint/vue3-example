<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { Menu } from "ant-design-vue";
import type { SelectEventHandler } from "_ant-design-vue@3.2.13@ant-design-vue/lib/menu/src/interface";
const route = useRouter();
const routeItem = route.getRoutes();
const whiteList = routeItem
  .find((item) => item.name === "layout")
  ?.children.filter(
    (item) => !item.meta?.hide && item.path !== "/:pathMatch(.*)"
  );
const menuItem = ref(whiteList);
const onSelect: SelectEventHandler = (item) => {
  route.push({
    path: item.key as string,
  });
};
console.log(menuItem);
</script>
<template>
  <div class="layout-menu">
    <Menu @select="onSelect">
      <Menu.Item v-for="item in menuItem" :key="item.path">{{
        item.name
      }}</Menu.Item>
    </Menu>
  </div>
</template>
<style scoped>
.layout-menu {
  min-height: 100vh;
}
</style>
