import { defineStore } from 'pinia'
import { fetchUsers, fetchUserById } from '@/services/api.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    currentPage: 1,
    limit: 5,
    loading: false,
    isShowSideBar: false,
    notification: {
      show: false,
      message: '',
    },
  }),

  actions: {
    async loadUserById(id) {
      this.loading = true
      try {
        this.currentUser = await fetchUserById(id)
      } finally {
        this.loading = false
      }
    },

    async loadUsers() {
      this.loading = true
      try {
        this.users = await fetchUsers(this.currentPage, this.limit)
      } finally {
        this.loading = false
      }
    },

    async deleteUserById(id) {
      if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المستخدم؟')) {
        this.loading = true
        try {
          this.users = this.users.filter((user) => user.id !== id)
          this.triggerNotification('تم حذف المستخدم بنجاح!')
          return true
        } catch (error) {
          this.triggerNotification('حدث خطأ أثناء الحذف')
          return false
        } finally {
          this.loading = false
        }
      }
    },
    addUser(newUser) {
      this.users.push(newUser)
      this.triggerNotification('تم إضافة المستخدم الجديد بنجاح!')
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex((u) => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
        this.triggerNotification('تم تحديث بيانات المستخدم بنجاح!')
      }
    },
    triggerNotification(msg) {
      this.notification.show = true
      this.notification.message = msg

      setTimeout(() => {
        this.notification.show = false
        this.notification.message = ''
      }, 3000)
    },

    nextPage() {
      this.currentPage++
      this.loadUsers()
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.loadUsers()
      }
    },
    openSide() {
      this.isShowSideBar = !this.isShowSideBar
    },
  },
})
