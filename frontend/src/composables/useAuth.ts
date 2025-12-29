// src/composables/useAuth.ts
import type { Author } from '@/models'
import { gql } from '@apollo/client/core'
import { useMutation } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

const author = ref<Author | null>(null)
const token = ref<string | null>(null)
const isLoading = ref(false)

const REGISTER = gql`
  mutation Register($input: AuthInput!) {
    register(input: $input) {
      accessToken
      author {
        id
        email
      }
    }
  }
`

const LOGIN = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      accessToken
      author {
        id
        email
      }
    }
  }
`

function setUser(authorVal: Author, accessToken: string) {
  if (!authorVal || !accessToken) return
  author.value = authorVal
  token.value = accessToken
  localStorage.setItem('author', JSON.stringify(author.value))
  localStorage.setItem('accessToken', accessToken)
}

export function useAuth() {
  const isAuthenticated = computed(() => !!author.value)
  const { mutate: registerMutation } = useMutation(REGISTER)
  const { mutate: loginMutation } = useMutation(LOGIN)

  const storedUser = localStorage.getItem('author')
  if (storedUser) {
    author.value = JSON.parse(storedUser)
  }

  const storedToken = localStorage.getItem('accessToken')
  if (storedToken) {
    token.value = storedToken
  }

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
        ?.data
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
