import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/product/create',
      name: 'CreateProduct',      
      component: () => import(/* webpackChunkName: "about" */ './pages/CreateProduct')
    },
    {
      path: '/admin/distributor/create',
      name: 'CreateDistributor',      
      component: () => import(/* webpackChunkName: "about" */ './pages/CreateDistributor')
    },
    {
      path: '/admin/manager/create',
      name: 'AddManager',      
      component: () => import(/* webpackChunkName: "about" */ './pages/AddManager')
    }
  ]
})
