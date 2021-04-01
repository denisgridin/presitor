import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { FIELD, PATH } from '~/utils/constants'
import { Api } from '~/api'
const jwt = require('jsonwebtoken')

interface IUser {
  email: string,
  userId: string,
  user_id: string,
  password?: string
}

export interface IUserState {
  user: IUser
}

export interface IUserTokens {
  accessToken: string,
  refreshToken: string
}

@Module({ name: 'user', dynamic: true, store: store() })
class User extends VuexModule implements IUserState {
  public user = {} as IUser

  get getUser (): IUser {
    return this.user
  }

  @Mutation
  public SET_USER (user: IUser) {
    console.log('set user: ' + user)
    this.user = user
  }

  @Action
  public parseUser (token: string): void {
    const user = jwt.decode(token) as IUser
    this.SET_USER(user)
    localStorage.setItem(FIELD.USER, JSON.stringify(user))
  }

  @Action
  private setTokens (tokens: IUserTokens): void {
    localStorage.setItem(FIELD.ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(FIELD.REFRESH_TOKEN, tokens.refreshToken)
  }

  @Action({ rawError: true })
  public registerUser (user: IUser) {
    const api = new Api()
    return api.post(PATH.user.registration, user)
  }

  @Action
  public async loginUser (user: IUser) {
    try {
      const api = new Api()
      const response = await api.post(PATH.user.login, user)
      const tokens = response.data as IUserTokens
      this.setTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      })
      this.parseUser(tokens.accessToken)
    } catch (error) {
      console.log(error)
    }
  }
}

export const UserModule = getModule(User)
