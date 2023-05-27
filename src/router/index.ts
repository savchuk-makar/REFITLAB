import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/index.vue'
import company from '@/views/company.vue'
import portfolio from '@/views/portfolio.vue'
import services from '@/views/services.vue'
import contacts from '@/views/contacts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/company',
      name: 'company',
      component: company
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: portfolio
    },
    {
      path: '/services',
      name: 'services',
      component: services
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: contacts
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
