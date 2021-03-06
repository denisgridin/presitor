import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { FIELD, PATH } from '~/utils/constants'
import { Api } from '~/api'
import { ITokenData } from '~/interfaces/token'
import { getCookieUser } from '~/utils/helpers'
import { errorCodes } from '~/utils/errorCodes'
const jwt = require('jsonwebtoken')

export interface IUser {
  email: string,
  userId: string,
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

@Module({ store: store(), stateFactory: true, name: 'user', dynamic: true, namespaced: true })
export class User extends VuexModule implements IUserState {
  public user = {} as IUser
  public isAuthenticated: boolean = false
  public accessToken: string = ''
  public refreshToken: string = ''

  get getUser (): IUser {
    return this.user
  }

  get getAuthenticationState (): boolean {
    return this.isAuthenticated
  }

  get getTokens (): { accessToken: string, refreshToken: string } {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }
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
  public SET_TOKENS ({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  @Action({ rawError: true })
  public async parseUser (token: string): Promise<IUser> {
    const user = await jwt.decode(token) as IUser
    this.SET_USER(user)
    return user
  }

  @Action({ rawError: true })
  public setTokens (tokens: IUserTokens): void {
    console.table(tokens)
    this.SET_TOKENS({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
  }

  @Action({ rawError: true })
  public registerUser (user: IUser) {
    return new Promise((resolve, reject) => {
      try {
        const api: Api = new Api()
        const response = api.post(PATH.user.registration, user)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public loginUser (user: IUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const api: Api = new Api()
        const response = await api.post(PATH.user.login, user)
        console.log(response)
        const tokens = response.data as IUserTokens
        if (tokens) {
          this.setTokens({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
          })
          const userData = await this.parseUser(tokens.accessToken)
          this.SET_AUTHENTICATED(true)
          resolve({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: userData
          } as ITokenData)
          this.SET_USER(userData as IUser)
        } else {
          reject(new Error(errorCodes['100']))
        }
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public getCookieUser (cookies: any) {
    console.log(cookies)
    return new Promise((resolve, reject) => {
      try {
        const isAuth = !!cookies[FIELD.IS_AUTHENTICATED]
        if (isAuth) {
          const accessToken = cookies[FIELD.ACCESS_TOKEN]
          const refreshToken = cookies[FIELD.REFRESH_TOKEN]
          this.setTokens({ accessToken, refreshToken })
          const user = getCookieUser(cookies)
          if (user) {
            this.SET_USER(user)
          }
          resolve(user)
        } else {
          console.log('Unauthorized')
          reject(new Error('Unauthorized'))
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public async logoutUser () {
    try {
      const api: Api = new Api()
      await api.delete(`${PATH.user.token}?token=${this.getTokens.refreshToken}`)

      this.SET_USER({} as IUser)
      this.SET_AUTHENTICATED(false)
    } catch (error) {
      console.log(error)
    }
  }

  @Action({ rawError: true })
  public updateToken (token: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const api: Api = new Api()
        const { data } = await api.post(PATH.user.token, { token })
        this.setTokens(data)
        const user = await this.parseUser(data.accessToken)
        resolve({ ...data, user })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}

export const UserModule = getModule(User)
