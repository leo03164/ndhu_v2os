import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/product/create',
      name: 'AddProduct',      
      component: () => import(/* webpackChunkName: "about" */ './page-components/AddProduct')
    },
    {
      path: '/admin/distributor/create',
      name: 'AddDistributor',      
      component: () => import(/* webpackChunkName: "about" */ './page-components/AddDistributor')
    },
    {
      path: '/admin/manager/create',
      name: 'AddManager',      
      component: () => import(/* webpackChunkName: "about" */ './page-components/AddManager')
    },
    {
      path: '/admin/product/sell',
      name: 'sell',      
      component: () => import(/* webpackChunkName: "about" */ './page-components/Sell')
    }
  ]
})
