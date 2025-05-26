import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: () => import('../components/Index/Index.vue')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../components/Book/Book.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../components/Message/Message.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/User/User.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/User/Login.vue')
  },
  {
    path: '/bookdetails/:bookId',
    name: 'bookdetails',
    component: () => import('../components/BookDetails/BookDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router