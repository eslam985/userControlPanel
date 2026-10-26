import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faEye,
  faTrash,
  faAnglesLeft,
  faAnglesRight,
  faPenToSquare,
  faUsersSlash,
  faSpinner,
  faIdCard,
  faEnvelope,
  faBriefcase,
  faTriangleExclamation,
  faArrowLeft,
  faCircleExclamation,
  faUser,
  faLock,
  faHouse,
  faUsers,
  faPlus,
  faUserPlus,
  faMagnifyingGlass,
  faRightFromBracket,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faEye,
  faTrash,
  faAnglesLeft,
  faAnglesRight,
  faPenToSquare,
  faUsersSlash,
  faSpinner,
  faIdCard,
  faEnvelope,
  faBriefcase,
  faTriangleExclamation,
  faArrowLeft,
  faCircleExclamation,
  faUser,
  faLock,
  faHouse,
  faUsers,
  faPlus,
  faUserPlus,
  faMagnifyingGlass,
  faRightFromBracket,
  faBars,
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
