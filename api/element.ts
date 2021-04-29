import { Api } from '~/api/index'
import { PATH } from '~/utils/constants'
import { IElement } from '~/interfaces/presentation'

export class ElementApi {
  private instance: Api
  private prefix: string = '/api'
  constructor (token: string) {
    this.instance = new Api(token)
  }

  getUrl (path: string) {
    return `${this.prefix}${path}`
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

  public createSlideElement (presentationId: string, slideId: string, element: IElement) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.elements.default.replace(':presentationId', presentationId).replace(':slideId', slideId)
        const { data } = await this.instance.post(this.getUrl(path), element)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public removeSlideElement (presentationId: string, slideId: string, elementId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.elements.exact
          .replace(':presentationId', presentationId)
          .replace(':slideId', slideId)
          .replace(':elementId', elementId)
        const { data } = await this.instance.delete(this.getUrl(path))
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public updateSlideElement (presentationId: string, slideId: string, elementId: string, element: IElement) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = PATH.elements.exact
          .replace(':presentationId', presentationId)
          .replace(':slideId', slideId)
          .replace(':elementId', elementId)
        const { data } = await this.instance.put(this.getUrl(path), element)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
