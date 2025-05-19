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
    path: '/shoppingCard',
    name: 'shoppingCard',
    component: () => import('../components/ShoppingCard/ShoppingCard.vue')
  }, {
    path: '/user',
    name: 'user',
    component: () => import('../components/User/User.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router