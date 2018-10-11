import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/access']

NProgress.configure({
  showSpinner: false
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() || getToken() !== undefined) {
    store.dispatch('fetchLoggedUser').then(() => {
      next({replace: true})
      NProgress.done()
    })
    if (to.path === '/') {
      next('/app')
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      if (to.meta.requiredAuth === false) {
        next()
        NProgress.done()
      } else {
        store.dispatch('removeUserData')
        if (to.path === '/') {
          next('/access')
        } else {
          next('/access')
        }
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
