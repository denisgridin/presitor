import { Api } from '~/api/index'
import { PATH } from '~/utils/constants'
import { ISlide } from '~/interfaces/presentation'

export class SlideApi {
  private instance: Api
  private prefix: string = '/api'

  constructor (token: string) {
    this.instance = new Api(token)
  }

  getUrl (path: string, data: { presentationId?: string, slideId?: string }) {
    return (`${this.prefix}${path}`).replace(':presentationId', data.presentationId as string).replace(':slideId', data.slideId as string)
  }

  public removeSlideById (slide: ISlide) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = this.getUrl(PATH.slides.exact, { presentationId: slide.presentationId, slideId: slide.slideId })
        const result = await this.instance.delete(path)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  public getPresentationSlides (presentationId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = this.getUrl(PATH.slides.default, { presentationId })
        const { data } = await this.instance.get(path)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  public addPresentationSlide (slide: ISlide) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const path = this.getUrl(PATH.slides.default, { presentationId: slide.presentationId })
        const { data } = await this.instance.post(path, slide)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
