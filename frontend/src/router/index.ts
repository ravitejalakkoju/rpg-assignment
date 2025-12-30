import { createRouter, createWebHistory } from 'vue-router'
import BlogsView from '../views/BlogsView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogsView,
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/BlogsView.vue'),
    },
    {
      path: '/blogs/new',
      name: 'blog-new',
      component: () => import('../components/BlogEditor.vue'),
    },
    {
      path: '/blogs/:id',
      name: 'blog-selected',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      redirect: '/auth/login',
      beforeEnter: () => {
        const { isAuthenticated } = useAuth()
        if (isAuthenticated.value) {
          return { path: '/blogs' }
        }
        return true
      },
      children: [
        {
          path: 'login',
          name: 'auth-login',
          component: () => import('../components/LoginAuthor.vue'),
        },
        {
          path: 'register',
          name: 'auth-register',
          component: () => import('../components/RegisterAuthor.vue'),
        },
      ],
    },
  ],
})

export default router
