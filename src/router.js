import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/product/create',
      name: 'create',      
      component: () => import(/* webpackChunkName: "about" */ './pages/CreateProduct')
    },
    {
      path: '/admin/distributor/create',
      name: 'create',      
      component: () => import(/* webpackChunkName: "about" */ './pages/CreateDistributor')
    }
  ]
})
