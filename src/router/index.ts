import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'
import Question from "../components/Question.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
  redirect:"/Login"
},
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path:'/Main',
    name:'Main',
    component:Main
  },
  {
    path:'/Question',
    name:'Question',
    component:Question
  }
  // ,{
  // path:'/Test',
  //   name:'Test',
  //   component:Test
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
