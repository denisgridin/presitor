import { IConstructorElementShape } from '~/interfaces'
import { FIGURE } from '~/utils/enums'

export const MESSAGE = {
  greeting: 'Создайте свою первую впечатляющую презентацию'
}

export const FIELD = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER: 'USER',
  IS_AUTHENTICATED: 'IS_AUTHENTICATED'
}

export const PATH = {
  user: {
    registration: 'api/registration',
    login: 'api/login',
    token: 'api/token'
  },
  presentations: {
    last: '/api/presentations/last'
  }
}

export const DATE_FORMAT = 'D MMM YYYY HH:mm:ss'

export const CONSTRUCTOR_TAB_ACTIONS = [
  {
    id: 'presentation',
    text: 'Презентация',
    icon: 'palette'
  },
  {
    id: 'elements',
    text: 'Элементы',
    icon: 'shapes'
  },
  {
    id: 'editor',
    text: 'Редактирование',
    icon: 'edit'
  }
]

export const CONSTRUCTOR_ELEMENTS: IConstructorElementShape[] = [
  {
    name: 'Квадрат',
    icon: 'square',
    type: FIGURE.square
  },
  {
    name: 'Прямо-\nугольник',
    icon: 'rectangle',
    type: FIGURE.rectangle
  },
  {
    name: 'Круг',
    icon: 'circle',
    type: FIGURE.circle
  }
]

export const MIME_TYPES_IMAGE = [
  {
    extension: 'png',
    value: 'image/png'
  },
  {
    extension: 'jpg',
    value: 'image/jpeg'
  },
  {
    extension: 'svg',
    value: 'image/svg'
  }
]

export const GOOGLE_FONTS = [
  { name: 'Roboto', definition: 'Roboto' },
  { name: 'Dela Gothic', definition: 'Dela Gothic One, sans-serif' },
  { name: 'Open Sans', definition: 'Open Sans, sans-serif' },
  { name: 'Kiwi Maru', definition: 'Kiwi Maru, sans-serif' },
  { name: 'Source Sans Pro', definition: 'Source Sans Pro, sans-serif' },
  { name: 'Train One', definition: 'Train One, sans-serif' },
  { name: 'Montserrat', definition: 'Montserrat, sans-serif' }
]

export const CONFINES = {
  layout: {
    width: {
      min: 50,
      max: 1500
    },
    height: {
      min: 50,
      max: 1500
    }
  },
  font: {
    fontSize: {
      min: 5,
      max: 70
    }
  }
}
