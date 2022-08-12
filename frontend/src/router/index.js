import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    // cek auth ke server
    await store.dispatch('storage/verifyAuth')

    // cek auth di storage state
    const isAuthenticated = store.state.storage.isAuthenticated
    // const isAuthenticated = Cookies.get('token')

    // jika route nya membutuhkan auth
    if (to.meta && to.meta.auth) {
      // cek apakah sudah login
      if (!isAuthenticated) {
        // jika belum login, usir ke signin page
        Router.replace({ name: 'Login' })
      }
    } else if (to.meta && to.meta.guest) {
      // jika route nya guest, route ini tidak boleh di akses jika dia sudah login
      if (isAuthenticated) {
        // jika sudah login, usir ke dashboard page bagi member
        Router.replace({ name: 'Home' })
      }
    }

    next()
  })

  return Router
})
