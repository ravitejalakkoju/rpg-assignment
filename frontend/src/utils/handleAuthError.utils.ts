import type { ApolloError } from '@apollo/client/core'

type AuthErrorHandlers = {
  onUnauthenticated?: () => void
  onOtherError?: (err: ApolloError) => void
}

function getStatusCode(err: ApolloError): number | undefined {
  const netErr = err.networkError

  if (netErr && typeof netErr === 'object' && 'statusCode' in netErr) {
    return netErr.statusCode as number
  }

  return undefined
}

export function handleAuthError(handlers: AuthErrorHandlers = {}) {
  return (err: ApolloError) => {
    const gqlCode = err.graphQLErrors?.[0]?.extensions?.code
    const status = getStatusCode(err)

    if (gqlCode === 'UNAUTHENTICATED' || status === 401) {
      handlers.onUnauthenticated?.()
      return
    }

    handlers.onOtherError?.(err)
  }
}
