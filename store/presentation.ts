import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IPresentation, ISlide } from '~/interfaces/presentation'

export interface IConstructorPresentation extends IPresentation{
  slides: ISlide[],
  activeSlide: number
}

export interface IPresentationState {
  currentPresentation: IConstructorPresentation
}

@Module({ store: store(), stateFactory: true, name: 'presentation', dynamic: true, namespaced: true })
export class PresentationStore extends VuexModule implements IPresentationState {
  public currentPresentation = {
    name: 'Презентация 2',
    activeSlide: 1,
    slides: [
      {
        presentationId: '1',
        slideId: '1',
        name: 'Slide 1',
        index: 1,
        elements: []
      },
      {
        presentationId: '1',
        slideId: '2',
        name: 'Slide 2',
        index: 2,
        elements: []
      },
      {
        presentationId: '1',
        slideId: '3',
        name: 'Slide 3',
        index: 3,
        elements: []
      },
      {
        presentationId: '1',
        slideId: '4',
        name: 'Slide 4',
        index: 4,
        elements: []
      }
    ] as ISlide[]
  } as IConstructorPresentation

  public get getCurrentSlides (): ISlide[] {
    return this.currentPresentation.slides
  }

  public get getCurrentPresentation (): IPresentation {
    return this.currentPresentation
  }

  public get getActiveSlide (): number {
    return this.currentPresentation.activeSlide
  }

  @Mutation
  public SET_ACTIVE_SLIDE (index: number) {
    this.currentPresentation.activeSlide = index
  }

  @Mutation
  public ADD_PRESENTATION_SLIDE (slide: ISlide) {
    console.log(slide)
    this.currentPresentation.slides.push(slide)
  }
}

export const PresentationModule = getModule(PresentationStore)
