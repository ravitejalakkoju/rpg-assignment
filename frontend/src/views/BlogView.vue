<script setup lang="ts">
import { useDate } from '@/composables/useDate'
import { useReadTime } from '@/composables/useReadTime'
import type { Blog } from '@/models'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ArrowLeft } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { longFormat } = useDate()
const { readTimeInMinutes } = useReadTime()

const blog = ref<Blog>()

const BLOG = gql`
  query Blog($id: Int!) {
    blog(id: $id) {
      id
      title
      content
      createdAt
      author {
        name
        email
      }
    }
  }
`

const blogId = computed(() => Number(route.params.id))

const { onResult, onError } = useQuery(
  BLOG,
  () => ({ id: blogId.value }), // ✅ reactive variables
  { fetchPolicy: 'cache-and-network' }, // optional
)

onResult((res) => {
  if (!res.loading) {
    blog.value = res.data?.blog ?? null
  }
})

onError((err) => {
  const gqlCode = err?.graphQLErrors?.[0]?.extensions?.code

  if (gqlCode === 'UNAUTHENTICATED') {
    router.push('/auth/login')
    return
  }

  console.error(err)
})
</script>
<template>
  <div class="mx-auto max-w-3/4 p-12 flex flex-col gap-2" v-if="blog" v-bind:key="blog.id">
    <RouterLink to="/blogs">
      <button
        type="button"
        class="mb-3 rounded-full h-8 flex items-center justify-center gap-0.5 bg-neutral-100 border border-neutral-500 p-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200 active:bg-neutral-300"
      >
        <ArrowLeft class="w-4.5 h-4.5" />
        Back
      </button>
    </RouterLink>
    <div class="flex items-center gap-12">
      <img
        src="https://m.media-amazon.com/images/I/71dbO5GHjhS._AC_UF894,1000_QL80_.jpg"
        alt="blog image"
        class="w-100 h-72 object-cover rounded-2xl bg-neutral-300"
      />
      <div class="pt-4 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <span
            class="px-2 h-6 flex items-center justify-center border rounded-full"
            style="font-size: x-small; font-weight: 600"
            >{{ longFormat(blog.createdAt) }}</span
          >
          <span
            class="px-2 h-6 flex items-center justify-center border rounded-full"
            style="font-size: x-small; font-weight: 600"
            >{{ readTimeInMinutes(blog.content) }} min read</span
          >
        </div>
        <div class="text-4xl" style="font-weight: 700">
          {{ blog.title }}
        </div>
        <div class="text-neutral-500 text-xs italic">
          ~ by {{ blog.author.name }} ({{ blog.author.email }})
        </div>
      </div>
    </div>
    <div class="py-16 text-neutral-700 line-clamp-3">
      {{ blog.content }}
    </div>
  </div>
</template>
