import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '~/store/index'
import { IContextMenu, IContextMenuItem } from '~/interfaces'

export interface ICommonState {
  contextMenu: IContextMenu
}

@Module({ store: store(), stateFactory: true, name: 'common', dynamic: true, namespaced: true })
export class CommonStore extends VuexModule implements ICommonState {
  public contextMenu = {
    active: false,
    items: [] as IContextMenuItem[],
    coords: {
      x: 0,
      y: 0
    }
  }

  get getContextMenu () {
    return this.contextMenu
  }

  @Mutation
  private SET_CONTEXT_MENU_OPTIONS ({ active, event, items }: { active: boolean, event: { pageX: number, pageY: number }, items: IContextMenuItem[] }) {
    this.contextMenu.coords = {
      x: event?.pageX || 0,
      y: event?.pageY || 0
    }
    console.log(this.contextMenu.coords)
    this.contextMenu.items = Array.isArray(items) ? items as IContextMenuItem[] : []
    this.contextMenu.active = active || false
  }
}

export const CommonModule = getModule(CommonStore)
