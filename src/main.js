import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
/* 导入css */
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
/* 导入网络请求的axios */
import axios from 'axios'
/* 配置请求的根路径 */
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
/* 拦截器 */
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 返回配置
    return config
    // 第二个函数是错误处理函数
  },
  function(err) {
    console.log(err)
  }
)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
