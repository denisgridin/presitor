import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IContent, IElement, IPresentation, ISlide } from '~/interfaces/presentation'
import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, LIST_STYLE } from '~/utils/enums'
import { CANVAS_OPTIONS } from '~/utils/constants'

const uuid = require('uuid-random')
const cloneDeep = require('lodash.clonedeep')

export interface IConstructorPresentation extends IPresentation{
  slides: ISlide[],
  activeSlideId: string,
  activeSlide: ISlide,
  activeElementId: string | null,
  activeElementType: ELEMENT_TYPE | null,
  hoverElementId: string | null
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
    activeElementId: null,
    activeElementType: null,
    hoverElementId: null,
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
            elementType: ELEMENT_TYPE.CONTENT,
            insertion: {
              tag: 'p',
              contentType: CONTENT_TYPE.PARAGRAPH
            },
            layout: {
              x: 100,
              y: 200,
              width: 300,
              height: 500,
              rotation: 0
            },
            font: {
              fontFamily: 'Roboto',
              fontSize: 20,
              letterSpacing: 3,
              lineHeight: 30,
              fontCase: 'normal',
              color: '#ffffff',
              bold: false,
              italic: false,
              align: ALIGN.RIGHT
            },
            text: 'Текстовый элемент'
          },
          {
            presentationId: '1',
            slideId: '1',
            elementId: '2',
            elementType: ELEMENT_TYPE.CONTENT,
            name: 'Title',
            insertion: {
              tag: 'h1',
              contentType: CONTENT_TYPE.TITLE
            },
            layout: {
              x: 150,
              y: 300,
              width: 300,
              height: 100,
              rotation: 0
            },
            font: {
              fontFamily: 'Montserrat',
              fontSize: 23,
              letterSpacing: 3,
              lineHeight: 30,
              fontCase: 'normal',
              color: '#ffffff',
              bold: false,
              italic: false,
              align: ALIGN.LEFT
            },
            text: 'Заголовок'
          },
          {
            presentationId: '1',
            slideId: '1',
            elementId: '3',
            elementType: ELEMENT_TYPE.CONTENT,
            name: 'Title',
            insertion: {
              tag: 'li',
              contentType: CONTENT_TYPE.LIST,
              listStyle: LIST_STYLE.CIRCLE
            },
            layout: {
              x: 150,
              y: 300,
              width: 300,
              height: 100,
              rotation: 0
            },
            font: {
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 14,
              letterSpacing: 3,
              lineHeight: 30,
              fontCase: 'normal',
              color: '#ffffff',
              bold: false,
              italic: false,
              align: ALIGN.CENTER
            },
            text: 'Список'
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

  public get getHoveredElementId () {
    return this.currentPresentation.hoverElementId
  }

  public get getActiveElement () {
    const activeElementType = this.currentPresentation.activeElementType
    const activeElementId = this.currentPresentation.activeElementId

    if (activeElementType) {
      const activeSlide = this.currentPresentation.slides.find((slide: ISlide) => slide.slideId === this.getActiveSlideId) as ISlide
      if (activeElementType === ELEMENT_TYPE.CONTENT) {
        return activeSlide.elements.find((el: IContent) => el.elementId === activeElementId) as IContent
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
  public SET_ACTIVE_ELEMENT_ID_AND_TYPE ({ id, type }: { id: string | null, type: ELEMENT_TYPE | null }) {
    this.currentPresentation.activeElementId = id
    this.currentPresentation.activeElementType = type
  }

  @Mutation
  public SET_HOVER_ELEMENT ({ id }: { id: string | null }) {
    this.currentPresentation.hoverElementId = id
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

  @Mutation
  public UPDATE_ELEMENT_FONT ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      console.log(`set ${key} = ${value}`)
      element.font[`${key}`] = value
    }
  }

  @Mutation
  public UPDATE_ELEMENT_VALUE ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      console.log(`set ${key} = ${value}`)
      element[`${key}`] = value
    }
  }

  @Mutation
  public REMOVE_SLIDE_ELEMENT ({ slideId, elementId }: { slideId: string, elementId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    if (slide) {
      slide.elements = slide.elements.filter((el: IElement) => el.elementId !== elementId)
    }
  }

  @Action({ rawError: true })
  public copySlideElement (element: IContent) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === element.slideId)
    if (slide) {
      const x = (CANVAS_OPTIONS.layout.width / 2) - (element.layout.width / 2)
      const y = (CANVAS_OPTIONS.layout.height / 2) - (element.layout.height / 2)
      const item = cloneDeep({ ...element, layout: { ...element.layout, x, y } })
      item.elementId = uuid()
      console.log(item)
      slide.elements.push(item)
    }
  }

  @Action({ rawError: true })
  public removeSlideElement ({ slideId, elementId }: { slideId: string, elementId: string }) {
    console.log(`remove element ${elementId} from slide ${slideId}`)
    this.REMOVE_SLIDE_ELEMENT({ slideId, elementId })
  }

  @Action({ rawError: true })
  public updateElementValue ({ elementId, slideId, key, value }: { key: string, value: any, elementId: string, slideId: string }) {
    this.UPDATE_ELEMENT_VALUE({ elementId, slideId, key, value })
  }
}

export const PresentationModule = getModule(PresentationStore)
