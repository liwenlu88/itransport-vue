import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/dashboard',
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/users/UsersView.vue'),
        },
      ],
    },
  ],
})

export default router
