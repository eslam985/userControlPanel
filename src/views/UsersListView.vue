<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'

const store = useUserStore()

onMounted(async () => {
  await store.loadUsers()
})
</script>

<template>
  <main class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-title font-bold text-2xl tracking-tight">User Management</h2>
        <p class="text-sub text-sm mt-1">Manage, view, and update your application users.</p>
      </div>

      <router-link to="/newuser" class="btn-primary flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-plus" class="text-sm" />
        Add New User
      </router-link>
    </div>

    <div
      class="bg-white border border-custom-border p-12 flex flex-col items-center justify-center text-center rounded-2xl shadow-sm"
      v-if="!store.loading && store.users.length <= 0"
    >
      <div
        class="w-16 h-16 bg-slate-50 text-sub rounded-2xl flex items-center justify-center mb-4 text-xl"
      >
        <font-awesome-icon icon="fa-solid fa-users-slash" />
      </div>
      <h3 class="text-title font-bold text-lg mb-1">No users found</h3>
      <p class="text-sub text-sm mb-6 max-w-sm">
        There are currently no users registered on this page. Start by adding a new one.
      </p>
      <router-link to="/newuser" class="btn-primary"> Add First User </router-link>
    </div>

    <div
      class="bg-card rounded-2xl border border-custom-border shadow-sm overflow-hidden"
      v-if="store.users.length > 0"
    >
      <div v-if="store.loading" class="p-8 text-center text-sub flex flex-col items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-accent text-2xl" />
        <span>Loading users data...</span>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-custom-border">
              <th
                class="text-sub font-semibold text-xs uppercase tracking-wider p-4 text-center w-20"
              >
                Id
              </th>
              <th class="text-sub font-semibold text-xs uppercase tracking-wider p-4">Name</th>
              <th class="text-sub font-semibold text-xs uppercase tracking-wider p-4">Company</th>
              <th class="text-sub font-semibold text-xs uppercase tracking-wider p-4">Email</th>
              <th
                class="text-sub font-semibold text-xs uppercase tracking-wider p-4 text-center w-24"
              >
                View
              </th>
              <th
                class="text-sub font-semibold text-xs uppercase tracking-wider p-4 text-center w-24"
              >
                Delete
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="user in store.users"
              :key="user.id"
              class="hover:bg-slate-50/50 transition-colors duration-150"
            >
              <td class="text-sub font-semibold p-4 text-center text-sm bg-slate-50/30">
                {{ user.id }}
              </td>

              <td class="text-title font-semibold p-4 text-sm">{{ user.name }}</td>

              <td class="text-foreground p-4 text-sm">
                {{ !user.company.name ? 'N/A' : user.company.name }}
              </td>

              <td class="text-sub p-4 text-sm">{{ !user.email ? 'N/A' : user.email }}</td>

              <td class="p-0 text-center">
                <router-link
                  :to="`/user/${user.id}`"
                  title="View User"
                  class="flex items-center justify-center w-full h-12 text-slate-400 hover:text-accent transition-colors"
                >
                  <font-awesome-icon icon="fa-solid fa-eye" class="text-base" />
                </router-link>
              </td>

              <td
                @click="store.deleteUserById(user.id)"
                title="Delete User"
                class="p-0 text-center cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-all duration-150"
              >
                <div class="flex items-center justify-center w-full h-12">
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-sm" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="pt-4 flex justify-center items-center gap-6"
      v-if="store.currentPage > 1 || store.users.length > 0"
    >
      <button
        class="w-10 h-10 rounded-xl border border-custom-border flex items-center justify-center text-sub hover:bg-white hover:text-title hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sub disabled:hover:shadow-none disabled:cursor-not-allowed transition-all cursor-pointer"
        :disabled="store.currentPage === 1 || store.loading"
        @click="store.prevPage"
      >
        <font-awesome-icon icon="fa-solid fa-angles-left" class="text-xs" />
      </button>

      <div class="flex items-center gap-1.5 text-sm select-none">
        <span class="text-sub">Page</span>
        <span class="font-bold text-title bg-slate-100 px-3 py-1 rounded-lg text-base">{{
          store.currentPage
        }}</span>
      </div>

      <button
        class="w-10 h-10 rounded-xl border border-custom-border flex items-center justify-center text-sub hover:bg-white hover:text-title hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sub disabled:hover:shadow-none disabled:cursor-not-allowed transition-all cursor-pointer"
        @click="store.nextPage"
        :disabled="store.users.length < store.limit || store.loading"
      >
        <font-awesome-icon icon="fa-solid fa-angles-right" class="text-xs" />
      </button>
    </div>
  </main>
</template>
