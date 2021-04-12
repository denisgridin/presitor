import { Context } from '@nuxt/types'
import { PresentationModule } from '~/store/presentation'
import { IElement, IPresentation, ISlide } from '~/interfaces/presentation'

export default ({ app }: Context, inject: any) => {
  inject('current', (instance: string) => {
    switch (instance) {
      case 'presentation': {
        return PresentationModule.getCurrentPresentation as IPresentation
      }
      case 'slide': {
        return PresentationModule.getActiveSlide as ISlide
      }
      case 'element': {
        return PresentationModule.getActiveElement as IElement
      }
    }
  })
}
