import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Logout from '@/components/Logout'
import CreateCar from '@/components/CreateCar'
import Car from '@/components/Car'
import PageNotFound from '@/components/PageNotFound'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/car/new',
      name: 'CreateCar',
      component: CreateCar
    },
    {
      path: '/car/:id',
      name: 'Car',
      component: Car
    },
    { path: "*", component: PageNotFound }
  ]
})
