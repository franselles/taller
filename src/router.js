/* eslint-disable no-console */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // const urlLevel = to.matched.some(record => record.meta.level)
  // const level = store.state.login.login.level
  const isLogged = store.state.login.login.isLogged

  // console.log(requiresAuth, isLogged);


  if (!isLogged && requiresAuth) {
    next({
      path: '/login'
    })
  } else {
    next()
  }


  /*
  let urlLevel

  to.matched.some(record => urlLevel = record.meta.level)

  console.log(urlLevel)
  */


  // next()
})

export default router
