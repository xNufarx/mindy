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
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/',
      component: () => import('./views/UsersList.vue'),
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
