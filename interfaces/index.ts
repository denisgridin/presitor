import { ALIGN, FIGURE } from '~/utils/enums'

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
