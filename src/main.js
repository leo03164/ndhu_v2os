import Vue from 'vue'
import App from './App.vue'
import router from './router'
import viewUi from 'view-design'
import contract from './contract'
import store from './store'

import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.prototype.$contract = contract;
Vue.use(viewUi)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
