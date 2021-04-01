import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { FIELD, PATH } from '~/utils/constants'
import { Api } from '~/api'
const jwt = require('jsonwebtoken')

export interface IUser {
  email: string,
  userId: string,
  user_id: string,
  password?: string
}

export interface IUserState {
  user: IUser,
  isAuthenticated: boolean
}

export interface IUserTokens {
  accessToken: string,
  refreshToken: string
}

@Module({ name: 'user', dynamic: true, store: store(), stateFactory: true })
export class User extends VuexModule implements IUserState {
  public user = {} as IUser
  public isAuthenticated: boolean = false

  get getUser (): IUser {
    return this.user
  }

  get getAuthenticationState (): boolean {
    return this.isAuthenticated
  }

  @Mutation
  public SET_USER (user: IUser) {
    this.user = user
  }

  @Mutation
  public SET_AUTHENTICATED (flag: boolean) {
    this.isAuthenticated = flag
  }

  @Mutation
  public SET_USER_FROM_LOCAL_STORAGE (): void {
    const userString: string = localStorage.getItem(FIELD.USER) || ''
    if (userString) {
      const user: IUser = JSON.parse(userString)
      if (user.email) {
        this.user = { email: user.email, userId: user.user_id } as IUser
        this.isAuthenticated = true
      }
    }
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
      this.SET_AUTHENTICATED(true)
    } catch (error) {
      console.log(error)
    }
  }

  @Action
  public async logoutUser () {
    try {
      const api = new Api()
      await api.delete(`${PATH.user.token}?token=${localStorage.getItem(FIELD.REFRESH_TOKEN)}`)

      localStorage.removeItem(FIELD.USER)
      localStorage.removeItem(FIELD.ACCESS_TOKEN)
      localStorage.removeItem(FIELD.REFRESH_TOKEN)

      this.SET_AUTHENTICATED(false)
      this.SET_USER({ email: null, userId: null })
    } catch (error) {
      console.log(error)
    }
  }
}

export const UserModule = getModule(User)
