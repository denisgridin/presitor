import { IConstructorElementShape, IDefaultElements } from '~/interfaces'
import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, FIGURE, LIST_STYLE } from '~/utils/enums'
import { IContent } from '~/interfaces/presentation'
import { getCenterCoords } from '~/utils/helpers'
import { PresentationModule } from '~/store/presentation'

export const MESSAGE = {
  greeting: 'Создайте свою первую впечатляющую презентацию'
}

export const FIELD = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER: 'USER',
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  LAYOUT: 'layout'
}

export const PATH = {
  user: {
    registration: 'api/registration',
    login: 'api/login',
    token: 'api/token'
  },
  presentations: {
    default: '/presentations',
    last: '/presentations/last',
    exact: '/presentations/:presentationId'
  },
  slides: {
    default: '/presentations/:presentationId/slides',
    exact: '/presentations/:presentationId/slides/:slideId'
  },
  elements: {
    default: '/presentations/:presentationId/slides/:slideId/elements',
    exact: '/presentations/:presentationId/slides/:slideId/elements/:elementId',
    copy: '/presentations/:presentationId/slides/:slideId/elements/:elementId/copy'
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
    },
    lineHeight: {
      min: 1,
      max: 30
    },
    letterSpacing: {
      min: 0,
      max: 30
    }
  }
}

export const CONTEXT_MENU_ITEMS = {
  ACTIONS_TABLE_ELEMENTS: [
    {
      id: 1,
      text: 'Удалить',
      handler: () => {
        console.log('Удалить')
      }
    },
    {
      id: 2,
      text: 'Копировать',
      handler: () => {
        console.log('Копировать')
      }
    }
  ]
}

export const CANVAS_OPTIONS = {
  layout: {
    width: 1400,
    height: 700
  }
}

export const CONTENT_ELEMENTS = [
  {
    type: CONTENT_TYPE.TITLE,
    html: '<h1>Заголовок</h1>'
  },
  {
    type: CONTENT_TYPE.PARAGRAPH,
    html: '<p>Параграф</p>'
  },
  {
    type: CONTENT_TYPE.LIST,
    html: '<ul><li>Список</li></ul>'
  }
]

export const LIST_STYLE_TYPES = [
  {
    name: 'Диск',
    icon: 'bx-disc',
    type: LIST_STYLE.DISC
  },
  {
    name: 'Круг',
    icon: 'bx-circle',
    type: LIST_STYLE.CIRCLE
  },
  {
    name: 'Квадрат',
    icon: 'bx-square',
    type: LIST_STYLE.SQUARE
  },
  {
    name: 'Число',
    icon: 'bx-list-ol',
    type: LIST_STYLE.DECIMAL
  }
]

export const TEXT_ALIGNS = [
  {
    icon: 'bx-align-justify',
    value: ALIGN.JUSTIFY,
    id: 1,
    tooltip: 'Ширина'
  },
  {
    icon: 'bx-align-left',
    value: ALIGN.LEFT,
    id: 2,
    tooltip: 'Слева'
  },
  {
    icon: 'bx-align-right',
    value: ALIGN.RIGHT,
    id: 3,
    tooltip: 'Справа'
  },
  {
    icon: 'bx-align-middle',
    value: ALIGN.CENTER,
    id: 4,
    tooltip: 'Центр'
  }
]

export const ELEMENT_STYLES = {
  backgroundColor: '#6C63FF',
  boxShadow: '',
  opacity: 1,
  borderColor: '',
  borderRadius: '',
  borderWidth: '',
  borderStyle: ''
}

// export const DEFAULT_ELEMENTS: IDefaultElements = {
//   content: {
//     title: {
//       presentationId: PresentationModule.getCurrentPresentation.presentationId,
//       slideId: PresentationModule.getActiveSlideId,
//       name: 'Заголовок',
//       elementType: ELEMENT_TYPE.CONTENT,
//       insertion: {
//         tag: 'h1',
//         contentType: CONTENT_TYPE.TITLE
//       },
//       layout: {
//         x: getCenterCoords(300, 100).x,
//         y: getCenterCoords(300, 100).y,
//         width: 300,
//         height: 100,
//         rotation: 0
//       },
//       font: {
//         fontFamily: PresentationModule.getCurrentPresentation.fontFamily,
//         fontSize: 20,
//         letterSpacing: 3,
//         lineHeight: 30,
//         fontCase: 'normal',
//         color: '#ffffff',
//         bold: false,
//         italic: false,
//         align: ALIGN.LEFT
//       },
//       text: 'Заголовок'
//     } as IContent,
//     paragraph: {} as IContent,
//     list: {} as IContent
//   }
// }

export const BORDER_STYLES = [
  {
    value: 'solid',
    text: 'Сплошная'
  },
  {
    value: 'dashed',
    text: 'Прерывистая'
  },
  {
    value: 'dotted',
    text: 'Точечная'
  },
  {
    value: 'inset',
    text: 'Внутренняя'
  },
  {
    value: 'outset',
    text: 'Внешняя'
  }
]
