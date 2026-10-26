import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'users',
      component: MainLayout,
      children: [
        { path: 'users', name: 'UsersList', component: () => import('@/views/UsersListView.vue') },
        {
          path: 'user/:id',
          name: 'UserDetails',
          component: () => import('@/views/UserDetailsView.vue'),
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/SettingsApp.vue'),
        },
        {
          path: 'newuser',
          name: 'NewUser',
          component: () => import('@/views/NewUser.vue'),
        },
        {
          path: 'user/edit/:id',
          name: 'EditUser',
          component: () => import('@/views/EditUserView.vue'),
        },
      ],
    },
    { path: '/login', component: () => import('@/views/LoginApp.vue') },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
