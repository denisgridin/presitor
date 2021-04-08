import { FIELD } from '~/utils/constants'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { IUser, UserModule } from '~/store/user'
import { ITokenData } from '~/interfaces/token'
import { Context } from '@nuxt/types'

function removeCookies (cookies: NuxtCookies) {
  console.log('remove cookies')
  cookies.remove(FIELD.ACCESS_TOKEN)
  cookies.remove(FIELD.REFRESH_TOKEN)
  cookies.remove(FIELD.USER)
  cookies.remove(FIELD.IS_AUTHENTICATED)
}

function setCookieValue (cookies: NuxtCookies, key: string, value: any) {
  cookies.set(key, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

function setCookies (cookies: NuxtCookies, tokens: ITokenData, user: IUser) {
  console.log(tokens, user)
  removeCookies(cookies)
  console.log(`set cookies ${FIELD.ACCESS_TOKEN} ${tokens.accessToken}`)
  setCookieValue(cookies, FIELD.ACCESS_TOKEN, tokens.accessToken)

  console.log(`set cookies ${FIELD.REFRESH_TOKEN} ${tokens.refreshToken}`)
  setCookieValue(cookies, FIELD.REFRESH_TOKEN, tokens.refreshToken)

  console.log(`set cookies ${FIELD.USER} ${encodeURIComponent(JSON.stringify(user))}`)
  setCookieValue(cookies, FIELD.USER, encodeURIComponent(JSON.stringify(user)))

  console.log(`set cookies ${FIELD.IS_AUTHENTICATED} ${true}`)
  setCookieValue(cookies, FIELD.IS_AUTHENTICATED, true)
}

function login (cookies: NuxtCookies, redirect: () => void, user: IUser) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('login user')
      const data = await UserModule.loginUser(user) as ITokenData
      removeCookies(cookies)
      setCookies(cookies, data, data.user as IUser)
      const cookieUser = await UserModule.getCookieUser(cookies)
      console.log('cookie user: ' + JSON.stringify(cookieUser))
      console.log(UserModule.getAuthenticationState)
      await redirect()
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function logout (cookies: NuxtCookies, redirect: () => void) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('logout user')
      await redirect()
      removeCookies(cookies)
      await UserModule.logoutUser()
      resolve(true)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function updateToken (cookies: NuxtCookies, redirect: () => void) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('refresh token')
      await UserModule.getCookieUser(cookies)
      const refreshToken = UserModule.getTokens.refreshToken || cookies.get(FIELD.REFRESH_TOKEN)
      const data = await UserModule.updateToken(refreshToken) as ITokenData
      console.log(data)
      removeCookies(cookies)
      setCookies(cookies, data, data.user as IUser)
      UserModule.SET_AUTHENTICATED(true)
      resolve(data)
    } catch (error) {
      console.log(error)
      await logout(cookies, redirect)
      reject(error)
    }
  })
}

export default ({ app }: Context, inject: any) => {
  inject('auth', (type: string, cookies: NuxtCookies, redirect: () => void, user = {} as IUser) => {
    if (type === 'login') {
      return login(cookies, redirect, user as IUser)
    } else if (type === 'logout') {
      return logout(cookies, redirect)
    } else if (type === 'refresh') {
      return updateToken(cookies, redirect)
    }
  })
}
