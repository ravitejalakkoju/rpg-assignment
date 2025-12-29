<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { isLoading, login } = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const errored = ref(false)

async function onSubmit() {
  try {
    await login(form.value.email, form.value.password)
    router.push('/')
    errored.value = false
  } catch {
    errored.value = true
  }
}
</script>
<template>
  <section class="min-w-120 px-4 py-10">
    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div class="flex flex-col gap-1 mb-6">
        <p
          class="text-xs font-semibold uppercase tracking-widest text-slate-500"
          style="font-size: x-small"
        >
          Welcome back
        </p>
        <h1 class="text-xl font-semibold text-slate-900">Sign in to your author account</h1>
        <p class="text-xs text-slate-600">Share new stories and keep your readers updated.</p>
      </div>

      <div
        v-if="errored"
        class="text-red-500 bg-red-100 border border-red-500 p-2 text-xs rounded-md my-2"
      >
        Something went wrong
      </div>

      <form class="flex flex-col gap-2 space-y-2" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <label for="login-email" class="text-xs font-semibold text-slate-600">Email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@ripple.blog"
            v-model="form.email"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div class="space-y-1">
          <label for="login-password" class="text-xs font-semibold text-slate-600">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="********"
            v-model="form.password"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <!-- <div
          class="flex items-center justify-between text-xs text-slate-500"
          style="margin-top: 0.5rem !important"
        >
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
            Remember me
          </label>
          <a class="font-semibold text-slate-700 hover:text-slate-900" href="#">Forgot password?</a>
        </div> -->

        <button
          type="submit"
          class="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          v-bind:disabled="isLoading"
        >
          Sign in
        </button>
      </form>

      <div class="mt-2 text-center text-xs text-slate-500">
        New here?
        <RouterLink class="font-semibold text-slate-700 hover:text-slate-900" to="/auth/register">
          Create an account
        </RouterLink>
      </div>
    </div>
  </section>
</template>
