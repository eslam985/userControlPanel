<!-- /src/components/FormApp.vue -->
<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { nameRe, emailRe, UrlRe, validateFieldform } from '@/utils/validation.js'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      username: '',
      name: '',
      email: '',
      phone: null,
      website: '',
      company: { name: '', catchPhrase: '' },
      address: { city: '', street: '', suite: '' },
    }),
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const store = useUserStore()
const router = useRouter()
const isSubmitting = ref(false)

const data = ref(JSON.parse(JSON.stringify(props.initialData)))

watch(
  () => props.initialData,
  (newData) => {
    data.value = JSON.parse(JSON.stringify(newData))
  },
  { deep: true },
)

const error = ref({
  username: false,
  name: false,
  email: false,
  phone: false,
  website: false,
  company: { name: false, catchPhrase: false },
  address: { city: false, street: false, suite: false },
})

function CreateId() {
  return Math.floor(Math.random() * 9e10 + 1)
}

function toRouterUsers() {
  router.push('/users')
}

const validate = (value, regex, errorKey, nestedKey = null) => {
  if (!validateFieldform(value, regex)) {
    if (nestedKey) {
      error.value[nestedKey][errorKey] = true
    } else {
      error.value[errorKey] = true
    }

    store.triggerNotification(`error: ${errorKey ?? nestedKey} not valid`)
    return false
  }

  return true
}

function handleSubmit() {
  error.value = {
    username: false,
    name: false,
    email: false,
    phone: false,
    website: false,
    company: { name: false, catchPhrase: false },
    address: { city: false, street: false, suite: false },
  }

  const isFormValid = [
    validate(data.value?.username, nameRe, 'username'),
    validate(data.value?.name, nameRe, 'name'),
    validate(data.value?.email, emailRe, 'email'),
    validate(data.value?.website, UrlRe, 'website'),
    validate(data.value.company?.name, nameRe, 'name', 'company'),
    validate(data.value.company?.catchPhrase, nameRe, 'catchPhrase', 'company'),
    validate(data.value.address?.city, nameRe, 'city', 'address'),
    validate(data.value.address?.street, nameRe, 'street', 'address'),
  ].every((result) => result === true)

  if (!isFormValid) {
    return
  }

  isSubmitting.value = true

  if (props.isEditMode) {
    store.updateUser(data.value)
  } else {
    data.value.id = CreateId()
    store.addUser(data.value)
  }

  isSubmitting.value = false
  setTimeout(toRouterUsers, 1000)
}
</script>

<template>
  <div class="bg-card-bg p-fluid-section rounded-2xl shadow-modern border border-[#e2e8f0]">
    <h2 class="text-title text-center text-2xl font-bold mb-8">
      {{ isEditMode ? 'Edit User' : 'Add New User' }}
    </h2>

    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div class="flex flex-col gap-1.5">
        <label for="user-name" class="form-label">User Name:</label>
        <input
          id="user-name"
          type="text"
          placeholder="Ahmed sayed"
          v-model="data.username"
          :class="[error.username ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="name" class="form-label">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Ahmed777"
          v-model="data.name"
          :class="[error.name ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="email" class="form-label">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          v-model="data.email"
          :class="[error.email ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="phone" class="form-label">Phone:</label>
        <input
          id="phone"
          type="tel"
          placeholder="01012345678"
          v-model="data.phone"
          :class="[error.phone ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="website" class="form-label">Website:</label>
        <input
          id="website"
          placeholder="://example.com"
          v-model="data.website"
          :class="[error.website ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="companyName" class="form-label">Company Name:</label>
        <input
          id="companyName"
          type="text"
          placeholder="Cairo Tech"
          v-model="data.company.name"
          :class="[error.company.name ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="catchPhrase" class="form-label">Company Catch Phrase:</label>
        <input
          id="catchPhrase"
          type="text"
          placeholder="Multi-layered client-server"
          v-model="data.company.catchPhrase"
          :class="[
            error.company.catchPhrase ? 'border-red-500 focus:ring-red-100' : '',
            'form-input',
          ]"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="city" class="form-label">City:</label>
        <input
          id="city"
          type="text"
          placeholder="Cairo"
          v-model="data.address.city"
          :class="[error.address.city ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="street" class="form-label">Street:</label>
        <input
          id="street"
          type="text"
          placeholder="Kulas Light"
          v-model="data.address.street"
          :class="[error.address.street ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="suite" class="form-label">Suite:</label>
        <input
          id="suite"
          type="text"
          placeholder="Apt. 556"
          v-model="data.address.suite"
          :class="[error.address.suite ? 'border-red-500 focus:ring-red-100' : '', 'form-input']"
        />
      </div>

      <div class="lg:col-span-4 sm:col-span-2 flex justify-end gap-4 mt-4">
        <router-link to="/users" class="btn-secondary flex items-center justify-center">
          Cancel
        </router-link>

        <button type="submit" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </form>
  </div>
</template>
