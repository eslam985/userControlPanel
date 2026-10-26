<template>
  <div
    v-if="store.loading"
    class="bg-white border border-custom-border p-12 text-center text-sub flex flex-col items-center justify-center gap-3 rounded-2xl shadow-sm"
  >
    <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-accent text-3xl" />
    <span class="font-medium text-sm">Fetching user profile data...</span>
  </div>

  <FormApp v-else :initial-data="store.currentUser" :is-edit-mode="true" />
</template>

<script setup>
import FormApp from '@/components/FormApp.vue'
import { useUserStore } from '@/stores/userStore.js'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const store = useUserStore()
const route = useRoute()

onMounted(async () => {
  const userId = Number(route.params.id)
  await store.loadUserById(userId)
})
</script>
