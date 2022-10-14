<script setup lang="ts">
import Menu from './Menu.vue';
import Logo from './Logo.vue';
import { Layout } from "ant-design-vue";

</script>
<template>
  <div>
		<Layout has-sider>
			<Layout.Sider class="layout-side">
				<Logo />
				<Menu />
			</Layout.Sider>
			<Layout>
				<Layout.Header>header</Layout.Header>
				<Layout.Content>
					<RouterView />
				</Layout.Content>
			</Layout>
		</Layout>
  </div>
</template>
<style scoped>
	.layout-sider {
		background: red;
	}
</style>
