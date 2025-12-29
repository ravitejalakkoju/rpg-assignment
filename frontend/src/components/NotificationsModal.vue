<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useDate } from '@/composables/useDate'
import type { Blog } from '@/models'
import { PartyPopper, X } from 'lucide-vue-next'
type NotificationItem = Blog

const props = defineProps<{
  open: boolean
  notifications: NotificationItem[]
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { longFormat } = useDate()
const { author } = useAuth()
</script>

<template>
  <section
    v-if="props.open"
    class="absolute right-0 translate-x-4 top-full z-50 mt-3 w-[92vw] max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
    style="margin-top: 0.5rem !important"
    role="dialog"
    aria-modal="true"
    aria-label="Notifications"
  >
    <header class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
      <div>
        <p class="text-sm font-semibold text-slate-900" style="font-weight: 600">Notifications</p>
        <p class="text-xs text-slate-500">Latest updates from your authors.</p>
      </div>
      <button
        type="button"
        class="h-8 w-8 flex items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        @click="emit('close')"
        aria-label="Close notifications"
      >
        <X class="w-4 h-4" />
      </button>
    </header>

    <div class="max-h-[60vh] overflow-y-auto">
      <ul v-if="props.notifications.length" class="divide-y divide-slate-200">
        <li
          v-for="item in props.notifications"
          :key="item.id"
          class="flex items-start gap-3 px-4 py-3"
        >
          <div class="flex items-center justify-center mt-1rounded-full">
            <PartyPopper class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-900">
              <span v-if="author?.id === item.author.id">You have</span
              ><span v-if="author?.id !== item.author.id">{{ item.author.name }} has</span>
              published a new Blog
            </p>
            <p v-if="item.title" class="mt-1 text-xs text-slate-600 line-clamp-1">
              {{ item.title }}
            </p>
            <p v-if="item.createdAt" class="mt-2 text-[11px] tracking-wide text-slate-400">
              {{ longFormat(item.createdAt) }}
            </p>
          </div>
        </li>
      </ul>
      <div v-else class="px-4 py-10 text-center text-sm text-slate-500">You're all caught up.</div>
    </div>
  </section>
</template>
