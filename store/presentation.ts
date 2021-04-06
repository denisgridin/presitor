import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IElement, IPresentation, ISlide } from '~/interfaces/presentation'
import { ELEMENT_TYPE } from '~/utils/enums'

export interface IConstructorPresentation extends IPresentation{
  slides: ISlide[],
  activeSlideId: string,
  activeSlide: ISlide,
  activeElementId: string,
  activeElementType: ELEMENT_TYPE
}

export interface IPresentationState {
  currentPresentation: IConstructorPresentation
}

@Module({ store: store(), stateFactory: true, name: 'presentation', dynamic: true, namespaced: true })
export class PresentationStore extends VuexModule implements IPresentationState {
  public zoom: number = 100

  public currentPresentation = {
    name: 'Презентация 2',
    activeSlideId: '1',
    activeElementId: '1',
    activeElementType: ELEMENT_TYPE.CONTENT,
    fillColor: '#304abb',
    fontFamily: 'Roboto',
    slides: [
      {
        presentationId: '1',
        slideId: '1',
        name: 'Slide 1',
        index: 1,
        elements: [
          {
            presentationId: '1',
            slideId: '1',
            elementId: '1',
            name: 'Text element',
            layout: {
              x: 100,
              y: 200,
              width: 300,
              height: 500,
              rotation: 0
            },

            text: 'Текстовый элемент',
            fontFamily: 'Roboto',
            fontSize: 14,
            letterSpacing: 'normal',
            lineHeight: 'normal',
            fontCase: 'normal',
            color: '#304add'
          }
        ]
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

  public get getActiveSlideId (): string {
    return this.currentPresentation.activeSlideId
  }

  public get getActiveSlide () {
    const activeSlideId = this.getActiveSlideId
    return this.currentPresentation.slides.find((slide : ISlide) => slide.slideId === activeSlideId)
  }

  public get getActiveElement () {
    const activeElementType = this.currentPresentation.activeElementType
    const activeElementId = this.currentPresentation.activeElementId

    if (activeElementType) {
      const activeSlide = this.currentPresentation.slides.find((slide: ISlide) => slide.slideId === this.getActiveSlideId) as ISlide
      if (activeElementType === ELEMENT_TYPE.CONTENT) {
        return activeSlide.elements.find((el: IElement) => el.elementId === activeElementId) as IElement
      }
    }
    return null
  }

  public get getConstructorZoom (): number {
    return this.zoom
  }

  @Mutation
  public SET_ACTIVE_SLIDE_ID (id: string) {
    this.currentPresentation.activeSlideId = id
  }

  @Mutation
  public SET_ACTIVE_ELEMENT_ID_AND_TYPE ({ id, type }: { id: string, type: ELEMENT_TYPE }) {
    this.currentPresentation.activeElementId = id
    this.currentPresentation.activeElementType = type
  }

  @Mutation
  public ADD_PRESENTATION_SLIDE (slide: ISlide) {
    console.log(slide)
    this.currentPresentation.slides.push(slide)
  }

  @Mutation
  public SET_ZOOM (zoom: number) {
    this.zoom = zoom
  }

  @Mutation
  public UPDATE_PRESENTATION_FIELD ({ key, value }: { key: string, value: string | number }) {
    this.currentPresentation = { ...this.currentPresentation, ...{ [key]: value } }
  }

  @Mutation
  public UPDATE_ELEMENT_LAYOUT ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      console.log(`set ${key} = ${value}`)
      element.layout[`${key}`] = value
    }
  }
}

export const PresentationModule = getModule(PresentationStore)
