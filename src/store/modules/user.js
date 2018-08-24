const state = {
  info: {
    id: '',
    name: '',
    password: ''
  },
  isLogged: {
    context: false,
    sideComponent: 'LayoutSideBarAccess',
    mainComponent: 'LayoutContentCarousel'
  }
}

const mutations = {
  SAVE_USER_DATA (state, data) {
    state.info = Object.assign({}, data)
  },
  REMOVE_USER_DATA (state) {
    state.info = {}
  },
  USER_LOGGED (state) {
    if (state.isLogged.context) {
      state.isLogged.context = !state.isLogged.context
      state.isLogged.sideComponent = 'LayoutSideBarAccess'
      state.isLogged.mainComponent = 'LayoutContentCarousel'
    } else {
      state.isLogged.context = !state.isLogged.context
      state.isLogged.sideComponent = 'LayoutSideBarNavigation'
      state.isLogged.mainComponent = 'LayoutContentMain'
    }
  }
}

const actions = {
  userLogIn ({ commit }, data) {
    console.log(data)
    commit('SAVE_USER_DATA', data)
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
