<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  const userStore = useUserStore();
  const router = useRouter()
  const login = async () => {
    await userStore.login({
      account: 'admin',
      password: '123456',
      type: 0
    });
    router.replace('/');
  }

</script>

<template>
  <button @click="login">login</button>
</template>