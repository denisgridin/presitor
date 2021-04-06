import { FIGURE } from '~/utils/enums'

export interface ITabItem {
  id: string | number,
  text: string
}

export interface IConstructorElementShape {
  icon: string,
  name: string,
  type: FIGURE
}
