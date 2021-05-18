<template>
  <div ref="canvas" class="presentation-canvas" :style="canvasStyle" @mousedown="deactivateElement">
    <div v-for="(element, index) in slideElements" :key="element.elementId" @dblclick="setContentEditable(index)">
      <keep-alive>
        <CanvasElement :element="element" :disabled="disabled">
          <CanvasElementContent :ref="'child_' + index" :element="element" :disabled="disabled" />
        </CanvasElement>
      </keep-alive>
    </div>
<!--    <slot name="controller" class="controller"></slot>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import CanvasElement from './CanvasElement.vue'
import CanvasElementContent from './CanvasElementContent'
import { IElement, IPresentation } from '~/interfaces/presentation'

@Component({
  components: {
    CanvasElement,
    CanvasElementContent
  }
})
export default class Canvas extends Vue {
  @Prop() slideElements: IElement
  @Prop({ default: false }) disabled: boolean
  @Prop() presentation: IPresentation

  updated () {
    console.log('updated')
  }

  get canvasStyle () {
    return {
      background: this.presentationOptions.background,
      fontFamily: this.presentationOptions.fontFamily
    }
  }

  get presentationOptions () {
    return {
      background: this.getCurrentPresentation?.background,
      fontFamily: this.getCurrentPresentation?.fontFamily
    }
  }

  get getCurrentPresentation () {
    return this.presentation
  }

  deactivateElement () {
    PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: null })
  }

  setContentEditable (index: number) {
    const vmElement = (this as any).$refs['child_' + index][0]
    console.log(vmElement.element, index)
    PresentationModule.updateElementValue({
      elementId: vmElement.element.elementId,
      slideId: vmElement.element.slideId,
      key: 'text',
      value: vmElement.element.text || 'Текст',
      element: vmElement.element
    })
    vmElement.setContentEditable(true)
  }
}
</script>

<style lang="scss" scoped>
.presentation-canvas {
  width: $canvas-width;
  height: $canvas-height;
}
</style>
