import { createRouter, createWebHashHistory } from 'vue-router'
import { useIdentityStore } from './stores/identityStore'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    auth?: true
  }
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('./views/RegisterView.vue')
    },
    {
      path: '/users',
      component: () => import('./views/UsersView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      component: () => import('./views/HomeView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeResolve((to, _, next) => {
  const authStore = useIdentityStore()

  if (to.meta.auth && !authStore.isAuthenticated) {
    console.info('🔒 Not authenticated !')

    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  next()
})
