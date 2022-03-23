import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const CateGory = () => import('../views/category/CateGory')


// Vue.use(Router)

const routes = [
    {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/category',
        component:CateGory
      },
      {
        path:'/cart',
        component:Cart
      }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
