import Vue from 'vue'
import VueRouter from 'vue-router'


// import Login from '../components/Login.vue'
const Login = () =>
  import( /* webpackChunkName:"login_home_welceom" */ '../components/Login.vue')
// import Home from '../components/Home.vue'
const Home = () =>
  import( /* webpackChunkName:"login_home_welceom" */ '../components/Home.vue')
// import Welcome from '../components/Welcome.vue'
const Welcome = () =>
  import( /* webpackChunkName:"login_home_welceom" */ '../components/Welcome.vue')

// import Users from '../components/users/Users.vue'
const Users = () =>
  import( /* webpackChunkName:"users_roles" */ '../components/users/Users.vue')
// import Rights from '../components/power/Rights.vue'
const Rights = () =>
  import( /* webpackChunkName:"users_roles" */ '../components/power/Rights.vue')
// import Roles from '../components/power/Roles.vue'
const Roles = () =>
  import( /* webpackChunkName:"users_roles" */ '../components/power/Roles.vue')

// import Dialog from '../components/test/dialogFrom.vue'
const Dialog = () =>
  import( /* webpackChunkName:"test" */ '../components/test/dialogFrom.vue')
// import PowerM from '../components/power/powerM.vue'
const PowerM = () =>
  import( /* webpackChunkName:"test" */ '../components/power/powerM.vue')

// import Cate from '../components/goods/Cate.vue'
const Cate = () =>
  import( /* webpackChunkName:"cate_params" */ '../components/goods/Cate.vue')
// import Params from '../components/goods/Params.vue'
const Params = () =>
  import( /* webpackChunkName:"cate_params" */ '../components/goods/Params.vue')

// import List from '../components/goods/List.vue'
const List = () =>
  import( /* webpackChunkName:"list_add" */ '../components/goods/List.vue')
// import Add from '../components/goods/Add.vue'
const Add = () =>
  import( /* webpackChunkName:"list_add" */ '../components/goods/Add.vue')

// import Order from '../components/order/Order.vue'
const Order = () =>
  import( /* webpackChunkName:"order_report" */ '../components/order/Order.vue')
// import Report from '../components/report/Report.vue'
const Report = () =>
  import( /* webpackChunkName:"Ooder"_report */ '../components/report/Report.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    redirect: '/welcome'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/dialog',
        component: Dialog
      },
      // {
      //   path: '/reports',
      //   component: PowerM
      // },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: List
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

/* 路由守卫 */
//  to 将要访问的路径
//  from 代表从哪个路径过来的
//  next() 放行 next('/login') 强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
