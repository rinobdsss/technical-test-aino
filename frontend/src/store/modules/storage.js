import { instance as axios } from 'src/boot/axios'
import { Cookies } from 'quasar'

const actions = {
  set (context, payload) {
    context.commit('set', [payload[0], payload[1]])
  },
  async verifyAuth (context, payload) {
    const token = Cookies.get('token')
    context.commit('set', ['token', token])

    if (token) {
      await axios
        .get('api/v1/member/profile', {
          Authorization: 'Bearer ' + token
        })
        .then((response) => {
          if (response) {
            // update status auth to state
            context.commit('set', ['isAuthenticated', true])
            context.commit('set', ['Account', response.data])
          }
        })
        .catch((err) => {
          console.log('verify error >', err)
          context.commit('set', ['isAuthenticated', false])
        })
    } else {
      context.commit('storage/set', ['isAuthenticated', false], {
        root: true
      })
    }
  }
}
const getters = {}
const mutations = {
  set (state, payload) {
    const key = payload[0]
    const newState = payload[1]
    state[key] = newState
  }
}
const state = {
  isAuthenticated: false,
  Account: null
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
