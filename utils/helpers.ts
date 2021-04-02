import { FIELD } from '~/utils/constants'

export function getStyleVariable (name: string): any {
  const computedStyle = getComputedStyle(document.documentElement)
  return computedStyle.getPropertyValue(`--${name}`)
}

export function getCookieUser (cookies: any) {
  const userString = cookies.get(FIELD.USER)?.toString() || ''
  return userString ? JSON.parse(decodeURIComponent(userString)) : null
}
