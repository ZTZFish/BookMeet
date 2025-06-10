import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../components/Index/Index.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../components/Book/Book.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../components/Message/Message.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../components/User/User.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/User/Login.vue')
  },
  {
    path: '/bookdetails/:bookId',
    name: 'Bookdetails',
    component: () => import('../components/BookDetails/BookDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router