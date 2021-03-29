import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Secure from '../views/Secure.vue'
import Register from '../components/Register.vue'
import User from '../views/User.vue'
import addPost from '../views/AddPost.vue'
import updatePost from '../views/UpdatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/add-post',
    name: 'addPost',
    component: addPost
  },
  {
    path: '/update-post',
    name: 'updatePost',
    component: updatePost
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
