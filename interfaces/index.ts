import { ALIGN, CONTENT_TYPE, ELEMENT_TYPE, FIGURE } from '~/utils/enums'
import { IElement, ILayout, IStyle } from '~/interfaces/presentation'

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

export interface ELEMENT_BUILDER_DATA {
  figure?: 'rectangle' | 'square' | 'circle',
  contentType?: CONTENT_TYPE,
  name?: string,
  background?: string,
  text?: string,
  style?: IStyle,
  layout?: ILayout,
  zIndex: number
}

export interface IHistoryData {
  type: 'update' | 'create' | 'delete',
  element: IElement
}
