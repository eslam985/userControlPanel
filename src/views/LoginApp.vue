<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 select-none">
    <div
      class="w-full max-w-md bg-card rounded-2xl border border-custom-border shadow-xl p-8 space-y-6"
    >
      <div class="text-center space-y-2">
        <div
          class="inline-flex w-12 h-12 bg-accent rounded-2xl items-center justify-center text-white font-black text-lg shadow-lg shadow-accent/20 mb-2"
        >
          D
        </div>
        <h2 class="text-2xl font-bold text-title tracking-tight">Welcome Back</h2>
        <p class="text-sub text-sm">Please enter your details to sign in / سجل دخولك</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <label for="username" class="form-label">Username / اسم المستخدم</label>
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-user"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-sub/50 text-sm"
            />
            <input
              id="username"
              type="text"
              placeholder="e.g. Bret"
              v-model="loginData.username"
              :class="[
                errors.username ? '!border-red-500 focus:!ring-red-100' : '',
                'form-input pl-11!',
              ]"
            />
          </div>

          <span
            v-if="errors.username"
            class="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1 animate-fade-in"
          >
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" /> {{ errors.username }}
          </span>
        </div>

        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between items-center">
            <label for="password" class="form-label mb-0">Password / كلمة المرور</label>
            <a
              href="#"
              class="text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
              >Forgot password?</a
            >
          </div>
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-lock"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-sub/50 text-sm"
            />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              v-model="loginData.password"
              :class="[
                errors.password ? '!border-red-500 focus:!ring-red-100' : '',
                'form-input pl-11!',
              ]"
            />
          </div>
          <span
            v-if="errors.password"
            class="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1 animate-fade-in"
          >
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" /> {{ errors.password }}
          </span>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input
            id="remember"
            type="checkbox"
            class="w-4 h-4 rounded text-accent border-custom-border focus:ring-accent/20 cursor-pointer accent-accent"
          />
          <label for="remember" class="text-xs font-semibold text-sub cursor-pointer select-none"
            >Remember me for 30 days</label
          >
        </div>

        <button
          type="submit"
          class="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          :disabled="isLoading"
        >
          <font-awesome-icon
            v-if="isLoading"
            icon="fa-solid fa-spinner"
            class="animate-spin text-sm"
          />
          <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: '',
  password: '',
})

const isLoading = ref(false)

const handleLogin = () => {
  errors.value.username = ''
  errors.value.password = ''

  if (!loginData.value.username) {
    errors.value.username = 'Username is required / اسم المستخدم مطلوب'
  }
  if (!loginData.value.password) {
    errors.value.password = 'Password is required / كلمة المرور مطلوبة'
  }

  if (errors.value.username || errors.value.password) return

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    router.push({ name: 'UsersList' })
  }, 1500)
}
</script>
