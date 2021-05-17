import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './user'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}

const actions = {
  async nuxtServerInit ({ getters }: any, { $cookies, redirect, $auth, route }: any) {
    try {
      console.log('server init')
      console.log('get cookie user')
      console.log('update token')
      console.log(route)
      // if (route.fullPath.inludes('constructor')) {
      //   await $auth('refresh', $cookies, () => { redirect('/login') })
      // }
    } catch (error) {
      console.log(error)
      await $auth('logout', $cookies, () => { redirect('/login') })
    }
  }
}

const instance = new Vuex.Store<IRootState>({ actions })
export default () => { return instance }
