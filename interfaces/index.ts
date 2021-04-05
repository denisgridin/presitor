import { ELEMENT_TYPE } from '~/utils/enums'

export interface ITabItem {
  id: string | number,
  text: string
}

export interface IConstructorElementShape {
  icon: string,
  name: string,
  type: ELEMENT_TYPE
}
