import { userAccess, userInfo } from '@/api/users'
import { setToken, getToken } from '@/utils/auth'
import router from '@/router'
const state = {
  info: {
    id: '',
    name: '',
    password: '',
    role: '',
    idOrganization: ''
  },
  availableRoutes: []
  /*,
  isLogged: {
    context: false,
    sideComponent: 'LayoutSideBarAccess',
    mainComponent: 'LayoutContentCarousel'
  } */
}

const mutations = {
  SAVE_USER_DATA (state, data) {
    state.info = Object.assign({}, data)
    console.log(state.info)
  },
  PERMITTED_ROUTES (state, data) {
    state.availableRoutes = data
    console.log(state.availableRoutes)
  },
  REMOVE_USER_DATA (state) {
    state.info = {}
  }
}

const actions = {
  userLogIn ({ commit }, data) {
    // data.password = hasPassword(data.password)
    userAccess(data).then((result) => {
      let routes = []
      router.options.routes.forEach((element, index) => {
        if (index > 0 && element.meta.noRender !== true) {
          if (element.meta.roles.includes(result.data.role)) {
            routes.push(element)
          }
        }
      })
      setToken(result.data.id)
      commit('SAVE_USER_DATA', result.data)
      commit('PERMITTED_ROUTES', routes)
    })
  },
  fetchLoggedUser ({ commit }) {
    userInfo(getToken()).then(result => {
      setToken(result.data.id)
      commit('SAVE_USER_DATA', result.data)
    })
  },
  logInOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('USER_LOGGED')
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
