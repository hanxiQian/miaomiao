import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'



import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH',(url , arg )=>{
  return url.replace(/w\.h/,arg);
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

//全局组件
import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
  //render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
}).$mount('#app')
//$mount手动挂载属性
