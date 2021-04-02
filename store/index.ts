import Vue from 'vue'
import Vuex from 'vuex'
import { IUser, IUserState } from './user'
import { FIELD } from '~/utils/constants'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}

const actions = {
  nuxtServerInit ({ getters }: any, { $cookies }: any) {
    console.log($cookies.get(FIELD.ACCESS_TOKEN))
  }
}

const createStore = () => {
  return new Vuex.Store<IRootState>({ actions })
}

export default createStore
