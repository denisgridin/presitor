import { Api } from '~/api/index'
import { PATH } from '~/utils/constants'
import { IPresentation } from '~/interfaces/presentation'

export class PresentationApi {
  private instance: Api
  private prefix: string = '/api'

  constructor (token: string) {
    this.instance = new Api(token)
  }

  getUrl (path: string) {
    return `${this.prefix}${path}`
  }

  public getLastPresentations (userId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const query = `?userId=${userId}`
        const { data } = await this.instance.get(this.getUrl(`${PATH.presentations.default}${query}`))
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public getPresentation (presentationId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.presentations.exact.replace(':presentationId', presentationId)
        const { data } = await this.instance.get(this.getUrl(path))
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public updatePresentation (presentation: IPresentation) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.presentations.exact.replace(':presentationId', presentation.presentationId)
        const { data } = await this.instance.post(this.getUrl(path), presentation)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
