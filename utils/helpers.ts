import { CANVAS_OPTIONS, DEFAULT_ELEMENT, ELEMENT_STYLES, FIELD } from '~/utils/constants'
import { CONTENT_TYPE, LIST_STYLE } from '~/utils/enums'
import {
  IElement,
  IFont,
  IPresentation,
  IStyle
} from '~/interfaces/presentation'
import { ELEMENT_BUILDER_DATA } from '~/interfaces'
import uuid from 'uuid-random'

export function getStyleVariable (name: string): any {
  const computedStyle = getComputedStyle(document.documentElement)
  return computedStyle.getPropertyValue(`--${name}`)
}

export function getCookieUser (cookies: any) {
  const userString = cookies[FIELD.USER]?.toString() || ''
  return userString ? JSON.parse(decodeURIComponent(userString)) : null
}

export function getCenterCoords (width: number, height: number) {
  return {
    x: (CANVAS_OPTIONS.layout.width / 2) - (width / 2),
    y: (CANVAS_OPTIONS.layout.height / 2) - (height / 2)
  }
}

export function buildIntsertion (data: { contentType: CONTENT_TYPE }) {
  const insertion = {
    contentType: data.contentType
  } as { contentType?: CONTENT_TYPE, tag: string, listStyle: LIST_STYLE }
  let tag = 'p'
  if (data.contentType === CONTENT_TYPE.TITLE) {
    tag = 'h1'
  } else if (data.contentType === CONTENT_TYPE.LIST) {
    tag = 'li'
  }
  insertion.tag = tag
  insertion.listStyle = LIST_STYLE.DISC
  return insertion
}

export function buildElement (presentation: IPresentation, slideId: string, data: ELEMENT_BUILDER_DATA): IElement {
  console.log(presentation, slideId, data)
  return {
    ...DEFAULT_ELEMENT,
    elementId: uuid(),
    presentationId: presentation.presentationId,
    slideId,
    name: data.name,
    font: {
      ...DEFAULT_ELEMENT.font as IFont,
      fontFamily: presentation.fontFamily,
      color: '#333333'
    },
    insertion: buildIntsertion(data as any) || {},
    layout: {
      ...DEFAULT_ELEMENT.layout,
      ...data.layout
    },
    style: {
      ...ELEMENT_STYLES as IStyle,
      ...data.style
    },
    text: data.text === null ? DEFAULT_ELEMENT.text : data.text
  } as IElement
}

export async function asyncForEach (array: any[], callback: (item: any, i: number, array: any[]) => void) {
  for (let i = 0; i < array.length; i++) {
    // eslint-disable-next-line node/no-callback-literal
    await callback(array[i] as any, i as number, array as any[])
  }
}

export function exitFullScreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

export function startFullScreen (element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  }
}

// export function parseImageInBlob (file: File) {
//
//   console.log(data)
//   console.log(url)
//   return data
// }
