import gql from 'graphql-tag'

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(createBlogInput: $input) {
      id
      content
      createdAt
      author {
        name
      }
    }
  }
`
export const BLOGS = gql`
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

export const BLOG = gql`
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
