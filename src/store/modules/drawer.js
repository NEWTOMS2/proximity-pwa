const state = {
  sidebar: {
    drawer: null
  }
}

const mutations = {
  SHOW_DRAWER (state) {
    console.log(`current: ${state.sidebar.drawer}`)
    state.sidebar.drawer = !state.sidebar.drawer
    console.log(`new: ${state.sidebar.drawer}`)
  }
}

const actions = {
  toggleDrawer ({ commit }) {
    commit('SHOW_DRAWER')
  }
}

export default {
  state,
  mutations,
  actions
}
