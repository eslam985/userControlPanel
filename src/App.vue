<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
const store = useUserStore()

onMounted(async () => {
  await store.loadUsers()
})

onMounted(async () => {
  await store.loadUserById(1)
})
</script>

<!-- src/App.vue -->
<template>
  <router-view />
</template>
