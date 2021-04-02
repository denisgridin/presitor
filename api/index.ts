import { AxiosInstance } from 'axios'
import { FIELD } from '~/utils/constants'

const axios = require('axios')

export class Api {
  private instance: AxiosInstance
  // private host: string = process.env.BACKEND_HOST || 'https://presitor-backend.herokuapp.com/'
  private host: string = 'http://localhost:5000/'

  get getToken (): string {
    return localStorage?.getItem(FIELD.ACCESS_TOKEN) as string
  }

  constructor (token: string | null = null) {
    const accessToken = token || this.getToken
    this.instance = axios.create({
      baseURL: this.host,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
  }

  public get (url: string) {
    return this.instance.get(url)
  }

  public post (url: string, data: any) {
    return this.instance.post(url, data)
  }

  public put (url: string, data: any) {
    return this.instance.put(url, data)
  }

  public delete (url: string) {
    return this.instance.delete(url)
  }
}
