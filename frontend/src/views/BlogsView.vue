<script setup lang="ts">
import { useDate } from '@/composables/useDate'
import { useReadTime } from '@/composables/useReadTime'
import type { Blog } from '@/models'
import { gql } from '@apollo/client/core'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { longFormat } = useDate()
const { readTimeInMinutes } = useReadTime()

const BLOGS = gql`
  query Blogs {
    blogs {
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
const router = useRouter()
const blogs = ref<[Blog]>()
const { onResult: onBlogsResult, onError: onBlogsError } = useQuery(BLOGS)
onBlogsResult((res) => {
  if (!res.loading) {
    blogs.value = res.data?.blogs
  }
})
onBlogsError(() => router.push('/auth/login'))
</script>
<template>
  <div class="p-8 pt-4 w-full">
    <div class="col-span-1 lg:col-span-2 flex flex-col gap-8">
      <!-- All Blogs Section -->
      <div class="flex flex-col gap-4">
        <div
          class="w-full h-20 flex flex-col items-center justify-center gap-2 text-black text-3xl"
        >
          <div style="font-weight: 700">Blogs & Articles</div>
          <div class="text-neutral-700" style="font-size: 13px">Where posts travel instantly.</div>
        </div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <li class="flex flex-col gap-2" v-for="blog in blogs" v-bind:key="blog.id">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span
                  class="border border-black pl-1 pr-2 h-6 flex items-center justify-start gap-1 rounded-full"
                  style="font-size: x-small; font-weight: 600"
                >
                  <span
                    class="h-4 w-4 border bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center"
                    style="font-size: xx-small; font-weight: 700"
                  >
                    {{ blog.author.name[0] }}
                  </span>
                  {{ blog.author.name }}
                </span>
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
              <div class="text-base line-clamp-1" style="font-weight: 700">
                {{ blog.title }}
              </div>
              <div class="text-neutral-700 text-xs line-clamp-3">
                {{ blog.content }}
              </div>
              <RouterLink :to="{ name: 'blog-selected', params: { id: blog.id } }">
                <div
                  class="pt-2 text-xs text-neutral-800 hover:text-yellow-700 cursor-pointer"
                  style="font-weight: 600"
                >
                  Read More
                </div>
              </RouterLink>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/71dbO5GHjhS._AC_UF894,1000_QL80_.jpg"
              alt="blog image"
              class="h-50 min-w-50 w-full object-cover rounded-2xl bg-neutral-300"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
