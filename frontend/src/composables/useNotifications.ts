import { BLOG_CREATED_SUBSCRIPTION } from '@/gql'
import type { Blog } from '@/models'
import { handleAuthError } from '@/utils/handleAuthError.utils'
import { useSubscription } from '@vue/apollo-composable'
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const notifications = ref<Blog[]>([])

export function useNotifications() {
  const router = useRouter()
  const { onResult, onError, stop } = useSubscription(BLOG_CREATED_SUBSCRIPTION)

  onResult((res) => {
    if (res.data?.blogCreated) {
      notifications.value.unshift(res.data.blogCreated)
    }
  })

  onError(
    handleAuthError({
      onUnauthenticated: () => router.push('/auth/login'),
    }),
  )

  onUnmounted(() => {
    stop()
  })

  return {
    notifications,
  }
}
