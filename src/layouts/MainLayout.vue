<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0 h-full">
      <Header />
      <HorizontalBar />

      <main class="flex-1 overflow-y-auto p-3 md:max-w-7xl md:mx-auto flex flex-col gap-4">
        <router-view />
      </main>

      <Footer />
    </div>

    <notificationApp />
  </div>
</template>

<script setup>
import Header from '@/components/HeaderApp.vue'
import Footer from '@/components/FooterApp.vue'
import Sidebar from '@/components/SidebarApp.vue'
import HorizontalBar from '@/components/HorizontalBar.vue'

import notificationApp from '@/components/notificationApp.vue'
</script>
