import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { UserModule } from '~/store/user'

const axios = require('axios')

export class Api {
  private router: any
  private instance: AxiosInstance
  // private host: string = process.env.BACKEND_HOST || 'https://presitor-backend.herokuapp.com/'
  private host: string = 'http://localhost:5000/'

  private errorHandler (error: AxiosError): void {
    console.log(error)
  }

  constructor (token: string | null = null) {
    const accessToken = token || ''
    this.instance = axios.create({
      baseURL: this.host,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        console.log(error.response)
        // const status = error.response?.status as number
        // if ([401, 403].includes(status)) {
        //   if (UserModule.getAuthenticationState) {
        //     console.log('update token')
        //     UserModule.SET_AUTHENTICATED(false)
        //     await UserModule.updateToken()
        //   } else {
        //     console.log('logout user')
        //     // await UserModule.logoutUser()
        //     // this.router.push('/login')
        //   }
        // }
        return error
      })
  }

  public get (url: string) {
    return this.instance.get(url)
  }

  public post (url: string, data: any, config?: any) {
    return this.instance.post(url, data, config)
  }

  public put (url: string, data: any) {
    return this.instance.put(url, data)
  }

  public delete (url: string) {
    return this.instance.delete(url)
  }
}
