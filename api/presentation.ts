import { Api } from '~/api/index'
import { PATH } from '~/utils/constants'

export class PresentationApi {
  private instance: Api

  constructor (token: string) {
    this.instance = new Api(token)
  }

  public getLastPresentations (userId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const query = `?userId=${userId}`
        const { data } = await this.instance.get(`${PATH.presentations.last}${query}`)
        console.log(data)
        resolve(data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
