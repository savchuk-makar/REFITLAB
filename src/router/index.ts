import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import index from '@/views/index.vue'
// @ts-ignore
import company from '@/views/company.vue'
// @ts-ignore
import portfolio from '@/views/portfolio.vue'
// @ts-ignore
import services from '@/views/services.vue'
// @ts-ignore
import contacts from '@/views/contacts.vue'
// @ts-ignore
import about from "@/views/AboutView.vue";

// @ts-ignore
// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
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
      component: about
    }
  ]
})

export default router
