<template>
  <div
    v-if="element"
    class="canvas-element"
    :class="[ { 'canvas-element__active': isElementActive }, elementClass ]"
    :style="getElementStyle"
    @mousedown.stop="setActive"
    @click.right.prevent="openContext"
  >
    <div class="wrapper">
      <div v-show="isElementActive" class="handler handler-top-left" />
      <div v-show="isElementActive" class="handler handler-top-right" />
      <div v-show="isElementActive" class="handler handler-bottom-right" />
      <div v-show="isElementActive" class="handler handler-bottom-left" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import interact from 'interactjs'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import type { Interactable } from '@interactjs/core/Interactable'
import type { InteractEvent } from '@interactjs/core/InteractEvent'
import { IElementType } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
import { CONFINES } from '~/utils/constants'
import { CommonModule } from '~/store/common'

@Component
export default class CanvasElement extends Vue {
  component = {} as Interactable
  isActive: boolean = false

  updateDebounce: any = null

  @Prop() readonly element: IElementType
  @Prop({ default: false }) readonly disabled: boolean

  get getSlideElementsCount () {
    return PresentationModule.getActiveSlide?.elements.length
  }

  get isElementActive () {
    return (PresentationModule.getActiveElement?.elementId === this.element.elementId || PresentationModule.getHoveredElementId === this.element.elementId) && !this.disabled
  }

  get elementClass () {
    return `canvas-element_${this.element.elementId}`
  }

  get getCurrentLayout () {
    return this.element?.layout || null
  }

  get getElementStyle () {
    return {
      transform: `translate(${this.getCurrentLayout.x}px, ${this.getCurrentLayout.y}px) rotate(${this.getCurrentLayout.rotation}deg)`,
      width: `${this.getCurrentLayout.width}px`,
      height: `${this.getCurrentLayout.height}px`,
      pointerEvents: this.disabled ? 'none' : null
    }
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

  mounted () {
    if (!this.disabled) {
      this.init()
    }
  }

  beforeDestroy () {
    if (!this.disabled) {
      this.unset()
    }
  }

  setActive () {
    if (!this.disabled) {
      PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: this.element.elementId, type: this.element.elementType })
    }
  }

  reload () {
    if (!this.disabled) {
      console.log('reload', this.element.elementId)
      this.unset()
      this.init()
    }
  }

  unset () {
    this.component.unset()
  }

  openContext (event: any) {
    if (!this.disabled) {
      console.log('open context')
      CommonModule.SET_CONTEXT_MENU_OPTIONS({
        active: true,
        items: this.getContextMenuItems,
        event: { pageX: event.pageX, pageY: event.pageY }
      })
    }
  }

  init () {
    this.component = interact(`.${this.elementClass}`) as Interactable
    this.component.draggable({
      onstart: () => {
        console.log('start move')
        PresentationModule.getHistoryStart({ type: 'update', element: this.element })
      },
      onmove: event => this.onDragMove(event),
      onend: () => {
        console.log('end move')
        PresentationModule.setHistory({ type: 'update', element: this.element })
      }
    })
    this.component.resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      onstart: () => {
        console.log('start resize')
        PresentationModule.getHistoryStart({ type: 'update', element: this.element })
      },
      onmove: event => this.onResizeMove(event),
      onend: () => {
        console.log('end resize')
        PresentationModule.setHistory({ type: 'update', element: this.element })
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: CONFINES.layout.width.min, height: CONFINES.layout.height.min },
          max: { width: CONFINES.layout.width.max, height: CONFINES.layout.height.max }
        })
      ]
    })
  }

  onResizeMove (event: InteractEvent) {
    const target = event.target
    let x = (this.getCurrentLayout.x)
    let y = (this.getCurrentLayout.y)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += +((event as any).deltaRect.left)
    y += +((event as any).deltaRect.top)

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)

    PresentationModule.UPDATE_ELEMENT_VALUE({
      key: 'layout',
      value: {
        x,
        y,
        width: event.rect.width,
        height: event.rect.height,
        rotation: 0
      },
      slideId: this.element.slideId,
      elementId: this.element.elementId
    })
    clearTimeout(this.updateDebounce)
    this.updateDebounce = setTimeout(async () => {
      await PresentationModule.updateElementValue({
        elementId: this.element.elementId,
        slideId: this.element.slideId,
        key: 'layout',
        value: {
          x,
          y,
          width: event.rect.width,
          height: event.rect.height,
          rotation: 0
        },
        element: this.element
      })
    }, 1000)
  }

  onDragMove (event: InteractEvent) {
    const x = +this.getCurrentLayout.x + +(event.dx)
    const y = +this.getCurrentLayout.y + +(event.dy)

    PresentationModule.UPDATE_ELEMENT_VALUE({
      key: 'layout',
      value: {
        x,
        y,
        width: this.element.layout.width,
        height: this.element.layout.height,
        rotation: 0
      },
      slideId: this.element.slideId,
      elementId: this.element.elementId
    })

    clearTimeout(this.updateDebounce)
    this.updateDebounce = setTimeout(async () => {
      await PresentationModule.updateElementValue({
        elementId: this.element.elementId,
        slideId: this.element.slideId,
        key: 'layout',
        value: {
          x,
          y,
          width: this.element.layout.width,
          height: this.element.layout.height,
          rotation: 0
        },
        element: this.element
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.canvas-element {
  border: 1px solid transparent;
  position: absolute;

  &__active {
    border: 1px solid $canvas-element-border-color;
  }

  .wrapper {
    width: 100%;
    height: 100%;

    .handler {
      position: absolute;
      background: white;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 1px 1px 5px $black-3;

      &-top-right {
        top: -5px;
        right: -5px;
      }
      &-top-left {
        top: -5px;
        left: -5px;
      }
      &-bottom-left {
        bottom: -5px;
        left: -5px;
      }
      &-bottom-right {
        bottom: -5px;
        right: -5px;
      }
    }
  }
}
</style>
