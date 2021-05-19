<template>
  <div
    class="elements-table-item"
    :class="{ 'elements-table-item__active': isSelected }"
    @mouseover="setHoverElement(element.elementId)"
    @mouseleave="setHoverElement(null)"
    @click.exact="setActiveElement"
    @click.right.prevent="openContext"
  >
    <i class="bx"></i>
    <span>{{ element.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PresentationModule } from '~/store/presentation'
import { CommonModule } from '~/store/common'
import { IElement } from '~/interfaces/presentation'

@Component
export default class ElementsTableItem extends Vue {
  @Prop()
  readonly element!: IElement

  get isSelected () {
    return this.getActiveElement?.elementId === this.element.elementId
  }

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getContextMenuItems () {
    return [
      {
        id: 1,
        text: 'Удалить',
        handler: () => {
          PresentationModule.removeSlideElement({ slideId: this.element.slideId, elementId: this.element.elementId })
        },
        icon: 'bx-trash'
      },
      {
        id: 2,
        text: 'Копировать',
        handler: () => {
          PresentationModule.copySlideElement(this.element)
        },
        icon: 'bx-copy'
      }
    ]
  }

  setHoverElement (id: string) {
    PresentationModule.SET_HOVER_ELEMENT({ id })
  }

  setActiveElement (): void {
    console.log('click', { key: this.element.elementId, type: this.element.elementType })
    PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: this.element.elementId, type: this.element.elementType })
  }

  openContext (event: { pageX: number, pageY: number }) {
    console.log('open context')
    CommonModule.SET_CONTEXT_MENU_OPTIONS({
      active: true,
      items: this.getContextMenuItems,
      event
    })
  }
}
</script>

<style lang="scss" scoped>
.elements-table-item {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 5px;
  padding: 5px;
  align-items: center;
  transition: $transition-delay;
  border-radius: $border-radius;
  cursor: pointer;

  &:hover {
    background: $color-primary-transparent-10;
  }

  &__active {
    background: $color-primary-transparent-30;
    color: $text-primary;
  }
}
</style>
