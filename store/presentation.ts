import Vue from 'vue'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IElement, IPresentation, ISlide } from '~/interfaces/presentation'
import { ELEMENT_TYPE } from '~/utils/enums'
import { CANVAS_OPTIONS } from '~/utils/constants'
import { buildElement } from '~/utils/helpers'
import { ELEMENT_BUILDER_DATA, IHistoryData } from '~/interfaces'
import { PresentationApi } from '~/api/presentation'
import { UserModule } from '~/store/user'
import { SlideApi } from '~/api/slide'
import { ElementApi } from '~/api/element'
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
  isPlay: boolean,
  broadcastSlideIndex: number,
  slideIndex: number
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

  public currentPresentation = {} as IConstructorPresentation

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

  public get getActiveSlide (): ISlide {
    const activeSlideId = this.getActiveSlideId
    return this.currentPresentation.slides?.find((slide : ISlide) => slide.slideId === activeSlideId) as ISlide || {} as ISlide
  }

  public get getHoveredElementId () {
    return this.currentPresentation.hoverElementId
  }

  public get getLastZIndex () {
    const indexes = this.getActiveSlide?.elements.map(el => el.style.zIndex).sort()
    if (Array.isArray(indexes)) {
      return indexes[indexes.length - 1] + 1 || 1
    } else {
      return 1
    }
  }

  public get getActiveElement (): IElement | null {
    const activeElementId = this.currentPresentation.activeElementId
    const activeSlide = this.currentPresentation?.slides?.find((slide: ISlide) => slide.slideId === this.getActiveSlideId) as ISlide || null
    if (activeSlide) {
      return activeSlide.elements?.find((el: IElement) => el.elementId === activeElementId) as IElement || null
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
  public SET_ACTIVE_SLIDE_ID (id: string | null) {
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
    elements: IElement[]
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
      // const valueText = typeof value === 'object' ? JSON.stringify(value) : value
      // console.log(`set ${key} = ${valueText}`)
      Vue.set(element, key, value)
      // element[`${key}`] = value
    }
  }

  @Mutation
  public UPDATE_ELEMENT_BY_ID ({ id, element }: { id: string, element: IElement }) {
    console.log('update')
    const slide = this.currentPresentation.slides.find(slide => slide.slideId === element.slideId)
    console.log('slide ', slide)
    if (slide) {
      const item = slide.elements.find((i: IElement) => {
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
  public ADD_SLIDE_ELEMENT ({ slideId, element }: { slideId: string, element: IElement }) {
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
        resolve(elements)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  public async copySlideElement (element: IElement) {
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
  public async updateElementValue ({ elementId, slideId, key, value, element = null }: { key: string, value: any, elementId: string, slideId: string, element: IElement | null }) {
    this.UPDATE_ELEMENT_VALUE({ elementId, slideId, key, value })
    const item = element?.elementId ? element as IElement : this.getActiveElement as IElement
    console.log('update element ', item)
    const api = new ElementApi(UserModule.getTokens.accessToken)
    await api.updateSlideElement(this.currentPresentation.presentationId, slideId, elementId, item as IElement)
    PresentationModule.setHistory({ type: 'update', element: item })
  }

  @Action({ rawError: true })
  public async addSlideElement ({ slideId, data }: { slideId: string, data: ELEMENT_BUILDER_DATA }) {
    const element = buildElement(this.currentPresentation, slideId, data as ELEMENT_BUILDER_DATA)

    const api = new ElementApi(UserModule.getTokens.accessToken)
    const id = await api.createSlideElement(this.currentPresentation.presentationId, slideId, element as IElement) as string
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
    const historyElement = this.getHistory.items[index]?.element as IElement
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
        'name', 'background', 'fontFamily', 'presentationId', 'broadcastSlideIndex'
      ])
      await api.updatePresentation({ ...presentation, slideIndex: presentation.broadcastSlideIndex })
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
  public setCurrentSlidePosition (data: {
    step: number,
    isAdmin: boolean,
    isSync: boolean
  } | number) {
    const isAdmin = (data as any).isAdmin || false
    const step = (data as any).step || data
    const isSync = (data as any).isSync || false
    this.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: null, type: null })
    const index = this.currentPresentation.slides.findIndex(slide => slide.slideId === this.currentPresentation.activeSlideId)
    console.log('change slide index', index, isAdmin)
    console.log(index + step)
    const setSlideId = async (index: number) => {
      if ((index + step <= this.currentPresentation.slides.length - 1) && (index + step >= 0)) {
        const position = index + step
        const currentSlideId = this.currentPresentation.slides[position].slideId
        console.log('set active slide', currentSlideId)
        this.setActiveSlideId(currentSlideId)
        if (isAdmin && isSync) {
          await this.changeActiveSlideIndex(position)
        }
      } else {
        console.log('out of bounds')
      }
    }
    setSlideId(index)
  }

  @Action({ rawError: true })
  changeActiveSlideIndex (index: number) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        this.currentPresentation.broadcastSlideIndex = index
        const result = await this.updatePresentation()
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
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
        if (this.getActiveSlide?.slideId === slide.slideId) {
          this.SET_ACTIVE_SLIDE_ID(null)
        }
        this.REMOVE_SLIDE(slide.slideId)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  @Action
  public updateZIndex ({ pos, zIndex }: { pos: string, zIndex: number }) {
    console.log({ pos, zIndex })
    const zIndexes = Array.from(new Set(this.getActiveSlide?.elements.map(el => el.style.zIndex) || [])).sort()
    console.log(zIndexes)
    const index = zIndexes.indexOf(zIndex)
    console.log('index ' + index)
    if (index > -1) {
      if (pos === 'up') {
        return zIndexes[index + 1] || zIndex + 1
      } else {
        return zIndexes[index - 1] || zIndex - 1
      }
    } else {
      return 1
    }
  }

  @Action({ rawError: true })
  uploadImage (file: Blob) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new ElementApi(UserModule.getTokens.accessToken)
        const formData = new FormData()
        const key = process.env.IMGBB_API_KEY || 'd3d3e75a30d992f104498bdfaccbb34a'
        formData.append('key', key as string)
        formData.append('image', file)
        const data = await api.uploadImage(formData)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  createPresentation () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new PresentationApi(UserModule.getTokens.accessToken)
        const presentationId = await api.createPresentation({ userId: UserModule.getUser.userId })
        resolve(presentationId)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  @Action({ rawError: true })
  removePresentation (id: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const api = new PresentationApi(UserModule.getTokens.accessToken)
        await api.removePresentation({ userId: UserModule.getUser.userId, id })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const PresentationModule = getModule(PresentationStore)
