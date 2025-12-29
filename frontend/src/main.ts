import './assets/main.css'

import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createClient } from 'graphql-ws'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: 'http://localhost:3200/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3200/graphql',
    lazy: true,
    connectionParams: () => {
      const token = localStorage.getItem('accessToken')
      return {
        authorization: token ? `Bearer ${token}` : '',
      }
    },
  }),
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('accessToken')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  concat(authMiddleware, httpLink),
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

const app = createApp(App)

app.use(router)
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
