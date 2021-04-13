import { Api } from '~/api/index'
import { PATH } from '~/utils/constants'

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

  public getPresentationSlides (presentationId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.slides.default.replace(':presentationId', presentationId)
        const { data } = await this.instance.get(this.getUrl(path))
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public getSlideElements (presentationId: string, slideId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.elements.default.replace(':presentationId', presentationId).replace(':slideId', slideId)
        const { data } = await this.instance.get(this.getUrl(path))
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
