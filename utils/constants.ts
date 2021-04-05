import { IConstructorElementShape } from '~/interfaces'
import { ELEMENT_TYPE } from '~/utils/enums'

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
    id: 'elements',
    text: 'Элементы',
    icon: 'shapes'
  },
  {
    id: 'feedback',
    text: 'Отзывы',
    icon: 'message-rounded-detail'
  }
]

export const CONSTRUCTOR_ELEMENTS: IConstructorElementShape[] = [
  {
    name: 'Квадрат',
    icon: 'square',
    type: ELEMENT_TYPE.square
  },
  {
    name: 'Прямо-\nугольник',
    icon: 'rectangle',
    type: ELEMENT_TYPE.rectangle
  },
  {
    name: 'Круг',
    icon: 'circle',
    type: ELEMENT_TYPE.circle
  }
]
