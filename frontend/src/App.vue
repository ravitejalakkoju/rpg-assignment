<script setup lang="ts">
import { BellRing, LogIn, LogOut, Plus, UserRoundPlus } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NotificationsModal from './components/NotificationsModal.vue'
import { useAuth } from './composables/useAuth'
import { useNotifications } from './composables/useNotifications'
import { useApolloClient } from '@vue/apollo-composable'

const { isAuthenticated, logout: authLogout } = useAuth()

const isNotificationsOpen = ref(false)

const { notifications } = useNotifications()

const { resolveClient } = useApolloClient()
const client = resolveClient()

const router = useRouter()
function logout() {
  authLogout()
  client.clearStore()
  router.push('/auth/login')
}
</script>

<template>
  <div class="px-12 flex items-center justify-center">
    <header
      class="bg-white border-2 border-t-0 rounded-b-xl h-14 px-4 sticky flex items-center justify-between w-full leading-6"
    >
      <RouterLink to="/">
        <div class="text-2xl text-black" style="font-family: 'Rubik Glitch'">Rippple</div>
      </RouterLink>
      <nav class="flex items-center gap-2">
        <template v-if="isAuthenticated">
          <div class="relative">
            <button
              class="h-8 w-8 flex items-center justify-center rounded-full border hover:bg-neutral-100 font-bold text-sm"
              style="font-weight: 500; box-shadow: 0 1px 0 0 black"
              @click="isNotificationsOpen = true"
            >
              <BellRing class="h-4 w-4" />
            </button>
            <NotificationsModal
              :open="isNotificationsOpen"
              :notifications="notifications"
              @close="isNotificationsOpen = false"
            />
            <div
              v-if="notifications.length"
              class="h-3.5 min-w-3.5 w-fit p-0.5 rounded-full bg-red-500 flex items-center justify-center absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-white"
              style="font-size: xx-small; font-weight: 700"
            >
              {{ notifications.length }}
            </div>
          </div>
          <RouterLink to="/blogs/new">
            <button
              class="p-3 h-8 flex items-center justify-center gap-0.5 rounded-full bg-yellow-400 border text-black hover:bg-yellow-500 active:bg-yellow-600 text-sm font-bold"
              style="font-weight: 500; box-shadow: 0 1px 0 0 black"
            >
              <Plus class="h-4 w-4" />
              New Blog
            </button>
          </RouterLink>
          <button
            class="h-8 px-3 flex items-center justify-center gap-1 rounded-full border text-red-700 hover:bg-red-100 font-bold text-sm"
            style="font-weight: 500; box-shadow: 0 1px 0 0 oklch(50.5% 0.213 27.518)"
            @click="logout"
          >
            Logout
            <LogOut class="h-4 w-4" />
          </button>
        </template>
        <template v-if="!isAuthenticated">
          <RouterLink to="/auth/login">
            <button
              class="h-8 px-3 flex items-center justify-center gap-1 rounded-full border text-yellow-700 hover:bg-red-100 font-bold text-sm"
              style="font-weight: 500; box-shadow: 0 1px 0 0 oklch(55.4% 0.135 66.442)"
            >
              <LogIn class="h-4 w-4" />
              Login
            </button>
          </RouterLink>
          <RouterLink to="/auth/register">
            <button
              class="p-3 h-8 flex items-center justify-center gap-0.5 rounded-full bg-yellow-400 border text-black hover:bg-neutral-100 text-sm font-bold"
              style="font-weight: 500; box-shadow: 0 1px 0 0 black"
            >
              <UserRoundPlus class="h-4 w-4" />
              Register
            </button>
          </RouterLink>
        </template>
      </nav>
    </header>
  </div>

  <RouterView />
</template>
