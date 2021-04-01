import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState, UserModule } from './user'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}
const createStore = () => {
  return new Vuex.Store<IRootState>({})
}

export default createStore
