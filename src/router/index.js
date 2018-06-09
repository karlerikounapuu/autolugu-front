import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Logout from '@/components/Logout'
import CreateCar from '@/components/CreateCar'
import Car from '@/components/Car'
import CarOverview from '@/components/CarOverview'
import Profile from '@/components/Profile'
import PageNotFound from '@/components/PageNotFound'

import AdminDashboard from '@/components/admin/Dashboard'
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
    {
      path: '/car/overview/:id',
      name: 'CarOverview',
      component: CarOverview
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/superman',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
