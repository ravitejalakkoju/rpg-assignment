<script setup lang="ts">
import { BLOGS, CREATE_BLOG } from '@/gql'
import { handleAuthError } from '@/utils/handleAuthError.utils'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  title: '',
  content: '',
})

const { mutate: publishBlog, onDone, onError } = useMutation(CREATE_BLOG)
onDone(() => {
  router.push('/blogs')
})
onError(
  handleAuthError({
    onUnauthenticated: () => router.push('/auth/login'),
  }),
)

function onSubmit() {
  if (!form.value.title || !form.value.content) return
  publishBlog(
    { input: form.value },
    {
      refetchQueries: [{ query: BLOGS }],
      awaitRefetchQueries: true,
    },
  )
}
</script>

<template>
  <section class="min-h-120 px-4 py-10">
    <div class="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <header class="mb-6 flex flex-col gap-1">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Draft</p>
        <h1 class="text-xl font-semibold text-slate-900">Write a new blog post</h1>
        <p class="text-xs text-slate-600">Add a title and share your story.</p>
      </header>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <label for="blog-title" class="text-xs font-semibold text-slate-600">Title</label>
          <input
            id="blog-title"
            v-model="form.title"
            type="text"
            name="title"
            placeholder="The art of building worlds"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div class="space-y-1">
          <label for="blog-content" class="text-xs font-semibold text-slate-600">Content</label>
          <textarea
            id="blog-content"
            v-model="form.content"
            name="content"
            rows="12"
            placeholder="Start writing here..."
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          ></textarea>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2">
          <RouterLink to="/blogs">
            <button
              type="button"
              class="h-8 p-2 flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50"
            >
              Cancel
            </button>
          </RouterLink>
          <button
            type="submit"
            class="h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400 border px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-500 active:bg-yellow-600"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
