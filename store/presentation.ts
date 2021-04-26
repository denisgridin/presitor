import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IContent, IElement, IElementType, IPresentation, ISlide } from '~/interfaces/presentation'
import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, LIST_STYLE } from '~/utils/enums'
import { CANVAS_OPTIONS } from '~/utils/constants'
import { buildElement } from '~/utils/helpers'
import { ELEMENT_BUILDER_DATA, IHistoryData } from '~/interfaces'
import { PresentationApi } from '~/api/presentation'
import { UserModule } from '~/store/user'
import { SlideApi } from '~/api/slide'
import { ElementApi } from '~/api/element'
import login from '~/pages/login.vue'
import Vue from 'vue'
const pick = require('lodash.pick')

const uuid = require('uuid-random')
const cloneDeep = require('lodash.clonedeep')

export interface IConstructorPresentation extends IPresentation{
  slides: ISlide[],
  activeSlideId: string,
  activeSlide: ISlide,
  activeElementId: string | null,
  activeElementType: ELEMENT_TYPE | null,
  hoverElementId: string | null,
  isPlay: boolean
}

export interface IPresentationState {
  currentPresentation: IConstructorPresentation,
  history: {
    index: number,
    items: IHistoryData[]
  }
}

@Module({ store: store(), stateFactory: true, name: 'presentation', dynamic: true, namespaced: true })
export class PresentationStore extends VuexModule implements IPresentationState {
  public zoom: number = 100
  public history = {
    index: 0,
    items: []
  } as {
    index: number,
    items: IHistoryData[]
  }

  private presentationDefaults = {
    slides: [],
    activeSlideId: '',
    activeSlide: {} as ISlide,
    activeElementId: '',
    activeElementType: ELEMENT_TYPE.CONTENT,
    hoverElementId: '',
    isPlay: false
  }

  private updatePresentationDebounce: any

  public currentPresentation = {
    isPlay: false,
    presentationId: '1',
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

  public get isPresentationPlayed () {
    return this.currentPresentation.isPlay
  }

  public get getHistory () {
    return this.history
  }

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

  public get getActiveElement (): IElementType | null {
    const activeElementType = this.currentPresentation.activeElementType
    const activeElementId = this.currentPresentation.activeElementId

    if (activeElementType) {
      const activeSlide = this.currentPresentation.slides.find((slide: ISlide) => slide.slideId === this.getActiveSlideId) as ISlide
      if (activeElementType === ELEMENT_TYPE.CONTENT && activeSlide.elements?.length > 0) {
        return activeSlide.elements.find((el: IContent) => el.elementId === activeElementId) as IElementType
      }
    }
    return null
  }

  public get getConstructorZoom (): number {
    return this.zoom
  }

  @Mutation
  public ADD_HISTORY_RECORD (data: IHistoryData) {
    const clonedItem = cloneDeep(data.element)
    // this.history.items.push({ type: data.type, element: clonedItem })
    // this.history.index = this.history.items.length - 1
    Vue.set(this.history, 'items', [...this.history.items, { type: data.type, element: clonedItem }])
    Vue.set(this.history, 'index', this.history.items.length - 1)
  }

  @Mutation
  public SET_HISTORY_CURSOR (index: number) {
    Vue.set(this.history, 'index', index)
    // this.history.index = index
  }

  @Mutation
  public SET_ACTIVE_SLIDE_ID (id: string) {
    Vue.set(this.currentPresentation, 'activeSlideId', id)
  }

  @Mutation
  public SET_ACTIVE_ELEMENT_ID_AND_TYPE ({ id, type }: { id: string | null, type: ELEMENT_TYPE | null }) {
    Vue.set(this.currentPresentation, 'activeElementId', id)
    Vue.set(this.currentPresentation, 'activeElementType', type)
  }

  @Mutation
  public SET_HOVER_ELEMENT ({ id }: { id: string | null }) {
    // this.currentPresentation.hoverElementId = id
    Vue.set(this.currentPresentation, 'hoverElementId', id)
  }

  @Mutation
  public ADD_PRESENTATION_SLIDE (slide: ISlide) {
    console.log(slide)
    Vue.set(this.currentPresentation, 'slides', [...this.currentPresentation.slides, slide])
    Vue.set(this.currentPresentation, 'activeSlideId', slide.slideId)
    // this.currentPresentation.slides.push(slide)
  }

  @Mutation
  public SET_ZOOM (zoom: number) {
    this.zoom = zoom
  }

  @Mutation
  SET_CURRENT_PRESENTATION (presentation: IPresentation) {
    Vue.set(this, 'currentPresentation', {
      ...presentation,
      ...this.presentationDefaults
    })
  }

  @Mutation
  SET_CURRENT_SLIDES (slides: ISlide[]) {
    Vue.set(this.currentPresentation, 'slides', slides)
    // this.currentPresentation.slides = slides
  }

  @Mutation
  SET_SLIDE_ELEMENTS ({
    slideId,
    elements
  }: {
    slideId: string,
    elements: IContent[]
  }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    if (slide) {
      Vue.set(slide, 'elements', elements)
      // slide.elements = elements
    }
  }

  @Mutation
  public UPDATE_PRESENTATION_FIELD ({ key, value }: { key: string, value: string | number }) {
    Vue.set(this, 'currentPresentation', { ...this.currentPresentation, ...{ [key]: value } })
    // this.currentPresentation = { ...this.currentPresentation, ...{ [key]: value } }
  }

  @Mutation
  public UPDATE_ELEMENT_LAYOUT ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      console.log(`set ${key} = ${value}`)
      Vue.set(element.layout, key, value)
      // element.layout[`${key}`] = value
    }
  }

  @Mutation
  public UPDATE_ELEMENT_FONT ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      console.log(`set ${key} = ${value}`)
      Vue.set(element.font, key, value)
      // element.font[`${key}`] = value
    }
  }

  @Mutation
  public UPDATE_ELEMENT_VALUE ({ key, value, elementId, slideId }: { key: string, value: any, elementId: string, slideId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    const element = slide?.elements.find(element => element.elementId === elementId)
    if (element) {
      const valueText = typeof value === 'object' ? JSON.stringify(value) : value
      // console.log(`set ${key} = ${valueText}`)
      Vue.set(element, key, value)
      // element[`${key}`] = value
    }
  }

  @Mutation
  public UPDATE_ELEMENT_BY_ID ({ id, element }: { id: string, element: IElementType }) {
    console.log('update')
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === element.slideId)
    console.log('slide ', slide)
    if (slide) {
      const item = slide.elements.find((i: IElementType) => {
        return i.elementId === id
      })
      Object.assign(item, element)
      console.log('item ', item)
    }
  }

  @Mutation
  public REMOVE_SLIDE_ELEMENT ({ slideId, elementId }: { slideId: string, elementId: string }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    if (slide) {
      Vue.set(slide, 'elements', slide.elements.filter((el: IElement) => el.elementId !== elementId))
      // slide.elements =
    }
  }

  @Mutation
  public ADD_SLIDE_ELEMENT ({ slideId, element }: { slideId: string, element: IContent }) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === slideId)
    if (slide) {
      const elements = slide.elements = slide.elements?.length ? [...slide.elements, element] : [element]
      console.log('elements', elements)
      Vue.set(slide, 'elements', elements)
    }
  }

  @Action({ rawError: true })
  public getPresentation (presentationId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new PresentationApi(UserModule.getTokens.accessToken)
        const presentation = await api.getPresentation(presentationId) as IPresentation
        resolve(presentation)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public getPresentationSlides (presentationId: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new SlideApi(UserModule.getTokens.accessToken)
        const slides = await api.getPresentationSlides(presentationId)
        resolve(slides)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public getSlideElements ({ presentationId, slideId }: { presentationId: string, slideId: string }) {
    console.log('get slide elements', presentationId, slideId)
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new ElementApi(UserModule.getTokens.accessToken)
        const elements = await api.getSlideElements(presentationId, slideId)
        if (Array.isArray(elements)) {
          this.SET_SLIDE_ELEMENTS({
            slideId,
            elements
          })
        }
        resolve(elements)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public async copySlideElement (element: IContent) {
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === element.slideId)
    if (slide) {
      const x = (CANVAS_OPTIONS.layout.width / 2) - (element.layout.width / 2)
      const y = (CANVAS_OPTIONS.layout.height / 2) - (element.layout.height / 2)
      const item = cloneDeep({ ...element, layout: { ...element.layout, x, y } })
      item.elementId = uuid()
      console.log(item)
      slide.elements.push(item)

      const api = new ElementApi(UserModule.getTokens.accessToken)
      element.elementId = uuid()
      const result = await api.createSlideElement(element.presentationId, element.slideId, item)
      console.log(result)
    }
  }

  @Action({ rawError: true })
  public async removeSlideElement ({ slideId, elementId }: { slideId: string, elementId: string }) {
    console.log(`remove element ${elementId} from slide ${slideId}`)
    const api = new ElementApi(UserModule.getTokens.accessToken)
    await api.removeSlideElement(this.currentPresentation.presentationId, slideId, elementId)
    this.REMOVE_SLIDE_ELEMENT({ slideId, elementId })
  }

  @Action({ rawError: true })
  public async updateElementValue ({ elementId, slideId, key, value, element = null }: { key: string, value: any, elementId: string, slideId: string, element: IElementType | null }) {
    this.UPDATE_ELEMENT_VALUE({ elementId, slideId, key, value })
    const item = element?.elementId ? element as IElementType : this.getActiveElement as IElementType
    console.log('update element ', item)
    const api = new ElementApi(UserModule.getTokens.accessToken)
    await api.updateSlideElement(this.currentPresentation.presentationId, slideId, elementId, item as IElementType)
    PresentationModule.setHistory({ type: 'update', element: item })
  }

  @Action({ rawError: true })
  public async addSlideElement ({ slideId, data }: { slideId: string, data: ELEMENT_BUILDER_DATA }) {
    const element = buildElement(this.currentPresentation, slideId, data as ELEMENT_BUILDER_DATA)

    const api = new ElementApi(UserModule.getTokens.accessToken)
    const id = await api.createSlideElement(this.currentPresentation.presentationId, slideId, element as IElementType) as string
    const item = { ...element, elementId: id }
    console.log('added item ', item)
    this.ADD_SLIDE_ELEMENT({ slideId, element: cloneDeep(item) })
  }

  @Action({ rawError: true })
  public setHistory (data: IHistoryData) {
    this.ADD_HISTORY_RECORD(data)
  }

  @Action
  public getHistoryStart (data: IHistoryData) {
    if (this.getHistory.items.length === 0) {
      this.setHistory(data)
    }
  }

  @Action
  public setHistoryCursor (index: number) {
    this.SET_HISTORY_CURSOR(index)

    const cursor = this.getHistory.items[index]
    const historyElement = this.getHistory.items[index]?.element as IElementType
    console.log(cursor)
    switch (cursor.type) {
      case 'create': { break }
      case 'update': {
        this.UPDATE_ELEMENT_BY_ID({ id: historyElement.elementId, element: historyElement })
        break
      }
      case 'delete': { break }
    }
  }

  @Action
  public editPresentation ({ key, value }: { key: string, value: any }) {
    PresentationModule.UPDATE_PRESENTATION_FIELD({ key, value })

    clearTimeout(this.updatePresentationDebounce)
    this.updatePresentationDebounce = setTimeout(async () => {
      await this.updatePresentation()
    }, 1000)
  }

  @Action({ rawError: true })
  public async updatePresentation () {
    try {
      const api = new PresentationApi(UserModule.getTokens.accessToken)
      const presentation = pick(this.currentPresentation, [
        'name', 'fillColor', 'fontFamily', 'presentationId'
      ])
      const result = await api.updatePresentation(presentation)
    } catch (error) {
      console.log(error)
    }
  }

  @Action({ rawError: true })
  public async addPresentationSlide (slide: ISlide) {
    try {
      const api = new SlideApi(UserModule.getTokens.accessToken)
      const id = await api.addPresentationSlide(slide) as string
      PresentationModule.ADD_PRESENTATION_SLIDE({ ...slide, slideId: id })
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation
  public TOGGLE_PRESENTATION_PLAY (state: boolean) {
    this.currentPresentation.isPlay = state
  }

  @Action
  public playPresentation (state: boolean) {
    this.TOGGLE_PRESENTATION_PLAY(state)
  }

  @Action
  public setActiveSlideId (id: string) {
    this.SET_ACTIVE_SLIDE_ID(id)
  }

  @Action
  public setCurrentSlidePosition (step: number) {
    this.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: null, type: null })
    const index = this.currentPresentation.slides.findIndex(slide => slide.slideId === this.currentPresentation.activeSlideId)
    console.log(index, step)
    const setSlideId = (index: number) => {
      if ((index + step <= this.currentPresentation.slides.length - 1) && (index + step >= 0)) {
        const currentSlideId = this.currentPresentation.slides[index + step].slideId
        this.setActiveSlideId(currentSlideId)
      }
    }

    if (step > 0) {
      setSlideId(index)
    } else if (step < this.currentPresentation.slides.length - 1) {
      setSlideId(index)
    }
  }

  @Mutation
  public REMOVE_SLIDE (slideId: string) {
    Vue.set(this.currentPresentation, 'slides', this.currentPresentation.slides.filter(slide => slide.slideId !== slideId))
  }

  @Action
  public removeSlide (slide: ISlide) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new SlideApi(UserModule.getTokens.accessToken)
        const result = await api.removeSlideById(slide)
        this.REMOVE_SLIDE(slide.slideId)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const PresentationModule = getModule(PresentationStore)
