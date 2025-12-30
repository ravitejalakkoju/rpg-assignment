import gql from 'graphql-tag'

export const REGISTER = gql`
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

export const LOGIN = gql`
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
