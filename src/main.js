import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
/* 导入css */
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
/* 导入js */
import {
  dateFormat,
  formatTimer
} from './assets/js/dateFormat.js'
/* 导入网络请求的axios */
import axios from 'axios'
/* 配置请求的根路径 */
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
/* 拦截器 */
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 返回配置
    return config
    // 第二个函数是错误处理函数
  },
  function (err) {
    console.log(err)
  }
)
/* 可用的方式一 */
// 格式化时间
Vue.filter('dateFormat', dateFormat)
Vue.filter('formatTimer', formatTimer)
// 可用的方式二
// Vue.filter('dateFormat', function (date1, fmt) {
//   let ret = ''
//   // let date = new Date(date1 * 1000);
//   let opt = {
//     "Y+": date.getFullYear().toString(), // 年
//     "m+": (date.getMonth() + 1).toString(), // 月
//     "d+": date.getDate().toString(), // 日
//     "H+": date.getHours().toString(), // 时
//     "M+": date.getMinutes().toString(), // 分
//     "S+": date.getSeconds().toString() // 秒
//     // 有其他格式化字符需求可以继续添加，必须转化成字符串
//   }
//   for (let k in opt) {
//     ret = new RegExp("(" + k + ")").exec(fmt);
//     if (ret) {
//       fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
//     };
//   }
//   return fmt;
// })

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
