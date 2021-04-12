import { CANVAS_OPTIONS, FIELD } from '~/utils/constants'

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

// export function parseImageInBlob (file: File) {
//
//   console.log(data)
//   console.log(url)
//   return data
// }
