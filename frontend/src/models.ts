export type Author = {
  id: string
  name: string
  email: string
}

export type Blog = {
  id: string
  title: string
  content: string
  createdAt: string
  author: Author
}
