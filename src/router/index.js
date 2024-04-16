import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Swal from 'sweetalert2'


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isAuthenticated()) {
        next()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sesi anda telah habis!",
         
        });
        next('/login')
      }
    } else {
      next()
    }
  })

  function isAuthenticated() {
    const token = sessionStorage.getItem('token')
    return !!token
  }
  

  return Router
})
