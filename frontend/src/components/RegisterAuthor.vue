<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { register } = useAuth()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const passwordError = ref('')
const errored = ref(false)

async function onSubmit() {
  if (form.value.password !== form.value.confirmPassword) {
    passwordError.value = 'Passwords do not match.'
    return
  }
  passwordError.value = ''
  try {
    await register(form.value.name, form.value.email, form.value.password)
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
          Join the author community
        </p>
        <h1 class="text-xl font-semibold text-slate-900">Create your account</h1>
        <p class="text-xs text-slate-600">Start publishing and build your reader base.</p>
      </div>

      <div
        v-if="errored"
        class="text-red-500 bg-red-100 border border-red-500 p-2 text-xs rounded-md my-2"
      >
        Something went wrong
      </div>

      <form class="space-y-1" @submit.prevent="onSubmit">
        <div>
          <label for="register-name" class="text-xs font-semibold text-slate-600">Full name</label>
          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Ravi Teja"
            v-model="form.name"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div class="space-y-1">
          <label for="register-email" class="text-xs font-semibold text-slate-600">Email</label>
          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="you@ripple.blog"
            v-model="form.email"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div class="space-y-1">
          <label for="register-password" class="text-xs font-semibold text-slate-600"
            >Password</label
          >
          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="At least 8 characters"
            v-model="form.password"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div class="space-y-1">
          <label for="register-confirm" class="text-xs font-semibold text-slate-600">
            Confirm password
          </label>
          <input
            id="register-confirm"
            type="password"
            name="confirmPassword"
            placeholder="Repeat your password"
            v-model="form.confirmPassword"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <p v-if="passwordError" class="text-xs text-rose-600">{{ passwordError }}</p>
        </div>

        <!-- <label class="pt-4 pb-2 flex items-center gap-2 text-xs text-slate-600">
          <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
          I agree to the terms and privacy policy.
        </label> -->

        <button
          type="submit"
          class="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Create account
        </button>
      </form>

      <div class="mt-2 text-center text-xs text-slate-500">
        Already have an account?
        <RouterLink class="font-semibold text-slate-700 hover:text-slate-900" to="/auth/login">
          Sign in
        </RouterLink>
      </div>
    </div>
  </section>
</template>
