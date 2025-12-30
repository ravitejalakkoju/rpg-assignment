// src/composables/useAuth.ts
import { LOGIN, REGISTER } from '@/gql'
import type { Author } from '@/models'
import { useMutation } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

const author = ref<Author | null>(null)
const token = ref<string | null>(null)
const isLoading = ref(false)
const ready = ref(false)

function init() {
  if (ready.value) return
  const storedUser = localStorage.getItem('author')
  const storedToken = localStorage.getItem('accessToken')
  author.value = storedUser ? JSON.parse(storedUser) : null
  token.value = storedToken ?? null
  ready.value = true
}

function setUser(authorVal: Author, accessToken: string) {
  if (!authorVal || !accessToken) return
  author.value = authorVal
  token.value = accessToken
  localStorage.setItem('author', JSON.stringify(author.value))
  localStorage.setItem('accessToken', accessToken)
}

export function useAuth() {
  const { mutate: registerMutation } = useMutation(REGISTER)
  const { mutate: loginMutation } = useMutation(LOGIN)

  init()

  const isAuthenticated = computed(() => !!author.value)

  async function login(email: string, password: string) {
    isLoading.value = true

    try {
      const { author, accessToken } = (await loginMutation({ input: { email, password } }))?.data
        ?.login
      setUser(author, accessToken)
    } finally {
      isLoading.value = false
    }
  }

  async function register(name: string, email: string, password: string) {
    isLoading.value = true

    try {
      // mock API (replace later)
      const { author, accessToken } = (await registerMutation({ input: { name, email, password } }))
        ?.data?.register
      setUser(author, accessToken)
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    author.value = null
    token.value = null
    localStorage.removeItem('author')
    localStorage.removeItem('accessToken')
  }

  return {
    author,
    token,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
  }
}
