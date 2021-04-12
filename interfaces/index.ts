import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, FIGURE } from '~/utils/enums'
import { IContent } from '~/interfaces/presentation'

export interface ITabItem {
  id: string | number,
  text: string
}

export interface IConstructorElementShape {
  icon: string,
  name: string,
  type: FIGURE
}

export interface IContextMenuItem {
  id: number,
  text: string,
  handler: () => void
}

export interface IContextMenu {
  items: IContextMenuItem[],
  active: boolean,
  coords: {
    x: number,
    y: number
  }
}

export interface ISelectorItem {
  icon: string,
  value: ALIGN,
  id: number,
  tooltip: string
}

export type IDefaultElements = {
  content: {
    title: IContent,
    paragraph: IContent,
    list: IContent
  }
}

export interface ELEMENT_BUILDER_DATA {
  elementType: ELEMENT_TYPE,
  contentType?: CONTENT_TYPE,
  name?: string
}
