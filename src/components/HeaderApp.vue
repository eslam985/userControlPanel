<script setup>
import { useUserStore } from '@/stores/userStore.js'
const store = useUserStore()
</script>
<template>
  <header
    class="h-16 bg-card border-b border-custom-border px-2 md:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm"
  >
    <div class="flex items-center gap-2 md:gap-4">
      <button class="btn-primary p-2" @click="store.openSide">
        <font-awesome-icon icon="fa-solid  fa-bars" class="text-base w-5" />
      </button>
      <router-link to="/" class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-accent rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-accent/20"
        >
          D
        </div>
        <h1 class="text-title font-bold text-lg tracking-wider">DUM</h1>
      </router-link>
    </div>

    <div class="relative w-full max-w-md hidden sm:block">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-sub text-sm"
      />
      <input type="search" class="form-input pl-10! py-2!" placeholder="Quick search..." />
    </div>

    <div class="flex items-center gap-2 md:gap-5">
      <div class="flex items-center gap-2 select-none">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span class="text-sm font-semibold text-foreground">Admin</span>
      </div>
    </div>
  </header>
</template>
