import Vue from 'vue'
import Vuex from 'vuex'
import { IUser, IUserState } from './user'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}

const actions = {
  nuxtServerInit ({ getters }: any) {
    console.log(getters)
  }
}

const createStore = () => {
  return new Vuex.Store<IRootState>({ actions })
}

export default createStore
