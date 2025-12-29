import type { Blog } from '@/models'
import { gql } from '@apollo/client/core'
import { useSubscription } from '@vue/apollo-composable'
import { ref } from 'vue'

export const BLOG_CREATED_SUBSCRIPTION = gql`
  subscription BlogCreated {
    blogCreated {
      id
      title
      content
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`

const notifications = ref<Blog[]>([])

export function useNotifications() {
  const { onResult, onError } = useSubscription(BLOG_CREATED_SUBSCRIPTION)

  onResult((res) => {
    if (res.data?.blogCreated) {
      notifications.value.unshift(res.data.blogCreated)
    }
  })

  onError((err) => {
    console.error('Subscription error:', err)
  })

  return {
    notifications,
  }
}
