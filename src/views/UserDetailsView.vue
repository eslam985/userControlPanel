<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const router = useRouter()
const route = useRoute()
const store = useUserStore()

onMounted(async () => {
  await store.loadUserById(route.params.id)
})

const handleDelete = async () => {
  const success = await store.deleteUserById(store.currentUser.id)
  if (success) {
    router.push('/users')
  }
}
</script>
<template>
  <main class="mt-6">
    <div
      v-if="store.loading"
      class="bg-white border border-custom-border p-12 text-center text-sub flex flex-col items-center justify-center gap-3 rounded-2xl shadow-sm"
    >
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-accent text-3xl" />
      <span class="font-medium text-sm">Fetching user profile data...</span>
    </div>

    <div v-else class="space-y-6">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-custom-border shadow-sm"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-14 h-14 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-xl select-none"
          >
            {{ store.currentUser?.name?.charAt(0) }}
          </div>
          <div>
            <h2 class="text-title font-bold text-xl tracking-tight">
              {{ store.currentUser?.name }}
            </h2>
            <p class="text-sub text-sm">
              User ID:
              <span class="font-semibold text-slate-700">#{{ store.currentUser?.id }}</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
          <router-link
            :to="{ name: 'EditUser' }"
            title="Edit User"
            class="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl border border-custom-border transition-all duration-200 active:scale-95 cursor-pointer text-sm shadow-sm"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-slate-500" />
            <span>Edit Profile</span>
          </router-link>

          <button
            @click="handleDelete"
            title="Delete User"
            class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-xl border border-red-100 transition-all duration-200 active:scale-95 cursor-pointer text-sm shadow-sm"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-white border border-custom-border p-6 rounded-2xl shadow-sm flex flex-col gap-4"
        >
          <div class="flex items-center gap-2 text-accent border-b border-slate-50 pb-3">
            <font-awesome-icon icon="fa-solid fa-id-card" class="text-base" />
            <h3 class="text-title font-bold text-base">Identity Info</h3>
          </div>

          <div class="space-y-3">
            <div>
              <span class="text-sub text-xs uppercase font-bold tracking-wider block"
                >Full Name</span
              >
              <span class="text-foreground font-semibold text-sm block mt-0.5">{{
                store.currentUser?.name
              }}</span>
            </div>
            <div>
              <span class="text-sub text-xs uppercase font-bold tracking-wider block"
                >Username</span
              >
              <span class="text-foreground font-medium text-sm block mt-0.5"
                >@{{ store.currentUser?.username }}</span
              >
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-custom-border p-6 rounded-2xl shadow-sm flex flex-col gap-4"
        >
          <div class="flex items-center gap-2 text-accent border-b border-slate-50 pb-3">
            <font-awesome-icon icon="fa-solid fa-envelope" class="text-base" />
            <h3 class="text-title font-bold text-base">Contact Info</h3>
          </div>

          <div class="space-y-3">
            <div>
              <span class="text-sub text-xs uppercase font-bold tracking-wider block"
                >Email Address</span
              >
              <span class="text-foreground font-semibold text-sm block mt-0.5 break-all">{{
                store.currentUser?.email || 'N/A'
              }}</span>
            </div>
            <div>
              <span class="text-sub text-xs uppercase font-bold tracking-wider block"
                >Phone Number</span
              >
              <span class="text-foreground font-medium text-sm block mt-0.5">{{
                store.currentUser?.phone || 'N/A'
              }}</span>
            </div>
            <div>
              <span class="text-sub text-xs uppercase font-bold tracking-wider block">Website</span>
              <a
                :href="'http://' + store.currentUser?.website"
                target="_blank"
                class="text-accent hover:text-accent-dark font-medium text-sm block mt-0.5 transition-colors"
              >
                {{ store.currentUser?.website || 'N/A' }}
              </a>
            </div>
          </div>
        </div>

        <div
          class="bg-white border border-custom-border p-6 rounded-2xl shadow-sm flex flex-col gap-4"
        >
          <div class="flex items-center gap-2 text-accent border-b border-slate-50 pb-3">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-base" />
            <h3 class="text-title font-bold text-base">Work & Location</h3>
          </div>

          <div class="space-y-4">
            <div class="bg-slate-50/70 p-3 rounded-xl border border-slate-100/50 space-y-1">
              <span class="text-slate-500 font-bold text-[10px] uppercase tracking-wider block"
                >Company</span
              >
              <span class="text-title font-bold text-sm block">{{
                store.currentUser?.company?.name || 'N/A'
              }}</span>
              <span class="text-sub text-xs block italic"
                >"{{ store.currentUser?.company?.catchPhrase || 'N/A' }}"</span
              >
            </div>

            <div class="bg-slate-50/70 p-3 rounded-xl border border-slate-100/50 space-y-2">
              <span class="text-slate-500 font-bold text-[10px] uppercase tracking-wider block"
                >Address</span
              >
              <div class="text-foreground text-xs font-medium space-y-1">
                <p>
                  <span class="text-sub font-semibold">City:</span>
                  {{ store.currentUser?.address?.city || 'N/A' }}
                </p>
                <p>
                  <span class="text-sub font-semibold">Street:</span>
                  {{ store.currentUser?.address?.street || 'N/A' }}
                </p>
                <p>
                  <span class="text-sub font-semibold">Suite:</span>
                  {{ store.currentUser?.address?.suite || 'N/A' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
