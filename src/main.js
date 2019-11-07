import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'



import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH',(url , arg )=>{
  return url.replace(/w\.h/,arg);
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
  //render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
}).$mount('#app')
//$mount手动挂载属性
