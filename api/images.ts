import { AxiosInstance } from 'axios'
const axios = require('axios')

export class ImagesApi {
  private instance: AxiosInstance
  // private host: string = process.env.BACKEND_HOST || 'https://presitor-backend.herokuapp.com/'
  private host: string = process.env.IMGBB_HOST

  constructor () {
    this.instance = axios.create({
      baseURL: this.host
    })
  }

  public post (formData: FormData) {
    return this.instance.post('/', formData)
  }

  public delete (url: string) {
    return this.instance.delete(url)
  }
}
