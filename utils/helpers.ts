import { CANVAS_OPTIONS, FIELD } from '~/utils/constants'
import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, LIST_STYLE } from '~/utils/enums'
import { IContent, IPresentation } from '~/interfaces/presentation'
import { ELEMENT_BUILDER_DATA } from '~/interfaces'
import uuid from 'uuid-random'

export function getStyleVariable (name: string): any {
  const computedStyle = getComputedStyle(document.documentElement)
  return computedStyle.getPropertyValue(`--${name}`)
}

export function getCookieUser (cookies: any) {
  const userString = cookies.get(FIELD.USER)?.toString() || ''
  return userString ? JSON.parse(decodeURIComponent(userString)) : null
}

export function getCenterCoords (width: number, height: number) {
  return {
    x: (CANVAS_OPTIONS.layout.width / 2) - (width / 2),
    y: (CANVAS_OPTIONS.layout.height / 2) - (height / 2)
  }
}

export function buildElement (presentation: IPresentation, slideId: string, data: ELEMENT_BUILDER_DATA): IContent {
  console.log(presentation, slideId, data)
  switch (data.elementType) {
    case ELEMENT_TYPE.CONTENT: {
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

      return {
        presentationId: presentation.presentationId,
        slideId,
        elementId: uuid(),
        name: data.name,
        elementType: data.elementType,
        insertion,
        layout: {
          x: getCenterCoords(200, 50).x,
          y: getCenterCoords(200, 50).y,
          width: 200,
          height: 50,
          rotation: 0
        },
        font: {
          fontFamily: presentation.fontFamily,
          fontSize: 20,
          letterSpacing: 3,
          lineHeight: 30,
          fontCase: 'normal',
          color: '#ffffff',
          bold: false,
          italic: false,
          align: ALIGN.LEFT
        },
        text: 'Текстовый элемент'
      } as IContent
    }
    default: {
      return {} as IContent
    }
  }
}

// export function parseImageInBlob (file: File) {
//
//   console.log(data)
//   console.log(url)
//   return data
// }
