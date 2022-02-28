import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import('@/views/login/Login.vue')
const User = () => import('@/views/user/User.vue')
const Bill = () => import('@/views/bill/Bill.vue')
const Count = () => import('@/views/count/Count.vue')
const BillItem = () => import('@/views/bill/BillItem.vue')
const updateAvatar = () => import('@/views/user/UpdateAvatar.vue')
const updatePassword = () => import('@/views/user/UpdatePassword.vue')

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/bill',
    component: Bill,
  },
  {
    path: '/count',
    component: Count,
  },
  {
    path: '/billItem',
    component: BillItem,
  },
  {
    path: '/update-avatar',
    component: updateAvatar,
  },
  {
    path: '/update-password',
    component: updatePassword,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
