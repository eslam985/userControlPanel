<template>
  <main class="flex justify-center">
    <nav class="flex px-2 py-2 md:py-6 gap-2 md:gap-6 overflow-x-auto">
      <router-link
        exact-active-class="bg-accent! text-white! font-semibold shadow-md shadow-accent/20"
        class="flex items-center gap-2 px-3 py-2 rounded-xl text-sub hover:bg-sidebar-hover hover:text-white transition-all duration-200 text-sm"
        :to="{ name: 'UsersList' }"
      >
        <font-awesome-icon icon="fa-solid fa-users" class="text-base w-5" />
        <span>Users</span>
      </router-link>

      <router-link
        exact-active-class="bg-accent! text-white! font-semibold shadow-md shadow-accent/20"
        class="flex items-center gap-2 px-3 py-2 rounded-xl text-sub hover:bg-sidebar-hover hover:text-white transition-all duration-200 text-sm"
        :to="{ name: 'NewUser' }"
      >
        <font-awesome-icon icon="fa-solid fa-user-plus" class="text-base w-5" />
        <span>Add User</span>
      </router-link>
    </nav>
  </main>
</template>
